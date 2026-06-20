import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

// Keys for Redis hashes
const REVEALS_KEY = 'note_reveals';
const MASTERS_KEY = 'note_masters';

export async function GET() {
  try {
    const [reveals, masters] = await Promise.all([
      redis.hgetall<Record<string, number>>(REVEALS_KEY),
      redis.hgetall<Record<string, number>>(MASTERS_KEY)
    ]);
    
    return NextResponse.json({
      reveals: reveals || {},
      masters: masters || {}
    });
  } catch (error) {
    console.error('Redis Error:', error);
    return NextResponse.json({ reveals: {}, masters: {} }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { noteId, action } = await request.json();
    
    if (!noteId || !['reveal', 'master'].includes(action)) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    if (action === 'reveal') {
      await redis.hincrby(REVEALS_KEY, noteId, 1);
    } else if (action === 'master') {
      await redis.hincrby(MASTERS_KEY, noteId, 1);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Redis Error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
