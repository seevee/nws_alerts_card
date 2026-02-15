export interface NwsAlertsCardConfig {
  type: string;
  entity: string;
  title?: string;
  zones?: string[];
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
