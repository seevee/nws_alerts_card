#!/usr/bin/env bash
# most-alerted-zones.sh — Find the most-alerted zone for each provider
# Providers: NWS (US), BoM (Australia), MeteoAlarm (Europe), ECCC (Canada)
# Outputs lat/long/zone info useful for configuring HA integrations during testing.
#
# Usage: ./scripts/most-alerted-zones.sh
#
# Makes exactly 4 API requests (one per provider) plus 1-2 NWS zone lookups.
# Results are cached in .cache/most-alerted-zones/ for 1 hour to avoid
# hammering public endpoints on repeated runs.
#
# Dependencies: curl, jq

set -euo pipefail

UA="weather-alerts-card-testing/1.0"
CACHE_DIR=".cache/most-alerted-zones"
CACHE_TTL=3600  # seconds

mkdir -p "$CACHE_DIR"

# Fetch with file-level caching. Returns cached content if fresh enough.
# Optional 3rd arg: extra curl headers.
cached_fetch() {
  local url="$1" cache_file="$2"
  shift 2
  if [ -f "$cache_file" ]; then
    local age mtime
    mtime=$(stat -c %Y "$cache_file" 2>/dev/null || date -r "$cache_file" +%s 2>/dev/null || echo 0)
    age=$(( $(date +%s) - mtime ))
    if [ "$age" -lt "$CACHE_TTL" ]; then
      cat "$cache_file"
      return 0
    fi
  fi
  curl -sf --max-time 15 -H "User-Agent: $UA" "$@" "$url" | tee "$cache_file"
}

divider() {
  printf '\n%s\n' "──────────────────────────────────────────────"
}

# ─── NWS ─────────────────────────────────────────────────────────────────────
# 1 request: GET /alerts/active (returns all active alerts with zone codes)
# 1-2 requests: GET /zones/{type}/{id} (zone geometry for centroid — one per unique zone)
# Fetch NWS zone details and print them. Args: $1=zone_code, $2=cache_suffix
# Outputs: zone, name, lat, lon via printed lines.
nws_zone_details() {
  local zone_code="$1" cache_suffix="${2:-zone}"

  # Determine zone type from 3rd character (e.g. COZ → forecast, COC → county)
  local zone_type="forecast"
  case "${zone_code:2:1}" in
    C) zone_type="county" ;;
    Z) zone_type="forecast" ;;
  esac

  echo "  Fetching zone geometry ($zone_type/$zone_code)..."
  local zone_info
  zone_info=$(cached_fetch "https://api.weather.gov/zones/$zone_type/$zone_code" "$CACHE_DIR/nws-${cache_suffix}.json" \
    -H "Accept: application/geo+json") || {
    echo "  Could not fetch zone geometry."
    echo ""
    echo "  zone:  $zone_code"
    return 1
  }

  local name state
  name=$(echo "$zone_info" | jq -r '.properties.name // "unknown"')
  state=$(echo "$zone_info" | jq -r '.properties.state // "unknown"')

  # Centroid: average all coordinate points
  local lat lon
  read -r lat lon < <(echo "$zone_info" | jq -r '
    def flatten_coords:
      if type == "array" and (.[0] | type) == "number" then [.]
      elif type == "array" then map(flatten_coords) | add
      else empty end;
    .geometry.coordinates | flatten_coords |
    (map(.[1]) | add / length) as $lat |
    (map(.[0]) | add / length) as $lon |
    "\($lat) \($lon)"
  ' 2>/dev/null || echo "null null")

  echo ""
  echo "  zone:  $zone_code"
  echo "  name:  $name, $state"
  echo "  lat:   $lat"
  echo "  lon:   $lon"
}

