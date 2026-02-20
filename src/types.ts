// HA types (subset needed by card + editor)
export interface HomeAssistant {
  states: Record<string, HassEntity>;
  locale: {
    language: string;
    time_format: 'language' | '12' | '24';
    date_format: 'language' | 'DMY' | 'MDY' | 'YMD';
  };
  config?: {
    time_zone?: string;  // IANA tz name, e.g. "America/Denver"
  };
}

export interface HassEntity {
  state: string;
  attributes: Record<string, unknown>;
}

export interface NwsAlertsCardConfig {
  type: string;
  entity: string;
  title?: string;
  zones?: string[];
  sortOrder?: 'default' | 'onset' | 'severity';
  animations?: boolean;  // undefined: respects prefers-reduced-motion; true: always animate; false: never animate
  layout?: 'default' | 'compact';
  colorTheme?: 'severity' | 'nws';
}

export interface NwsAlert {
  ID: string;
  Event: string;
  Severity: string;
  Certainty: string;
  Urgency: string;
  Sent: string;
  Onset: string;
  Ends: string;
  Expires: string;
  Description: string;
  Instruction: string;
  URL: string;
  Headline: string;
  AreaDesc: string;
  AffectedZones: string[];
  Geocode: {
    UGC?: string[];
    SAME?: string[];
  };
}

export interface AlertProgress {
  isActive: boolean;
  phaseText: string;
  progressPct: number;
  remainingHours: number;
  onsetHours: number;
  onsetMinutes: number;
  onsetTs: number;
  endsTs: number;
  sentTs: number;
  nowTs: number;
  hasEndTime: boolean;
}
