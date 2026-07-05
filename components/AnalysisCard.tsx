import { AnalysisRecord } from "@/lib/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function AnalysisCard({ record }: { record: AnalysisRecord }) {
  return (
    <div className="rounded-2xl border border-[var(--accent-sand)] bg-white p-6 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-sans text-xs text-muted uppercase tracking-widest">Glow Score</p>
          <p className="font-serif text-4xl text-[var(--warm-accent)] leading-none mt-1">
            {record.glowScore}
            <span className="font-sans text-base text-muted font-normal">/10</span>
          </p>
        </div>
        <p className="font-sans text-xs text-muted mt-1">{formatDate(record.createdAt)}</p>
      </div>

      <div>
        <p className="font-sans text-xs text-muted uppercase tracking-widest mb-1">This week&apos;s focus</p>
        <p className="font-sans text-sm text-foreground/80 leading-relaxed line-clamp-2">
          {record.topPriority}
        </p>
      </div>

      {record.insights.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-1">
          {record.insights.slice(0, 3).map((insight) => (
            <span
              key={insight.category}
              className="font-sans text-xs text-muted bg-[var(--accent-beige)] rounded-full px-2.5 py-0.5"
            >
              {insight.category}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
