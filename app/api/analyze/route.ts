import { NextRequest, NextResponse } from "next/server";
import { analyzePhoto } from "@/lib/claude";

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  const body = await req.json().catch(() => null);
  const { dataUrl } = body ?? {};

  if (!dataUrl || typeof dataUrl !== "string") {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  const match = dataUrl.match(/^data:(image\/(?:jpeg|png|webp));base64,(.+)$/);
  if (!match) {
    return NextResponse.json(
      { error: "Invalid format. Only JPEG, PNG, and WEBP are accepted." },
      { status: 400 }
    );
  }

  const [, mediaType, base64] = match;

  // base64 inflates raw size by ~37%
  if ((base64.length * 3) / 4 > 10 * 1024 * 1024) {
    return NextResponse.json({ error: "Image exceeds the 10 MB limit." }, { status: 400 });
  }

  try {
    const result = await analyzePhoto(base64, mediaType);
    return NextResponse.json(result);
  } catch (err) {
    console.error("[analyze] Claude error:", err);
    return NextResponse.json({ error: "Analysis failed. Please try again." }, { status: 500 });
  }
}
