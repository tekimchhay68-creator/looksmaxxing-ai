"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { AppStep, AnalysisResult } from "@/lib/types";
import LoadingShimmer from "@/components/LoadingShimmer";
import ResultsView from "@/components/ResultsView";

function panelClass(active: boolean) {
  return active
    ? "transition-all duration-500 ease-in-out opacity-100 translate-y-0 pointer-events-auto relative"
    : "transition-all duration-500 ease-in-out opacity-0 translate-y-2 pointer-events-none absolute inset-0";
}

export default function Home() {
  const { data: session } = useSession();
  const [step, setStep] = useState<AppStep>("capture");
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Toast
  const [toast, setToast] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    };
  }, []);

  function showToast(message: string) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(message);
    setTimeout(() => setToastVisible(true), 16);
    toastTimer.current = setTimeout(() => dismissToast(), 4000);
  }

  function dismissToast() {
    setToastVisible(false);
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    dismissTimer.current = setTimeout(() => setToast(null), 300);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function handleAnalyze() {
    if (!preview) return;
    setStep("loading");
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataUrl: preview }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Analysis failed. Please try again.");
      }
      const data: AnalysisResult = await res.json();
      setResult(data);
      setStep("results");
      if (session?.user) {
        fetch("/api/analyses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }).catch(() => {});
      }
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Something went wrong.");
      setStep("capture");
    }
  }

  function handleReset() {
    setStep("capture");
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
    // Delay clearing result so ResultsView doesn't flash empty during the 500ms fade-out
    setTimeout(() => setResult(null), 600);
  }

  return (
    <main className="min-h-screen bg-background flex-1">
      <div
        aria-live="polite"
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out
          ${toastVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
      >
        {toast && (
          <div className="flex items-start gap-3 bg-accent-beige border border-accent-sand
                          rounded-2xl px-5 py-4 shadow-sm w-[90vw] max-w-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-warm-accent shrink-0 mt-0.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <p className="font-sans text-sm text-foreground/80 leading-relaxed flex-1">{toast}</p>
            <button
              onClick={dismissToast}
              className="text-muted hover:text-foreground transition-colors shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="relative">
        <div className={panelClass(step === "capture")} aria-hidden={step !== "capture"}>
          <section className="pt-12 sm:pt-24 pb-4 px-6 text-center">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight tracking-tight max-w-xl mx-auto">
              Your Best Self, Revealed.
            </h1>
            <p className="font-sans text-muted text-lg mt-5 max-w-md mx-auto leading-relaxed">
              A kind, science-backed look at your aesthetic potential — and a clear path forward.
            </p>

            <ol className="flex flex-col gap-5 mt-10 mb-2 max-w-sm mx-auto text-left">
              {[
                {
                  title: "Find natural light.",
                  body: "Stand near a window or step outside — soft, even light brings out the most accurate detail.",
                },
                {
                  title: "Take a clean, forward-facing photo.",
                  body: "No filters, no heavy edits. Just you, looking straight at the camera.",
                },
                {
                  title: "Upload and discover.",
                  body: "Receive a personalised facial analysis and curated routine in seconds.",
                },
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="font-serif text-warm-accent text-lg leading-none mt-0.5 w-5 shrink-0">
                    {i + 1}.
                  </span>
                  <div>
                    <span className="font-serif text-sm text-foreground">{step.title}</span>{" "}
                    <span className="font-sans text-sm text-muted leading-relaxed">{step.body}</span>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="px-6 mt-10">
            <div className="max-w-lg mx-auto">
              <label
                htmlFor="photo-upload"
                className="block rounded-3xl border-2 border-dashed border-accent-sand bg-accent-beige/40 px-8 py-10 sm:py-16 cursor-pointer text-center hover:bg-accent-sand/30 transition-colors"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Selected photo"
                    className="rounded-2xl max-h-64 object-cover mx-auto"
                  />
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.25}
                      stroke="currentColor"
                      className="w-12 h-12 mx-auto text-warm-accent"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0-3 3m3-3 3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.338-2.32 5.25 5.25 0 0 1 1.841 8.26"
                      />
                    </svg>
                    <p className="font-serif text-xl mt-5 text-foreground">
                      Upload your photo
                    </p>
                    <p className="font-sans text-sm text-muted mt-2">
                      JPG, PNG or WEBP · Max 10 MB
                    </p>
                  </>
                )}
              </label>
              <input
                ref={inputRef}
                id="photo-upload"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={handleFileChange}
              />
              <p className="text-xs text-muted text-center mt-3">
                {session?.user
                  ? "Your photo is never stored. Results are saved to your history."
                  : "Your photo is never stored. Sign in to save your results."}
              </p>

              {preview && (
                <button
                  onClick={handleAnalyze}
                  className="mt-6 w-full rounded-full bg-warm-accent text-background font-sans
                             text-sm tracking-widest uppercase py-4 hover:bg-accent-sand
                             hover:text-foreground transition-colors duration-300"
                >
                  Analyse
                </button>
              )}
            </div>
          </section>
        </div>

        <div className={panelClass(step === "loading")} aria-hidden={step !== "loading"}>
          <LoadingShimmer />
        </div>

        <div className={panelClass(step === "results")} aria-hidden={step !== "results"}>
          {result && preview && (
            <ResultsView result={result} photoUrl={preview} onReset={handleReset} />
          )}
        </div>
      </div>
    </main>
  );
}