nws() {
  echo "NWS — National Weather Service (US)"
  echo "  Fetching active alerts..."

  local alerts
  alerts=$(cached_fetch "https://api.weather.gov/alerts/active" "$CACHE_DIR/nws-alerts.json" \
    -H "Accept: application/geo+json") || {
    echo "  FAIL: could not reach api.weather.gov"; return 1
  }

  local total
  total=$(echo "$alerts" | jq '.features | length')
  echo "  Active alerts: $total"

  if [ "$total" -eq 0 ]; then
    echo "  No active alerts."
    return 0
  fi

  # Count alerts per UGC zone code, pick the top one
  local top_zone
  top_zone=$(echo "$alerts" | jq -r '
    [.features[].properties.geocode.UGC // [] | .[]] |
    group_by(.) |
    map({zone: .[0], count: length}) |
    sort_by(-.count) |
    .[0] |
    "\(.zone)\t\(.count)"
  ')

  local zone_code zone_count
  zone_code=$(echo "$top_zone" | cut -f1)
  zone_count=$(echo "$top_zone" | cut -f2)

  echo "  Most-alerted zone: $zone_code ($zone_count alerts)"

  # Find the zone with the highest-severity alert
  # NWS severity: Extreme > Severe > Moderate > Minor > Unknown
  local severe_zone
  severe_zone=$(echo "$alerts" | jq -r '
    def sev_rank:
      if . == "Extreme" then 5
      elif . == "Severe" then 4
      elif . == "Moderate" then 3
      elif . == "Minor" then 2
      else 1 end;
    [.features[] |
      (.properties.severity // "Unknown") as $sev |
      (.properties.geocode.UGC // [] | .[] | {zone: ., severity: $sev, rank: ($sev | sev_rank)})] |
    sort_by(-.rank) |
    .[0] |
    "\(.zone)\t\(.severity)"
  ')

  local severe_zone_code severe_zone_sev
  severe_zone_code=$(echo "$severe_zone" | cut -f1)
  severe_zone_sev=$(echo "$severe_zone" | cut -f2)

  echo "  Most-severe zone:  $severe_zone_code ($severe_zone_sev)"

  # Print details for most-alerted zone
  echo ""
  echo "  ── Most-alerted ──"
  nws_zone_details "$zone_code" "zone" || true
  echo "  count: $zone_count active alerts"
  echo ""
  echo "  HA config: zone_id = $zone_code"

  # Print details for most-severe zone (skip if same as most-alerted)
  if [ "$severe_zone_code" != "$zone_code" ]; then
    echo ""
    echo "  ── Most-severe ──"
    nws_zone_details "$severe_zone_code" "zone-severe" || true
    echo "  severity: $severe_zone_sev"
    echo ""
    echo "  HA config: zone_id = $severe_zone_code"
  else
    echo ""
    echo "  (Most-severe zone is the same as most-alerted)"
  fi
}

# ─── BoM ──────────────────────────────────────────────────────────────────────
# 1 request: GET /v1/warnings (all active warnings across Australia)
# 1 request: GET /v1/locations?search={place} (resolve place name → geohash)
# BoM warnings have no geometry — we extract a place name from the warning
# title, resolve it via the BoM locations API, and decode the geohash locally
# to get coordinates that fall within the actual alerted area.

# Decode a geohash to lat/lon (pure awk, no external dependencies).
decode_geohash() {
  echo "$1" | awk '
  BEGIN {
    split("0123456789bcdefghjkmnpqrstuvwxyz", chars, "")
    for (i = 1; i <= 32; i++) base32[chars[i]] = i - 1
  }
  {
    hash = $0
    lat_min = -90; lat_max = 90
    lon_min = -180; lon_max = 180
    is_lon = 1
    for (i = 1; i <= length(hash); i++) {
      c = substr(hash, i, 1)
      val = base32[c]
      for (b = 4; b >= 0; b--) {
        bit = int(val / (2^b)) % 2
        if (is_lon) {
          mid = (lon_min + lon_max) / 2
          if (bit) lon_min = mid; else lon_max = mid
        } else {
          mid = (lat_min + lat_max) / 2
          if (bit) lat_min = mid; else lat_max = mid
        }
        is_lon = !is_lon
      }
    }
    printf "%.6f %.6f\n", (lat_min + lat_max) / 2, (lon_min + lon_max) / 2
  }'
}

# Extract candidate place names from a BoM warning title.
# Titles look like: "Herbert River at Abergowrie Bridge, Tully River at Euramo"
# Strategy: pull tokens after " at " (most specific), then try the first
# comma-segment as a bare search term.
extract_bom_places() {
  local title="$1"
  # Prefer "at <Place>" patterns — these are specific localities
  echo "$title" | grep -oP '(?<= at )\w+' || true
  # Fallback: first comma-segment, stripped of "River", "Creek" etc.
  echo "$title" | cut -d, -f1 | sed 's/\b\(River\|Creek\|Bay\|Lake\|Range\)\b//g; s/^ *//; s/ *$//'
}

# Search BoM locations API for a place name within a given state.
# Returns "geohash\tname" or empty string.
bom_search_place() {
  local place="$1" target_state="$2"
  local result
  result=$(curl -sf --max-time 10 -H "User-Agent: $UA" \
    "https://api.weather.bom.gov.au/v1/locations?search=$(echo "$place" | sed 's/ /%20/g')" 2>/dev/null) || return 1
  # Prefer a match in the target state
  echo "$result" | jq -r --arg st "$target_state" '
    (.data[] | select(.state == $st) | "\(.geohash)\t\(.name)") // empty
  ' | head -1
}

bom() {
  echo "BoM — Bureau of Meteorology (Australia)"
  echo "  Fetching active warnings..."

  local warnings
  warnings=$(cached_fetch "https://api.weather.bom.gov.au/v1/warnings" "$CACHE_DIR/bom-warnings.json") || {
    echo "  FAIL: could not reach api.weather.bom.gov.au"; return 1
  }

  local total
  total=$(echo "$warnings" | jq '[.data[] | select(.phase != "cancelled")] | length')
  echo "  Active warnings: $total"

  if [ "$total" -eq 0 ]; then
    echo "  No active warnings."
    return 0
  fi

  # Count non-cancelled warnings per state
  local top_state
  top_state=$(echo "$warnings" | jq -r '
    [.data[] | select(.phase != "cancelled") | .state // empty] |
    group_by(.) |
    map({state: .[0], count: length}) |
    sort_by(-.count) |
    .[0] |
    "\(.state)\t\(.count)"
  ')

  local state_code state_count
  state_code=$(echo "$top_state" | cut -f1)
  state_count=$(echo "$top_state" | cut -f2)

  echo "  Most-alerted state: $state_code ($state_count warnings)"

  # Sample warning from that state
  local sample
  sample=$(echo "$warnings" | jq -r --arg st "$state_code" '
    [.data[] | select(.state == $st and .phase != "cancelled")] |
    .[0] |
    "\(.id // "?")\t\(.type // "?")\t\(.title // "?")\t\(.warning_group_type // "?")"
  ')

  local warn_id warn_type warn_title warn_group
  warn_id=$(echo "$sample" | cut -f1)
  warn_type=$(echo "$sample" | cut -f2)
  warn_title=$(echo "$sample" | cut -f3)
  warn_group=$(echo "$sample" | cut -f4)

  # Resolve a location within the alerted area from the warning title.
  # Extract place names and search BoM locations API (1 additional request).
  local lat="?" lon="?" resolved_name=""
  echo "  Resolving location from warning title..."

  local places
  places=$(extract_bom_places "$warn_title")

  local found=""
  while IFS= read -r place; do
    [ -z "$place" ] && continue
    local match
    match=$(bom_search_place "$place" "$state_code") || continue
    if [ -n "$match" ]; then
      found="$match"
      break
    fi
  done <<< "$places"

  if [ -n "$found" ]; then
    local geohash
    geohash=$(echo "$found" | cut -f1)
    resolved_name=$(echo "$found" | cut -f2)
    read -r lat lon < <(decode_geohash "$geohash")
    echo "  Resolved: $resolved_name ($geohash)"
  else
    echo "  Could not resolve a location from title — using state capital"
    case "$state_code" in
      NSW) lat="-33.8688"; lon="151.2093"; resolved_name="Sydney" ;;
      VIC) lat="-37.8136"; lon="144.9631"; resolved_name="Melbourne" ;;
      QLD) lat="-27.4698"; lon="153.0251"; resolved_name="Brisbane" ;;
      SA)  lat="-34.9285"; lon="138.6007"; resolved_name="Adelaide" ;;
      WA)  lat="-31.9505"; lon="115.8605"; resolved_name="Perth" ;;
      TAS) lat="-42.8821"; lon="147.3272"; resolved_name="Hobart" ;;
      NT)  lat="-12.4634"; lon="130.8456"; resolved_name="Darwin" ;;
      ACT) lat="-35.2809"; lon="149.1300"; resolved_name="Canberra" ;;
      *)   resolved_name="unknown" ;;
    esac
  fi

  echo ""
  echo "  state:   $state_code"
  echo "  place:   $resolved_name"
  echo "  lat:     $lat"
  echo "  lon:     $lon"
  echo "  count:   $state_count active warnings"
  echo "  example: $warn_title ($warn_type, $warn_group)"
  echo "  id:      $warn_id"
  echo ""
  echo "  HA integration: bureau_of_meteorology"
  echo "  Configure for a location near $resolved_name, $state_code to pick up warnings"
}

