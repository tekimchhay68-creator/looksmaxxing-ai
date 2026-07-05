export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { saveAnalysis, getUserAnalyses } from "@/lib/db";
import { AnalysisResult } from "@/lib/types";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const result: AnalysisResult = await request.json();
  const id = await saveAnalysis(session.user.id, result);
  return NextResponse.json({ id });
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const analyses = await getUserAnalyses(session.user.id);
  return NextResponse.json(analyses);
}
