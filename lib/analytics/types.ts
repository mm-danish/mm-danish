// ─── Analytics Type Definitions ──────────────────────────────────────────────

export type EventType = "pageview" | "section_dwell" | "cta_click" | "referrer";

export interface PageviewEvent {
  type: "pageview";
  path: string;
  referrer?: string;
  device?: "desktop" | "mobile" | "tablet";
  country?: string;
  sessionId: string;
}

export interface SectionDwellEvent {
  type: "section_dwell";
  section: string; // e.g. 'hero', 'about', 'skills', 'projects', 'contact'
  durationMs: number;
  sessionId: string;
}

export interface CtaClickEvent {
  type: "cta_click";
  label: string; // e.g. 'download_cv', 'lets_connect', 'github_link', 'live_demo', 'social_github'
  sessionId: string;
}

export type TrackEvent = PageviewEvent | SectionDwellEvent | CtaClickEvent;

// ─── Stats Response Types ─────────────────────────────────────────────────────

export interface DailyStats {
  date: string; // 'YYYY-MM-DD'
  views: number;
  uniqueVisitors: number;
}

export interface SectionMetric {
  section: string;
  totalViews: number;
  totalDwellMs: number;
  avgDwellMs: number;
  /** Drop-off: 100 means everyone reached it. Lower = fewer people scroll to it. */
  reachRate: number;
  recommendation: string;
}

export interface CtaMetric {
  label: string;
  displayName: string;
  clicks: number;
}

export interface TopPage {
  path: string;
  views: number;
}

export interface ReferrerMetric {
  referrer: string;
  visits: number;
}

export interface DeviceMetric {
  device: string;
  count: number;
}

export interface CountryMetric {
  country: string;
  visits: number;
}

export interface AnalyticsStats {
  overview: {
    totalViews: number;
    uniqueVisitors: number;
    todayViews: number;
    weekViews: number;
    monthViews: number;
  };
  daily: DailyStats[]; // last 30 days
  sections: SectionMetric[];
  ctas: CtaMetric[];
  topPages: TopPage[];
  referrers: ReferrerMetric[];
  devices: DeviceMetric[];
  countries: CountryMetric[];
}
