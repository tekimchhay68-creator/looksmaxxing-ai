import { AnalysisResult, RoutineItem } from "@/lib/types";

interface ResultsViewProps {
  result: AnalysisResult;
  onReset: () => void;
}

const badgeStyle: Record<"low" | "medium" | "high", string> = {
  low: "bg-accent-beige/60 text-muted",
  medium: "bg-accent-sand/60 text-foreground/70",
  high: "bg-warm-accent/20 text-warm-accent",
};

function PotentialBadge({ level }: { level: "low" | "medium" | "high" }) {
  return (
    <span className={`font-sans text-xs px-2 py-0.5 rounded-full ${badgeStyle[level]}`}>
      {level}
    </span>
  );
}

const dotColors: Record<RoutineItem["category"], string> = {
  skincare: "bg-accent-sand",
  grooming: "bg-warm-accent",
  exercise: "bg-accent-beige border border-accent-sand",
  diet: "bg-accent-sand/60",
  habit: "bg-muted/30",
};

function CategoryDot({ category }: { category: RoutineItem["category"] }) {
  return (
    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${dotColors[category]}`} />
  );
}

const TIME_ORDER: RoutineItem["time"][] = ["morning", "evening", "weekly", "ongoing"];

export default function ResultsView({ result, onReset }: ResultsViewProps) {
  const sortedInsights = [...result.insights].sort((a, b) => a.priority - b.priority);

  const routineByTime = result.routine.reduce<Record<string, RoutineItem[]>>(
    (acc, item) => {
      if (!acc[item.time]) acc[item.time] = [];
      acc[item.time].push(item);
      return acc;
    },
    {}
  );

  return (
    <section className="max-w-2xl mx-auto px-6 pb-28">
      {/* Glow Score */}
      <div className="text-center pt-12 pb-8">
        <p className="font-sans text-xs text-muted uppercase tracking-widest mb-3">
          Glow Score
        </p>
        <span className="font-serif text-8xl text-foreground leading-none">
          {result.overallScore}
        </span>
        <span className="font-serif text-4xl text-warm-accent">/10</span>
      </div>

      {/* Top Priority */}
      <div className="rounded-3xl bg-accent-sand/40 border border-accent-sand px-6 py-5 mb-10 text-center">
        <p className="font-sans text-xs text-muted uppercase tracking-widest mb-2">
          This Week&apos;s Priority
        </p>
        <p className="font-serif text-lg text-foreground leading-snug">
          {result.topPriority}
        </p>
      </div>

      {/* Insights */}
      <h2 className="font-serif text-2xl text-foreground tracking-wide mb-5">
        Your Insights
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
        {sortedInsights.map((insight) => (
          <div
            key={insight.category}
            className="rounded-2xl border border-accent-sand/50 bg-background px-5 py-5 space-y-2"
          >
            <div className="flex items-center justify-between">
              <p className="font-sans text-xs uppercase tracking-widest text-muted">
                {insight.category}
              </p>
              <PotentialBadge level={insight.improvementPotential} />
            </div>
            <p className="font-sans text-sm text-foreground/80 leading-relaxed">
              {insight.currentState}
            </p>
          </div>
        ))}
      </div>

      {/* Routine */}
      <h2 className="font-serif text-2xl text-foreground tracking-wide mb-6">
        Your Daily Routine
      </h2>
      <div className="space-y-8 mb-16">
        {TIME_ORDER.filter((t) => routineByTime[t]?.length).map((time) => (
          <div key={time}>
            <h3 className="font-serif text-base text-foreground/60 tracking-wide capitalize mb-3">
              {time}
            </h3>
            <div className="rounded-2xl border border-accent-sand/40 bg-background px-5 divide-y divide-accent-sand/30">
              {routineByTime[time].map((item, i) => (
                <div key={i} className="flex gap-4 items-start py-4">
                  <CategoryDot category={item.category} />
                  <div className="flex-1 space-y-0.5">
                    <p className="font-sans text-sm text-foreground font-medium">
                      {item.action}
                    </p>
                    <p className="font-sans text-xs text-muted leading-relaxed">
                      {item.rationale}
                    </p>
                    {item.durationMinutes && (
                      <p className="font-sans text-xs text-warm-accent">
                        {item.durationMinutes} min
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Reset */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="font-sans text-sm text-muted uppercase tracking-widest
                     hover:text-foreground transition-colors duration-300
                     border-b border-muted/40 pb-0.5"
        >
          Analyse another photo
        </button>
      </div>
    </section>
  );
}
