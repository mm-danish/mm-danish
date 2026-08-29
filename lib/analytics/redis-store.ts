import { redis } from "@/lib/redis";
import type {
  PageviewEvent,
  SectionDwellEvent,
  CtaClickEvent,
  AnalyticsStats,
  DailyStats,
  SectionMetric,
  CtaMetric,
  TopPage,
  ReferrerMetric,
  DeviceMetric,
  CountryMetric,
} from "./types";

// ── Key helpers ───────────────────────────────────────────────────────────────
const today = () => new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'

const KEYS = {
  totalViews: "analytics:total_views",
  uniqueVisitors: "analytics:unique_visitors", // HLL
  dailyViews: (date: string) => `analytics:daily_views:${date}`,
  dailyUnique: (date: string) => `analytics:daily_unique:${date}`,
  sections: "analytics:section_views", // hash  { section -> count }
  sectionDwell: "analytics:section_dwell", // hash  { section -> total_ms }
  ctas: "analytics:cta_clicks", // hash  { label -> count }
  pages: "analytics:page_views", // hash  { path -> count }
  referrers: "analytics:referrers", // hash  { referrer -> count }
  devices: "analytics:devices", // hash  { device -> count }
  countries: "analytics:countries", // hash  { country -> count }
};

// ── Writers ───────────────────────────────────────────────────────────────────

export async function recordPageview(event: PageviewEvent) {
  const date = today();
  const pipeline = redis.pipeline();

  pipeline.incr(KEYS.totalViews);
  pipeline.incr(KEYS.dailyViews(date));

  // Unique visitor tracking via HyperLogLog (O(1), ~3KB max per key)
  pipeline.pfadd(KEYS.uniqueVisitors, event.sessionId);
  pipeline.pfadd(KEYS.dailyUnique(date), event.sessionId);

  // Per-page view counts
  pipeline.hincrby(KEYS.pages, event.path, 1);

  // Referrer
  if (event.referrer) {
    const ref = normaliseReferrer(event.referrer);
    pipeline.hincrby(KEYS.referrers, ref, 1);
  }

  // Device
  if (event.device) {
    pipeline.hincrby(KEYS.devices, event.device, 1);
  }

  if (event.country) {
    pipeline.hincrby(KEYS.countries, event.country, 1);
  }

  // Expire daily keys after 90 days
  pipeline.expire(KEYS.dailyViews(date), 60 * 60 * 24 * 90);
  pipeline.expire(KEYS.dailyUnique(date), 60 * 60 * 24 * 90);

  await pipeline.exec();
}

export async function recordSectionDwell(event: SectionDwellEvent) {
  const pipeline = redis.pipeline();
  pipeline.hincrby(KEYS.sections, event.section, 1);
  pipeline.hincrbyfloat(KEYS.sectionDwell, event.section, event.durationMs);
  await pipeline.exec();
}

export async function recordCtaClick(event: CtaClickEvent) {
  await redis.hincrby(KEYS.ctas, event.label, 1);
}

// ── Reader ────────────────────────────────────────────────────────────────────

