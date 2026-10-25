import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim();
  if (!query || query.length < 2 || new TextEncoder().encode(query).length > 500) {
    return NextResponse.json({ translation: "" }, { status: 400 });
  }

  try {
    const endpoint = new URL("https://api.mymemory.translated.net/get");
    endpoint.searchParams.set("q", query);
    endpoint.searchParams.set("langpair", "de|en");
    const response = await fetch(endpoint, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error("Translation service unavailable");

    const result = await response.json() as {
      responseStatus?: number;
      responseData?: { translatedText?: string };
    };
    const translation = result.responseData?.translatedText
      ?.replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, "&")
      .trim();

    if (result.responseStatus !== 200 || !translation || translation.toLowerCase() === query.toLowerCase()) {
      return NextResponse.json({ translation: "" });
    }
    return NextResponse.json({ translation });
  } catch {
    return NextResponse.json({ translation: "" }, { status: 502 });
  }
}
