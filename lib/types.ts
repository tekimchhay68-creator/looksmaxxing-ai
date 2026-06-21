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

export interface AnalysisResult {
  insights: InsightArea[];
  routine: RoutineItem[];
  overallScore: number;
  topPriority: string;
}

export type AppStep = "capture" | "loading" | "results";
