import { NextResponse } from 'next/server';
import { getAnalyticsStats } from '@/lib/analytics/redis-store';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // ── Simple PIN protection ─────────────────────────────────────────────────
  const { searchParams } = new URL(request.url);
  const pin = searchParams.get('pin');
  const expectedPin = process.env.DASHBOARD_PIN ?? '1234';

  if (pin !== expectedPin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const stats = await getAnalyticsStats();
    return NextResponse.json(stats);
  } catch (err) {
    console.error('[Analytics Stats Error]', err);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
