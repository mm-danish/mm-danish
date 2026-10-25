import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const passkey = request.headers.get("x-german-passkey");
  const validKey = process.env.GERMAN_PASSKEY || "8899";

  if (passkey !== validKey) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("german_access", "granted", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/german",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
