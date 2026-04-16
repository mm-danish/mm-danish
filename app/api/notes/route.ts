import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import type { LearningItem } from '@/data/learning';

const NOTES_KEY = 'learning_notes';

export async function GET() {
  try {
    const notes = await redis.get<LearningItem[]>(NOTES_KEY) || [];
    return NextResponse.json(notes);
  } catch (error) {
    console.error('Redis Error:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newNote = await request.json();
    const notes = await redis.get<LearningItem[]>(NOTES_KEY) || [];
    
    const noteWithMetadata = {
      ...newNote,
      id: `${newNote.category.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };

    notes.push(noteWithMetadata);
    await redis.set(NOTES_KEY, notes);
    
    return NextResponse.json({ success: true, note: noteWithMetadata });
  } catch (error) {
    console.error('Redis Error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) return NextResponse.json({ success: false }, { status: 400 });

    let notes = await redis.get<LearningItem[]>(NOTES_KEY) || [];
    notes = notes.filter((n) => n.id !== id);
    
    await redis.set(NOTES_KEY, notes);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Redis Error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
