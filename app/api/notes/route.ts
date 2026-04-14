import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'second-brain.json');

// Helper to read and write safely
const readNotes = () => {
  const content = fs.readFileSync(DATA_PATH, 'utf8');
  return JSON.parse(content);
};

const writeNotes = (notes: any[]) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(notes, null, 2), 'utf8');
};

export async function POST(request: Request) {
  try {
    const newNote = await request.json();
    const notes = readNotes();
    
    notes.push({
      ...newNote,
      id: `${newNote.category.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    });
    
    writeNotes(notes);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) return NextResponse.json({ success: false }, { status: 400 });

    let notes = readNotes();
    notes = notes.filter((n: any) => n.id !== id);
    
    writeNotes(notes);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
