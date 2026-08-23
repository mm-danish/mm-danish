'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import type { TrackEvent } from '@/lib/analytics/types';

// ── Session ID (anonymous, no cookies) ────────────────────────────────────────
function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  const key = 'agy_sid';
  let sid = sessionStorage.getItem(key);
  if (!sid) {
    sid = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(key, sid);
  }
  return sid;
}

// ── Device detection ──────────────────────────────────────────────────────────
function getDevice(): 'desktop' | 'mobile' | 'tablet' {
  const w = window.innerWidth;
  if (w < 768) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

// ── Fire-and-forget POST ──────────────────────────────────────────────────────
async function track(event: TrackEvent) {
  try {
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
      // Non-blocking — don't wait for response in critical path
      keepalive: true,
    });
  } catch {
    // Silently swallow errors — analytics must never break the UX
  }
}

// ── Public helper for CTA click tracking ─────────────────────────────────────
export function trackCta(label: string) {
  const sessionId = getSessionId();
  track({ type: 'cta_click', label, sessionId });
}

// ── Section dwell tracking via IntersectionObserver ───────────────────────────
const TRACKED_SECTIONS = ['hero', 'about', 'skills', 'projects', 'contact', 'blog'];

function useSectionDwellTracker(sessionId: string) {
  React.useEffect(() => {
    const dwellStart: Record<string, number> = {};
    const reported = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target.id;
          if (!section) return;

          if (entry.isIntersecting) {
            dwellStart[section] = Date.now();
          } else {
            const start = dwellStart[section];
            if (start) {
              const durationMs = Date.now() - start;
              delete dwellStart[section];
              // Only record dwells > 1s to filter scrolling noise
              if (durationMs > 1000) {
                track({ type: 'section_dwell', section, durationMs, sessionId });
              }
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe all tracked sections
    TRACKED_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Also observe blog and project list sections by class
    document.querySelectorAll('[data-track-section]').forEach((el) => {
      observer.observe(el);
    });

    // On page hide, flush remaining dwell times
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        Object.entries(dwellStart).forEach(([section, start]) => {
          const durationMs = Date.now() - start;
          if (durationMs > 1000 && !reported.has(section)) {
            reported.add(section);
            track({ type: 'section_dwell', section, durationMs, sessionId });
          }
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [sessionId]);
}

// ── Main tracker component (mount once in root layout) ────────────────────────
export function PortfolioTracker() {
  const pathname = usePathname();
  const sessionId = React.useMemo(() => getSessionId(), []);

  // Pageview tracking
  React.useEffect(() => {
    if (!sessionId) return;

    // Deduplicate: only track unique page visits per session
    const visitedKey = 'agy_visited_paths';
    let visited: string[] = [];
    try {
      visited = JSON.parse(sessionStorage.getItem(visitedKey) || '[]');
    } catch {
      // ignore parse errors
    }

    if (visited.includes(pathname)) {
      return; // Already tracked this page in the current session
    }

    visited.push(pathname);
    sessionStorage.setItem(visitedKey, JSON.stringify(visited));

    track({
      type: 'pageview',
      path: pathname,
      referrer: document.referrer || undefined,
      device: getDevice(),
      sessionId,
    });
  }, [pathname, sessionId]);

  // Section dwell tracking
  useSectionDwellTracker(sessionId);

  return null;
}
