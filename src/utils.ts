import { NwsAlert, AlertProgress } from './types';

const WEATHER_ICONS: [readonly string[], string][] = [
  [['tornado'], 'mdi:weather-tornado'],
  [['thunderstorm', 't-storm'], 'mdi:weather-lightning'],
  [['flood', 'hydrologic'], 'mdi:home-flood'],
  [['snow', 'blizzard', 'winter'], 'mdi:weather-snowy-heavy'],
  [['ice', 'freeze', 'frost'], 'mdi:snowflake'],
  [['landslide', 'avalanche'], 'mdi:landslide'],
  [['wind'], 'mdi:weather-windy'],
  [['fire', 'red flag'], 'mdi:fire'],
  [['heat'], 'mdi:weather-sunny-alert'],
  [['fog'], 'mdi:weather-fog'],
  [['hurricane', 'tropical'], 'mdi:weather-hurricane'],
];

export function getWeatherIcon(event: string): string {
  const e = event.toLowerCase();
  for (const [patterns, icon] of WEATHER_ICONS) {
    if (patterns.some(p => e.includes(p))) return icon;
  }
  return 'mdi:alert-circle-outline';
}

const CERTAINTY_ICONS: [readonly string[], string][] = [
  [['likely'], 'mdi:check-decagram'],
  [['observed'], 'mdi:eye-check'],
  [['possible', 'unlikely'], 'mdi:help-circle-outline'],
];

export function getCertaintyIcon(certainty: string): string {
  const c = certainty.toLowerCase();
  for (const [patterns, icon] of CERTAINTY_ICONS) {
    if (patterns.some(p => c.includes(p))) return icon;
  }
  return 'mdi:bullseye-arrow';
}

function parseTimestamp(raw: string | undefined | null): number {
  if (!raw || raw === 'None' || raw.trim() === '') return 0;
  const d = new Date(raw.trim());
  return isNaN(d.getTime()) ? 0 : d.getTime() / 1000;
}

export function computeAlertProgress(alert: NwsAlert): AlertProgress {
  const nowTs = Date.now() / 1000;

  const sentTs = parseTimestamp(alert.Sent);
  const onsetTsDefault = sentTs > 0 ? sentTs : nowTs;
  let onsetTs = parseTimestamp(alert.Onset);
  if (onsetTs === 0) onsetTs = onsetTsDefault;

  const endsRaw = alert.Ends || alert.Expires || '';
  const endsTsDefault = onsetTs + 3600;
  let endsTs = parseTimestamp(endsRaw);
  if (endsTs === 0) endsTs = endsTsDefault;

  const hasEndTime = !!(alert.Ends || alert.Expires);
  const isActive = nowTs >= onsetTs;

  let lowTs: number, highTs: number, progressTs: number, phaseText: string;
  if (isActive) {
    lowTs = onsetTs;
    highTs = endsTs;
    progressTs = nowTs;
    phaseText = 'Active';
  } else {
    lowTs = nowTs;
    highTs = endsTs;
    progressTs = onsetTs;
    phaseText = 'Preparation';
  }

  const rawDuration = highTs - lowTs;
  const safeDuration = rawDuration > 0 ? rawDuration : 1;
  const elapsedSec = progressTs - lowTs;
  const rawPct = (elapsedSec / safeDuration) * 100;
  const progressPct = Math.max(0, Math.min(100, Math.round(rawPct * 10) / 10));

  const remainingHours = Math.round(((endsTs - nowTs) / 3600) * 10) / 10;
  const onsetHours = Math.round(((onsetTs - nowTs) / 3600) * 10) / 10;
  const onsetMinutes = Math.round((onsetTs - nowTs) / 60);

  return {
    isActive,
    phaseText,
    progressPct,
    remainingHours,
    onsetHours,
    onsetMinutes,
    onsetTs,
    endsTs,
    sentTs,
    nowTs,
    hasEndTime,
  };
}

interface HaLocale {
  language: string;
  time_format: 'language' | '12' | '24';
  date_format?: 'language' | 'DMY' | 'MDY' | 'YMD';
}