# ─── MeteoAlarm ───────────────────────────────────────────────────────────────
# 1 request: GET /feeds/meteoalarm-legacy-rss-europe (aggregate RSS — country ranking)
# 1 request: GET /feeds/meteoalarm-legacy-atom-{country} (province/region details)
# Ref: https://www.home-assistant.io/integrations/meteoalarm/

# Map RSS title "MeteoAlarm {Name}" → feed slug used by both the atom URL and
# the HA meteoalarm integration's `country:` config key.
country_to_slug() {
  local name="$1"
  echo "$name" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g'
}

meteoalarm() {
  echo "MeteoAlarm — EUMETNET (Europe)"
  echo "  Fetching aggregate RSS feed..."

  local feed
  feed=$(cached_fetch "https://feeds.meteoalarm.org/feeds/meteoalarm-legacy-rss-europe" "$CACHE_DIR/meteoalarm-rss.xml") || {
    echo "  FAIL: could not reach feeds.meteoalarm.org"; return 1
  }

  # Parse RSS: each <item><title>MeteoAlarm {Country}</title> contains
  # <td data-awareness-level="N"> elements — count them per country.
  local counts
  counts=$(echo "$feed" | awk '
    /<title>MeteoAlarm / {
      gsub(/.*<title>MeteoAlarm /, ""); gsub(/<\/title>.*/, "");
      country = $0;
      alert_count = 0;
    }
    /data-awareness-level="[2-4]"/ {
      n = gsub(/data-awareness-level="[2-4]"/, "&");
      alert_count += n;
    }
    /<\/item>/ {
      if (country != "" && alert_count > 0) {
        printf "%d\t%s\n", alert_count, country;
      }
      country = "";
      alert_count = 0;
    }
  ' | sort -t$'\t' -k1 -nr)

  if [ -z "$counts" ]; then
    echo "  No active alerts (awareness level >= 2) across Europe."
    return 0
  fi

  local total_countries
  total_countries=$(echo "$counts" | wc -l | tr -d ' ')
  echo "  Countries with alerts: $total_countries"
  echo ""
  echo "  Top 5:"
  echo "$counts" | head -5 | while IFS=$'\t' read -r cnt name; do
    printf "    %-20s %s alerts\n" "$name" "$cnt"
  done

  local top_count top_country
  top_count=$(echo "$counts" | head -1 | cut -f1)
  top_country=$(echo "$counts" | head -1 | cut -f2)

  local country_slug
  country_slug=$(country_to_slug "$top_country")

  # Fetch the country's atom feed to find the most-alerted province (1 additional request).
  # Each <entry> has <cap:areaDesc> with the region/province name and <cap:geocode>
  # with the EMMA_ID. Count entries per areaDesc.
  echo ""
  echo "  Fetching atom feed for $top_country..."
  local atom
  atom=$(cached_fetch "https://feeds.meteoalarm.org/feeds/meteoalarm-legacy-atom-${country_slug}" \
    "$CACHE_DIR/meteoalarm-atom.xml") || {
    echo "  Could not fetch atom feed for $country_slug."
    echo ""
    echo "  # configuration.yaml (province unknown — check meteoalarm.org)"
    echo "  binary_sensor:"
    echo "    - platform: meteoalarm"
    echo "      country: \"$country_slug\""
    echo "      province: \"???\"  # visit meteoalarm.org to find province"
    return 0
  }

  # Extract areaDesc values and count per province
  local province_counts
  province_counts=$(echo "$atom" | grep -oP '(?<=<cap:areaDesc>)[^<]+' | \
    sort | uniq -c | sort -rn)

  local top_province top_province_count
  top_province_count=$(echo "$province_counts" | head -1 | awk '{print $1}')
  top_province=$(echo "$province_counts" | head -1 | sed 's/^ *[0-9]* *//')

  echo "  Most-alerted province: $top_province ($top_province_count alerts)"

  # Show top 3 provinces
  echo ""
  echo "  Top provinces:"
  echo "$province_counts" | head -3 | while read -r cnt name; do
    printf "    %-35s %s alerts\n" "$name" "$cnt"
  done

  echo ""
  echo "  count:    $top_count country-level alerts"
  echo "  country:  $country_slug"
  echo "  province: $top_province"
  echo ""
  echo "  # configuration.yaml"
  echo "  binary_sensor:"
  echo "    - platform: meteoalarm"
  echo "      country: \"$country_slug\""
  echo "      province: \"$top_province\""
}

# ─── ECCC ─────────────────────────────────────────────────────────────────────
# 1 request: GET / from NAAD (National Alert Aggregation & Dissemination) Atom feed
# Atom entries use <category term="key=value"/> for CAP fields, <georss:polygon>
# for coordinates (space-separated alternating lat lon), and area names in <summary>.
# Ref: https://rss.naad-adna.pelmorex.com/

# Compute centroid of a georss:polygon string ("lat lon lat lon ...").
georss_centroid() {
  echo "$1" | awk '{
    n = split($0, vals, " ")
    lat_sum = 0; lon_sum = 0; count = 0
    for (i = 1; i <= n - 1; i += 2) {
      lat_sum += vals[i]; lon_sum += vals[i+1]; count++
    }
    if (count > 0) printf "%.6f %.6f\n", lat_sum/count, lon_sum/count
    else print "null null"
  }'
}

