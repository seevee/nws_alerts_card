# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A standalone custom Home Assistant Lovelace card for displaying NWS (National Weather Service) weather alerts. Built with LitElement/Lit 3, bundled with Rollup, and packaged for HACS distribution.

The legacy `v1.yml` is a Jinja2 template card (for `custom:html-template-card` + `card_mod`) that served as the reference implementation. All of its logic has been ported to the TypeScript card.

## Build Commands

```bash
npm run build     # Rollup bundle → dist/nws-alerts-card.js (single ES module, ~31KB minified)
npm run watch     # Rollup in watch mode
npm run lint      # TypeScript type-check (tsc --noEmit), no linter configured
```

## Source Architecture

| File | Purpose |
|------|---------|
| `src/nws-alerts-card.ts` | Main LitElement card class. Implements HA card contract: `setConfig()`, `hass` property, `getCardSize()`, `getStubConfig()`, `window.customCards` registration. Wraps output in `<ha-card>`. |
| `src/types.ts` | TypeScript interfaces: `NwsAlertsCardConfig`, `NwsAlert` (matches NWS Alerts integration v6.1 attributes), `AlertProgress`. |
| `src/utils.ts` | Pure functions ported from v1.yml Jinja2 macros: icon mapping (`getWeatherIcon`, `getCertaintyIcon`), timestamp parsing, `computeAlertProgress()`, severity normalization, zone filtering (`alertMatchesZones`). |
| `src/styles.ts` | All CSS as a Lit `css` tagged template. Severity color mappings, keyframe animations, progress bar, custom details toggle styles. |
| `rollup.config.mjs` | Rollup config: resolve + commonjs + typescript2 + terser → single `dist/nws-alerts-card.js`. |

## Key Patterns

- The card reads from `sensor.nws_alerts_alerts` entity (configurable via `config.entity`) and its `Alerts` attribute array.
- Each alert has fields: `ID`, `Event`, `Severity`, `Certainty`, `Urgency`, `Sent`, `Onset`, `Ends`, `Expires`, `Description`, `Instruction`, `URL`, `Headline`, `AreaDesc`, `AffectedZones`, `Geocode`.
- Severity levels map to CSS classes: `severity-extreme`, `severity-severe`, `severity-moderate`, `severity-minor`, `severity-unknown`, each with `--color` and `--color-rgb` custom properties.
- Progress bars use inverted fill logic: the filled portion represents remaining time, positioned from the elapsed percentage.
- Details toggle uses `@state() _expandedAlerts: Map<string, boolean>` keyed by alert `ID` — avoids the DOM re-render collapse problem that native `<details>` elements have with HA's state update cycle.
- Zone filtering checks both `AffectedZones` (full API URLs — trailing segment extracted) and `Geocode.UGC` (bare zone codes).
- HA theme variables (`--primary-text-color`, `--card-background-color`, etc.) pass through Shadow DOM via CSS custom properties.

## Config Schema

```typescript
interface NwsAlertsCardConfig {
  entity: string;        // required — e.g. "sensor.nws_alerts_alerts"
  title?: string;        // optional card header
  zones?: string[];      // optional zone filter — e.g. ["COC059", "COZ039"]
}
```

## Development Environment

### Starting the dev container

```bash
npm run build
docker compose -f .docker/docker-compose.yml up
```

Home Assistant runs at http://localhost:8123. The built JS is volume-mounted read-only at `/config/www/nws-alerts-card.js`. Rebuild on the host and hard-refresh the browser to see changes.

### First-time dev container setup

After the HA onboarding flow:

1. **Enable advanced mode**: click your user avatar (bottom-left) → toggle Advanced Mode on.
2. **Add card resource**: Settings → Dashboards → three-dot menu → Resources → Add Resource:
   - URL: `/local/nws-alerts-card.js`
   - Type: JavaScript Module
3. **Add card to a dashboard**: Overview → pencil icon → Add Card → search "NWS Alerts Card" or use Manual card with:
   ```yaml
   type: custom:nws-alerts-card
   entity: sensor.nws_alerts_alerts
   ```

### Installing the NWS Alerts integration in the dev container

The card needs the `sensor.nws_alerts_alerts` entity which comes from the [NWS Alerts custom integration](https://github.com/finity69x2/nws_alerts). To install it:

1. **Install HACS** (one-time):
   ```bash
   docker exec -it nws-alerts-card-ha bash
   wget -O - https://get.hacs.xyz | bash -
   ```
   Restart HA (Settings → System → Restart), then add HACS as an integration: Settings → Devices & Services → Add Integration → search "HACS" → follow the GitHub device code authorization flow. The HACS sidebar entry appears after this step.

2. **Install NWS Alerts**: HACS → Integrations → Explore & Download Repositories → search "NWS Alerts" → Download → restart HA again.

3. **Configure**: Settings → Devices & Services → Add Integration → search "NWS Alerts" → enter zone/county codes.

   **Important**: zone codes must be comma-delimited with **no spaces** (e.g. `COC059,COZ039,COZ239`). Adding spaces after commas (e.g. `COC059, COZ039`) causes the integration to silently return no alerts. Find your zone codes at https://alerts.weather.gov/.

## HACS Distribution

- `hacs.json` — HACS manifest (name, filename).
- `.github/workflows/release.yml` — on GitHub Release publish: builds and attaches `dist/nws-alerts-card.js` to the release.
- To release: create a GitHub Release tag; the workflow handles the rest. Users add this repo as a HACS custom repository (Frontend category).

## Legacy Reference

- `v1.yml` — the original Jinja2/html-template-card implementation. Kept as reference. Not used at runtime.
