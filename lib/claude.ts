import Anthropic from "@anthropic-ai/sdk";
import type { AnalysisResult } from "./types";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  timeout: 90_000,
});

const SYSTEM_PROMPT = `You are an expert Aesthetic & Wellness Consultant specializing in 'Looksmaxxing'—a holistic approach to maximizing physical appearance through grooming, fitness, skincare, and lifestyle habits. Your goal is to analyze user-uploaded photos (face/body) and their self-reported insecurities to provide empathetic, professional, and science-based improvement plans.

Core principles:
- Lead with empathy: acknowledge what is already working before identifying areas for improvement
- Ground every recommendation in evidence (e.g. retinol for cell turnover, SPF for photoaging, creatine for muscle retention)
- Address the full picture: skin, grooming, body composition, sleep, hydration, stress, and habit stacking
- Comment only on mutable traits — things the person can actively change. NEVER comment on bone structure, facial symmetry, ethnicity, eye color, or any immutable genetic characteristic
- Prioritize high-leverage, low-cost improvements first
- Every routine item must directly address a specific observation from the photo — no generic filler advice
- Be specific: name product categories (e.g. "niacinamide serum", "salicylic acid cleanser"), techniques, and timeframes`;

const SCHEMA_PROMPT = `Analyze the photo and return a personalized Looksmaxxing improvement plan as a single JSON object.

The response must conform exactly to this TypeScript schema:

interface InsightArea {
  category: string;              // e.g. "Skin Texture", "Brow Grooming", "Under-eye Area"
  currentState: string;          // 1-2 sentence empathetic observation
  improvementPotential: "low" | "medium" | "high";
  priority: number;              // unique integer 1 (highest) to 5 (lowest)
}

interface RoutineItem {
  time: "morning" | "evening" | "weekly" | "ongoing";
  category: "skincare" | "grooming" | "exercise" | "diet" | "habit";
  action: string;                // specific, imperative instruction
  rationale: string;             // 1 sentence: why this helps this specific person
  durationMinutes?: number;      // optional, only if step has a clear time cost
}

interface AnalysisResult {
  insights: InsightArea[];       // 4–6 items, priority values must be unique
  routine: RoutineItem[];        // 8–12 items across a mix of times and categories
  overallScore: number;          // integer 1–10 "Glow Score" for current presentation
  topPriority: string;           // single highest-impact action for the next 7 days
}

Return ONLY the JSON object — no markdown fences, no explanation, no text before or after the opening brace. Any text outside the JSON object will break the parser.`;

export async function analyzePhoto(
  base64: string,
  mediaType: string
): Promise<AnalysisResult> {
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: mediaType as
                | "image/jpeg"
                | "image/png"
                | "image/webp"
                | "image/gif",
              data: base64,
            },
          },
          {
            type: "text",
            text: SCHEMA_PROMPT,
          },
        ],
      },
    ],
  });

  const raw =
    response.content[0].type === "text" ? response.content[0].text : "";

  // Strip accidental markdown fences before parsing
  const json = raw
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  return JSON.parse(json) as AnalysisResult;
}