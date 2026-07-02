import { AnalysisResult, RoutineItem, POSITIVE, NEGATIVE } from "@/lib/types";
import AnnotatedPhoto from "@/components/AnnotatedPhoto";

interface ResultsViewProps {
  result: AnalysisResult;
  photoUrl: string;
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

function AnnotationItem({ label, color }: { label: string; color: string }) {
  return (
    <li className="flex items-center gap-2.5">
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
      <span className="font-sans text-xs text-foreground/70 leading-snug">{label}</span>
    </li>
  );
}

const TIME_ORDER: RoutineItem["time"][] = ["morning", "evening", "weekly", "ongoing"];

export default function ResultsView({ result, photoUrl, onReset }: ResultsViewProps) {
  const sortedInsights = [...result.insights].sort((a, b) => a.priority - b.priority);
  const annotations = result.annotations ?? [];
  const positives = annotations.filter((a) => a.type === "positive");
  const negatives = annotations.filter((a) => a.type === "negative");

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
      {/* Hero: Annotated Photo + Score & Legend */}
      <div className="flex flex-col sm:flex-row gap-6 pt-10 pb-8 animate-fade-in-up">
        {/* Annotated photo */}
        <div className="sm:w-[55%]">
          <AnnotatedPhoto photoUrl={photoUrl} annotations={annotations} />
        </div>

        {/* Right panel: score + annotation legend */}
        <div className="sm:w-[45%] flex flex-col">
          {/* Glow Score */}
          <div className="text-center pt-2 pb-5 border-b border-accent-sand/50">
            <p className="font-sans text-xs text-muted uppercase tracking-widest mb-2">
              Glow Score
            </p>
            <span className="font-serif text-6xl text-foreground leading-none">
              {result.overallScore}
            </span>
            <span className="font-serif text-2xl text-warm-accent">/10</span>
          </div>

          {/* Annotation legend */}
          <div className="pt-5 space-y-5 flex-1">
            {positives.length > 0 && (
              <div>
                <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted mb-2.5">
                  Strengths
                </p>
                <ul className="space-y-2">
                  {positives.map((a, i) => (
                    <AnnotationItem key={i} label={a.label} color={POSITIVE} />
                  ))}
                </ul>
              </div>
            )}

            {negatives.length > 0 && (
              <div>
                <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted mb-2.5">
                  To Improve
                </p>
                <ul className="space-y-2">
                  {negatives.map((a, i) => (
                    <AnnotationItem key={i} label={a.label} color={NEGATIVE} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Priority */}
      <div className="rounded-3xl bg-accent-sand/40 border border-accent-sand px-6 py-5 mb-10 text-center animate-fade-in-up [animation-delay:150ms]">
        <p className="font-sans text-xs text-muted uppercase tracking-widest mb-2">
          This Week&apos;s Priority
        </p>
        <p className="font-serif text-lg text-foreground leading-snug">
          {result.topPriority}
        </p>
      </div>

      <div className="animate-fade-in-up [animation-delay:300ms]">
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

      </div>

      {/* Reset */}
      <div className="text-center animate-fade-in-up [animation-delay:450ms]">
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
