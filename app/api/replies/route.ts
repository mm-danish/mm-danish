import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import type { ThreadReply } from "@/data/learning";

function repliesKey(noteId: string) {
  return `replies:${noteId}`;
}

function checkPasskey(request: Request) {
  const passkey = request.headers.get("x-admin-passkey");
  const validKey = process.env.ADMIN_PASSKEY || "mm-danish";
  return passkey === validKey;
}

/** GET /api/replies?noteId=xxx */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const noteId = searchParams.get("noteId");

    if (!noteId) {
      return NextResponse.json([], { status: 400 });
    }

    const replies =
      (await redis.get<ThreadReply[]>(repliesKey(noteId))) || [];

    return NextResponse.json(replies);
  } catch (error) {
    console.error("Redis Error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

/** POST /api/replies  body: { noteId, author, content } */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { noteId, author, content } = body as {
      noteId: string;
      author: string;
      content: string;
    };

    if (!noteId || !content?.trim()) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const newReply: ThreadReply = {
      id: `reply-${noteId}-${Date.now()}`,
      noteId,
      author: author?.trim() || "Neuron",
      content: content.trim().slice(0, 500),
      date: new Date().toISOString(),
    };

    const replies =
      (await redis.get<ThreadReply[]>(repliesKey(noteId))) || [];
    replies.push(newReply);
    await redis.set(repliesKey(noteId), replies);

    return NextResponse.json({ success: true, reply: newReply });
  } catch (error) {
    console.error("Redis Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

/** DELETE /api/replies?id=xxx&noteId=xxx  (admin only) */
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
    const noteId = searchParams.get("noteId");

    if (!id || !noteId) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const replies =
      (await redis.get<ThreadReply[]>(repliesKey(noteId))) || [];
    const filtered = replies.filter((r) => r.id !== id);
    await redis.set(repliesKey(noteId), filtered);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Redis Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
