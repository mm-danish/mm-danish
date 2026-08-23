import { NextResponse } from 'next/server';
import { recordPageview, recordSectionDwell, recordCtaClick } from '@/lib/analytics/redis-store';
import type { TrackEvent } from '@/lib/analytics/types';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const event = (await request.json()) as TrackEvent;

    if (!event?.type) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    switch (event.type) {
      case 'pageview':
        await recordPageview(event);
        break;
      case 'section_dwell':
        await recordSectionDwell(event);
        break;
      case 'cta_click':
        await recordCtaClick(event);
        break;
      default:
        return NextResponse.json({ ok: false, error: 'unknown event type' }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[Analytics Track Error]', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