eccc() {
  echo "ECCC — Environment and Climate Change Canada"
  echo "  Fetching NAAD alert feed..."

  local feed
  feed=$(cached_fetch "https://rss.naad-adna.pelmorex.com/" "$CACHE_DIR/eccc-naad.xml") || {
    echo "  FAIL: could not reach rss.naad-adna.pelmorex.com"; return 1
  }

  # The feed is one long line of XML. Split on <entry> boundaries, then parse
  # each entry's <category> terms for language/status/severity/event and
  # extract the area list from the <summary> "Area: ..." field.
  # Output: area \t severity \t event \t polygon
  local parsed
  parsed=$(echo "$feed" | sed 's/<entry>/\n<entry>/g' | awk '
    /<entry>/ {
      lang = ""; status = ""; msg_type = ""; sev = ""; evt = ""; poly = ""; area = ""
    }
    /term="language=/ {
      match($0, /term="language=([^"]*)"/, m)
      lang = m[1]
    }
    /term="status=/ {
      match($0, /term="status=([^"]*)"/, m)
      status = m[1]
    }
    /term="msgType=/ {
      match($0, /term="msgType=([^"]*)"/, m)
      msg_type = m[1]
    }
    /term="severity=/ {
      match($0, /term="severity=([^"]*)"/, m)
      sev = m[1]
    }
    /term="event=/ {
      match($0, /term="event=([^"]*)"/, m)
      evt = m[1]
    }
    /<georss:polygon>/ && poly == "" {
      match($0, /<georss:polygon>([^<]+)</, m)
      poly = m[1]
    }
    /Area:/ {
      # Extract "Area: ..." from summary HTML
      match($0, /Area: ([^<]*)/, m)
      area = m[1]
      # Unescape HTML entities
      gsub(/&amp;/, "\\&", area)
      gsub(/&lt;/, "<", area)
      gsub(/&gt;/, ">", area)
    }
    /<\/entry>/ {
      if (lang == "en-CA" && status == "Actual" && msg_type != "Cancel" && area != "") {
        print area "\t" sev "\t" evt "\t" poly
      }
    }
  ')

  if [ -z "$parsed" ]; then
    echo "  No active alerts across Canada."
    return 0
  fi

  local total
  total=$(echo "$parsed" | wc -l | tr -d ' ')
  echo "  Active alert entries: $total"

  # Count alerts per area, find the most-alerted
  local area_counts
  area_counts=$(echo "$parsed" | cut -f1 | sort | uniq -c | sort -rn)

  echo ""
  echo "  Top 5 areas:"
  echo "$area_counts" | head -5 | while read -r cnt name; do
    printf "    %-50s %s alerts\n" "$name" "$cnt"
  done

  local top_area top_count
  top_count=$(echo "$area_counts" | head -1 | awk '{print $1}')
  top_area=$(echo "$area_counts" | head -1 | sed 's/^ *[0-9]* *//')

  # Find most-severe alert across all areas
  local severe_line
  severe_line=$(echo "$parsed" | awk -F'\t' '
    BEGIN { best_rank = 0 }
    {
      sev = $2
      if (sev == "Extreme") rank = 5
      else if (sev == "Severe") rank = 4
      else if (sev == "Moderate") rank = 3
      else if (sev == "Minor") rank = 2
      else rank = 1
      if (rank > best_rank) { best_rank = rank; best = $0 }
    }
    END { print best }
  ')

  local severe_area severe_sev severe_evt severe_poly
  severe_area=$(echo "$severe_line" | cut -f1)
  severe_sev=$(echo "$severe_line" | cut -f2)
  severe_evt=$(echo "$severe_line" | cut -f3)
  severe_poly=$(echo "$severe_line" | cut -f4)

  # Get a sample from the most-alerted area
  local top_sample
  top_sample=$(echo "$parsed" | awk -F'\t' -v area="$top_area" '$1 == area { print; exit }')
  local top_sev top_evt top_poly
  top_sev=$(echo "$top_sample" | cut -f2)
  top_evt=$(echo "$top_sample" | cut -f3)
  top_poly=$(echo "$top_sample" | cut -f4)

  # Compute centroid from first polygon
  local lat="?" lon="?"
  if [ -n "$top_poly" ]; then
    read -r lat lon < <(georss_centroid "$top_poly")
  fi

  echo ""
  echo "  ── Most-alerted ──"
  echo ""
  echo "  area:     $top_area"
  echo "  lat:      $lat"
  echo "  lon:      $lon"
  echo "  count:    $top_count alerts"
  echo "  example:  $top_evt ($top_sev)"

  # Print most-severe if different area
  if [ "$severe_area" != "$top_area" ]; then
    local slat="?" slon="?"
    if [ -n "$severe_poly" ]; then
      read -r slat slon < <(georss_centroid "$severe_poly")
    fi

    echo ""
    echo "  ── Most-severe ──"
    echo ""
    echo "  area:     $severe_area"
    echo "  lat:      $slat"
    echo "  lon:      $slon"
    echo "  severity: $severe_sev"
    echo "  event:    $severe_evt"
  fi

  echo ""
  echo "  Use these coordinates when configuring PirateWeather for Canadian alert testing."
}

