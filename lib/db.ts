import { neon } from "@neondatabase/serverless";
import { AnalysisRecord, AnalysisResult } from "./types";

function sql() {
  return neon(process.env.DATABASE_URL!);
}

export async function saveAnalysis(userId: string, result: AnalysisResult): Promise<string> {
  const db = sql();
  const rows = await db`
    INSERT INTO analyses (user_id, glow_score, top_priority, insights, routine, annotations)
    VALUES (
      ${userId},
      ${result.overallScore},
      ${result.topPriority},
      ${JSON.stringify(result.insights)},
      ${JSON.stringify(result.routine)},
      ${JSON.stringify(result.annotations)}
    )
    RETURNING id
  `;
  return rows[0].id as string;
}

export async function getUserAnalyses(userId: string): Promise<AnalysisRecord[]> {
  const db = sql();
  const rows = await db`
    SELECT id, glow_score, top_priority, insights, created_at
    FROM analyses
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
    LIMIT 50
  `;
  return rows.map((row) => ({
    id: row.id as string,
    glowScore: parseFloat(row.glow_score as string),
    topPriority: row.top_priority as string,
    insights: row.insights,
    createdAt: (row.created_at as Date).toISOString(),
  }));
}
