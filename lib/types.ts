export interface InsightArea {
  category: string;
  currentState: string;
  improvementPotential: "low" | "medium" | "high";
  priority: number;
}

export interface RoutineItem {
  time: "morning" | "evening" | "weekly" | "ongoing";
  category: "skincare" | "grooming" | "exercise" | "diet" | "habit";
  action: string;
  rationale: string;
  durationMinutes?: number;
}

export const POSITIVE = "#2D5A27";
export const NEGATIVE = "#A63D40";

export interface Annotation {
  x: number;
  y: number;
  type: "positive" | "negative";
  label: string;
}

export interface AnalysisResult {
  insights: InsightArea[];
  routine: RoutineItem[];
  overallScore: number;
  topPriority: string;
  annotations: Annotation[];
}

export type AppStep = "capture" | "loading" | "results";