# ─── WMO CAP ─────────────────────────────────────────────────────────────────
# Queries the WMO Severe Weather Information Centre CAP feeds directly.
# These are the same feeds PirateWeather ingests for non-US alerts.
# Tries Canada first; falls back to Mexico, then Brazil if no alerts found.
# 1 request per source tried + 1 request for the CAP XML of the best alert.
# Ref: https://severeweather.wmo.int/v2/cap-alerts/

# Compute centroid of a CAP polygon string ("lat,lon lat,lon ...").
cap_polygon_centroid() {
  echo "$1" | awk '{
    n = split($0, pairs, " ")
    lat_sum = 0; lon_sum = 0; count = 0
    for (i = 1; i <= n; i++) {
      split(pairs[i], coord, ",")
      if (coord[1] != "" && coord[2] != "") {
        lat_sum += coord[1]; lon_sum += coord[2]; count++
      }
    }
    if (count > 0) printf "%.6f %.6f\n", lat_sum/count, lon_sum/count
    else print "null null"
  }'
}

# Parse a WMO RSS feed into tab-separated lines: title \t severity \t event \t areaDesc \t link
# Filters to English alerts only (skips French/Spanish duplicates by title heuristic).
wmo_parse_rss() {
  local feed="$1"
  echo "$feed" | sed 's/<item>/\n<item>/g' | awk '
    /<item>/ { title=""; sev=""; evt=""; area=""; link="" }
    /<title>/ && !/<title>Latest/ {
      gsub(/.*<title>/, ""); gsub(/<\/title>.*/, "")
      title = $0
    }
    /<cap:severity>/ {
      gsub(/.*<cap:severity>/, ""); gsub(/<\/cap:severity>.*/, "")
      sev = $0
    }
    /<cap:event>/ {
      gsub(/.*<cap:event>/, ""); gsub(/<\/cap:event>.*/, "")
      evt = $0
    }
    /<cap:areaDesc>/ {
      gsub(/.*<cap:areaDesc>/, ""); gsub(/<\/cap:areaDesc>.*/, "")
      area = $0
    }
    /<link>https:\/\/severeweather/ {
      gsub(/.*<link>/, ""); gsub(/<\/link>.*/, "")
      link = $0
    }
    /<\/item>/ {
      if (title != "" && sev != "" && sev != "Unknown") {
        print title "\t" sev "\t" evt "\t" area "\t" link
      }
    }
  '
}

