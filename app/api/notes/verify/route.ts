import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const passkey = request.headers.get('x-admin-passkey');
  const validKey = process.env.ADMIN_PASSKEY || 'spatial-mind-2026';
  
  if (passkey === validKey) {
    return NextResponse.json({ success: true });
  }
  
  return NextResponse.json({ success: false }, { status: 401 });
}