export async function getAnalyticsStats(): Promise<AnalyticsStats> {
  // ── Fetch all top-level stats in parallel ────────────────────────────────
  const [
    totalViews,
    uniqueVisitors,
    sectionsHash,
    sectionDwellHash,
    ctasHash,
    pagesHash,
    referrersHash,
    devicesHash,
    countriesHash,
  ] = await Promise.all([
    redis.get<number>(KEYS.totalViews),
    redis.pfcount(KEYS.uniqueVisitors),
    redis.hgetall<Record<string, number>>(KEYS.sections),
    redis.hgetall<Record<string, number>>(KEYS.sectionDwell),
    redis.hgetall<Record<string, number>>(KEYS.ctas),
    redis.hgetall<Record<string, number>>(KEYS.pages),
    redis.hgetall<Record<string, number>>(KEYS.referrers),
    redis.hgetall<Record<string, number>>(KEYS.devices),
    redis.hgetall<Record<string, number>>(KEYS.countries),
  ]);

  // ── Build last-30-day daily stats ────────────────────────────────────────
  const dailyKeys: string[] = [];
  const dailyDates: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    dailyDates.push(dateStr);
    dailyKeys.push(KEYS.dailyViews(dateStr), KEYS.dailyUnique(dateStr));
  }

  const dailyRaw = await Promise.all(
    dailyKeys.map((k) => redis.get<number>(k)),
  );

  const daily: DailyStats[] = dailyDates.map((date, i) => ({
    date,
    views: dailyRaw[i * 2] ?? 0,
    uniqueVisitors: dailyRaw[i * 2 + 1] ?? 0,
  }));

  const todayViews = daily[daily.length - 1]?.views ?? 0;
  const weekViews = daily.slice(-7).reduce((s, d) => s + d.views, 0);
  const monthViews = daily.reduce((s, d) => s + d.views, 0);

  // ── Section metrics ───────────────────────────────────────────────────────
  const SECTIONS_ORDER = [
    "hero",
    "about",
    "skills",
    "projects",
    "contact",
    "blog",
  ];
  const heroViews = sectionsHash?.["hero"] ?? 1; // avoid division by zero

  const sections: SectionMetric[] = SECTIONS_ORDER.map((section) => {
    const totalViews = sectionsHash?.[section] ?? 0;
    const totalDwellMs = Number(sectionDwellHash?.[section] ?? 0);
    const avgDwellMs = totalViews > 0 ? totalDwellMs / totalViews : 0;
    const reachRate = Math.min(100, Math.round((totalViews / heroViews) * 100));

    return {
      section,
      totalViews,
      totalDwellMs,
      avgDwellMs,
      reachRate,
      recommendation: buildRecommendation(section, reachRate, avgDwellMs),
    };
  });

  // ── CTAs ──────────────────────────────────────────────────────────────────
  const CTA_LABELS: Record<string, string> = {
    download_cv: "Download CV",
    lets_connect: "Let's Connect",
    github_link: "GitHub Link",
    live_demo: "Live Demo",
    social_github: "Social → GitHub",
    social_linkedin: "Social → LinkedIn",
    social_twitter: "Social → Twitter",
    view_all_projects: "View All Projects",
    read_more: "Read More (Blog)",
  };

  const ctas: CtaMetric[] = Object.entries(ctasHash ?? {})
    .map(([label, clicks]) => ({
      label,
      displayName: CTA_LABELS[label] ?? label,
      clicks: Number(clicks),
    }))
    .sort((a, b) => b.clicks - a.clicks);

  // ── Top pages ─────────────────────────────────────────────────────────────
  const topPages: TopPage[] = Object.entries(pagesHash ?? {})
    .map(([path, views]) => ({ path, views: Number(views) }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  // ── Referrers ─────────────────────────────────────────────────────────────
  const referrers: ReferrerMetric[] = Object.entries(referrersHash ?? {})
    .map(([referrer, visits]) => ({ referrer, visits: Number(visits) }))
    .sort((a, b) => b.visits - a.visits)
    .slice(0, 10);

  // ── Devices ───────────────────────────────────────────────────────────────
  const devices: DeviceMetric[] = Object.entries(devicesHash ?? {})
    .map(([device, count]) => ({ device, count: Number(count) }))
    .sort((a, b) => b.count - a.count);

  const countries: CountryMetric[] = Object.entries(countriesHash ?? {})
    .map(([country, visits]) => ({ country, visits: Number(visits) }))
    .sort((a, b) => b.visits - a.visits)
    .slice(0, 10);

  return {
    overview: {
      totalViews: totalViews ?? 0,
      uniqueVisitors,
      todayViews,
      weekViews,
      monthViews,
    },
    daily,
    sections,
    ctas,
    topPages,
    referrers,
    devices,
    countries,
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function normaliseReferrer(ref: string): string {
  if (!ref) return "direct";
  try {
    const host = new URL(ref).hostname.replace("www.", "");
    if (host.includes("google")) return "google";
    if (host.includes("linkedin")) return "linkedin";
    if (host.includes("github")) return "github";
    if (host.includes("twitter") || host.includes("x.com")) return "twitter";
    if (host.includes("bing")) return "bing";
    return host;
  } catch {
    return "direct";
  }
}

function buildRecommendation(
  section: string,
  reachRate: number,
  avgDwellMs: number,
): string {
  const avgSecs = avgDwellMs / 1000;

  if (reachRate < 30) {
    return `⚠️ Only ${reachRate}% of visitors reach this section. Move it higher or add a visual hook above it.`;
  }
  if (reachRate < 60) {
    return `📉 ${reachRate}% reach rate. Consider adding a CTA or scroll prompt in the section above to guide visitors down.`;
  }
  if (avgSecs < 5 && section !== "hero") {
    return `⏱️ Visitors spend only ~${avgSecs.toFixed(1)}s here. Add more engaging content, visuals, or interactive elements.`;
  }
  if (section === "contact" && reachRate < 50) {
    return `📬 Low reach for Contact section. Try adding a quick email link earlier in the page.`;
  }
  if (section === "projects" && avgSecs < 10) {
    return `🚀 Projects section has low engagement. Try adding live demo previews or case-study CTAs to each card.`;
  }
  return `✅ Good engagement — ${reachRate}% reach, ~${avgSecs.toFixed(1)}s average dwell.`;
}
