export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { getUserAnalyses } from "@/lib/db";
import AnalysisCard from "@/components/AnalysisCard";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const analyses = await getUserAnalyses(session.user.id);

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16 animate-fade-in-up">
        <div className="mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground">Your History</h1>
          <p className="font-sans text-muted text-sm mt-2">
            {analyses.length} {analyses.length === 1 ? "analysis" : "analyses"} saved
          </p>
        </div>

        {analyses.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-xl text-muted italic">No analyses yet.</p>
            <Link
              href="/"
              className="inline-block mt-5 font-sans text-sm text-[var(--warm-accent)] border-b border-[var(--warm-accent)] hover:opacity-70 transition-opacity"
            >
              Run your first analysis
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {analyses.map((record) => (
              <AnalysisCard key={record.id} record={record} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