wmo_cap() {
  echo "WMO CAP — Severe Weather Information Centre (PirateWeather source)"

  # Sources to try in order: Canada, Mexico, Brazil
  local -a source_ids=("ca-msc-xx" "mx-smn-es" "br-inmet-pt")
  local -a source_names=("Canada (MSC)" "Mexico (SMN)" "Brazil (INMET)")

  local feed parsed source_id source_name
  for i in "${!source_ids[@]}"; do
    source_id="${source_ids[$i]}"
    source_name="${source_names[$i]}"
    echo "  Trying $source_name ($source_id)..."

    feed=$(cached_fetch "https://severeweather.wmo.int/v2/cap-alerts/$source_id/rss.xml" \
      "$CACHE_DIR/wmo-$source_id.xml") || {
      echo "    Could not fetch feed."
      continue
    }

    parsed=$(wmo_parse_rss "$feed")
    if [ -n "$parsed" ]; then
      echo "  Found alerts in $source_name."
      break
    else
      echo "    No alerts."
      parsed=""
    fi
  done

  if [ -z "$parsed" ]; then
    echo "  No active alerts found in any WMO source."
    return 0
  fi

  local total
  total=$(echo "$parsed" | wc -l | tr -d ' ')
  echo "  Active alerts: $total"

  # Find the most-severe alert
  local best_line
  best_line=$(echo "$parsed" | awk -F'\t' '
    BEGIN { best_rank = 0 }
    {
      sev = $2
      if (sev == "Extreme") rank = 5
      else if (sev == "Severe") rank = 4
      else if (sev == "Moderate") rank = 3
      else if (sev == "Minor") rank = 2
      else rank = 1
      if (rank > best_rank) { best_rank = rank; best = $0 }
    }
    END { print best }
  ')

  local best_title best_sev best_evt best_area best_link
  best_title=$(echo "$best_line" | cut -f1)
  best_sev=$(echo "$best_line" | cut -f2)
  best_evt=$(echo "$best_line" | cut -f3)
  best_area=$(echo "$best_line" | cut -f4)
  best_link=$(echo "$best_line" | cut -f5)

  echo "  Most-severe: $best_title ($best_sev)"

  # Fetch the CAP XML for the best alert to get polygon coordinates
  local lat="?" lon="?"
  if [ -n "$best_link" ]; then
    echo "  Fetching CAP XML for polygon..."
    local cap_xml
    cap_xml=$(cached_fetch "$best_link" "$CACHE_DIR/wmo-cap-best.xml") || true
    if [ -n "$cap_xml" ]; then
      # Get the first English areaDesc's polygon (skip French duplicates)
      local polygon
      polygon=$(echo "$cap_xml" | grep -oP '<polygon>[^<]+</polygon>' | head -1 | sed 's/<[^>]*>//g')
      if [ -n "$polygon" ]; then
        read -r lat lon < <(cap_polygon_centroid "$polygon")
      fi
    fi
  fi

  # Also show the most-alerted area (by count)
  local area_counts
  area_counts=$(echo "$parsed" | cut -f4 | sort | uniq -c | sort -rn)

  echo ""
  echo "  Top 5 areas by alert count:"
  echo "$area_counts" | head -5 | while read -r cnt name; do
    printf "    %-55s %s\n" "$name" "$cnt"
  done

  echo ""
  echo "  ── Most-severe ──"
  echo ""
  echo "  title:    $best_title"
  echo "  severity: $best_sev"
  echo "  event:    $best_evt"
  echo "  area:     $best_area"
  echo "  lat:      $lat"
  echo "  lon:      $lon"
  echo ""
  echo "  PirateWeather config: lat=$lat, lon=$lon"
  echo "  WMO source: $source_id ($source_name)"
}

# ─── Main ─────────────────────────────────────────────────────────────────────
echo "Finding most-alerted zones for each provider..."
echo "$(date -u '+%Y-%m-%dT%H:%M:%SZ')"
echo "Cache: $CACHE_DIR (TTL ${CACHE_TTL}s)"

divider
nws || true
divider
bom || true
divider
meteoalarm || true
divider
eccc || true
divider
wmo_cap || true
divider

echo ""
echo "Done. Use the zone/location info above to configure HA integrations for testing."
