import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { CATEGORIES, getCategoryColor, type LearningItem } from "@/data/learning";

const NOTES_KEY = "learning_notes";
const RANDOM_CATEGORY_COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#a855f7", "#ec4899"];

function categoryColor(category: string, notes: LearningItem[]) {
  const existing = notes.find((note) => note.category === category);
  if (existing) return existing.color ?? getCategoryColor(category).hex;
  if (CATEGORIES.some((item) => item.name === category)) {
    return getCategoryColor(category).hex;
  }
  return RANDOM_CATEGORY_COLORS[Math.floor(Math.random() * RANDOM_CATEGORY_COLORS.length)] ?? "#3b82f6";
}

function checkPasskey(request: Request) {
  const passkey = request.headers.get("x-admin-passkey");
  const validKey = process.env.ADMIN_PASSKEY || "mm-danish";
  return passkey === validKey;
}

export async function GET() {
  try {
    const notes = (await redis.get<LearningItem[]>(NOTES_KEY)) || [];
    const categoryColors = new Map<string, string>();
    const normalizedNotes = notes.map((note) => {
      if (!categoryColors.has(note.category)) {
        categoryColors.set(note.category, note.color ?? getCategoryColor(note.category).hex);
      }
      return { ...note, color: categoryColors.get(note.category) };
    });
    return NextResponse.json(normalizedNotes);
  } catch (error) {
    console.error("Redis Error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!checkPasskey(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }
    const newNote = await request.json();
    const notes = (await redis.get<LearningItem[]>(NOTES_KEY)) || [];
    const category = String(newNote.category || "").trim();
    if (!category || !String(newNote.title || "").trim()) {
      return NextResponse.json({ success: false, error: "Title and category are required" }, { status: 400 });
    }

    const noteWithMetadata = {
      ...newNote,
      category,
      title: String(newNote.title).trim(),
      color: categoryColor(category, notes),
      id: `${category.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
    };

    notes.push(noteWithMetadata);
    await redis.set(NOTES_KEY, notes);

    return NextResponse.json({ success: true, note: noteWithMetadata });
  } catch (error) {
    console.error("Redis Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    if (!checkPasskey(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ success: false }, { status: 400 });

    let notes = (await redis.get<LearningItem[]>(NOTES_KEY)) || [];
    notes = notes.filter((n) => n.id !== id);

    await redis.set(NOTES_KEY, notes);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Redis Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    if (!checkPasskey(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }
    const updatedNote = await request.json();
    if (!updatedNote.id)
      return NextResponse.json({ success: false }, { status: 400 });
    const category = String(updatedNote.category || "").trim();
    if (!category || !String(updatedNote.title || "").trim()) {
      return NextResponse.json({ success: false, error: "Title and category are required" }, { status: 400 });
    }

    const notes = (await redis.get<LearningItem[]>(NOTES_KEY)) || [];
    const assignedColor = categoryColor(category, notes);
    const newNotes = notes.map((n) =>
      n.id === updatedNote.id ? { ...n, ...updatedNote, category, title: String(updatedNote.title).trim(), color: assignedColor } : n,
    );

    await redis.set(NOTES_KEY, newNotes);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Redis Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