function timeFormatOptions(locale?: HaLocale): { locale: string | undefined; hour12?: boolean } {
  if (!locale) return { locale: undefined };
  const lang = locale.language;
  if (locale.time_format === '12') return { locale: lang, hour12: true };
  if (locale.time_format === '24') return { locale: lang, hour12: false };
  return { locale: lang };
}

function formatDate(d: Date, locale?: HaLocale): string {
  const lang = locale?.language;
  const fmt = locale?.date_format;

  if (!fmt || fmt === 'language') {
    return d.toLocaleDateString(lang);
  }

  const parts = new Intl.DateTimeFormat(lang, {
    day: 'numeric', month: 'numeric', year: 'numeric',
  }).formatToParts(d);

  const day = parts.find(p => p.type === 'day')?.value ?? '';
  const month = parts.find(p => p.type === 'month')?.value ?? '';
  const year = parts.find(p => p.type === 'year')?.value ?? '';

  switch (fmt) {
    case 'DMY': return `${day}/${month}/${year}`;
    case 'MDY': return `${month}/${day}/${year}`;
    case 'YMD': return `${year}/${month}/${day}`;
    default: return d.toLocaleDateString(lang);
  }
}

function formatTime(d: Date, locale: HaLocale | undefined, hour: '2-digit' | 'numeric'): string {
  const fmt = timeFormatOptions(locale);
  const opts: Intl.DateTimeFormatOptions = { hour, minute: '2-digit' };
  if (fmt.hour12 !== undefined) opts.hour12 = fmt.hour12;
  return d.toLocaleTimeString(fmt.locale, opts);
}

export function formatProgressTimestamp(ts: number, locale?: HaLocale): string {
  if (ts <= 0) return 'N/A';
  const d = new Date(ts * 1000);
  const now = new Date();
  const time = formatTime(d, locale, '2-digit');
  const sameDay =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();
  if (sameDay) return time;
  return `${time} (${formatDate(d, locale)})`;
}

export function formatLocalTimestamp(ts: number, locale?: HaLocale): string {
  if (ts <= 100) return 'N/A';
  const d = new Date(ts * 1000);
  const time = formatTime(d, locale, 'numeric');
  return `${formatDate(d, locale)}, ${time}`;
}

export function normalizeSeverity(severity: string | undefined): string {
  const s = (severity || '').toLowerCase().replace(/\s/g, '');
  if (['extreme', 'severe', 'moderate', 'minor'].includes(s)) return s;
  return 'unknown';
}

const SEVERITY_RANK: Record<string, number> = {
  extreme: 0, severe: 1, moderate: 2, minor: 3, unknown: 4,
};

function parseOnsetForSort(alert: NwsAlert): number {
  if (!alert.Onset || alert.Onset === 'None' || alert.Onset.trim() === '') return Infinity;
  const d = new Date(alert.Onset.trim());
  return isNaN(d.getTime()) ? Infinity : d.getTime();
}

export function sortAlerts(alerts: NwsAlert[], order: string): NwsAlert[] {
  if (order === 'onset') {
    return [...alerts].sort((a, b) => parseOnsetForSort(a) - parseOnsetForSort(b));
  }
  if (order === 'severity') {
    return [...alerts].sort((a, b) => {
      const diff = (SEVERITY_RANK[normalizeSeverity(a.Severity)] ?? 4)
                 - (SEVERITY_RANK[normalizeSeverity(b.Severity)] ?? 4);
      if (diff !== 0) return diff;
      return parseOnsetForSort(a) - parseOnsetForSort(b);
    });
  }
  return alerts;
}

export function extractZoneCode(url: string): string {
  const parts = url.split('/');
  return parts[parts.length - 1].toUpperCase();
}

export function alertMatchesZones(alert: NwsAlert, zones: Set<string>): boolean {
  if (alert.AffectedZones) {
    for (const z of alert.AffectedZones) {
      if (zones.has(extractZoneCode(z))) return true;
    }
  }
  if (alert.Geocode?.UGC) {
    for (const code of alert.Geocode.UGC) {
      if (zones.has(code.toUpperCase())) return true;
    }
  }
  return false;
}
