"use client";

import { useState, useRef } from "react";
import { AppStep, AnalysisResult } from "@/lib/types";
import LoadingShimmer from "@/components/LoadingShimmer";
import ResultsView from "@/components/ResultsView";

export default function Home() {
  const [step, setStep] = useState<AppStep>("capture");
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    setError(null);
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
      setResult(await res.json());
      setStep("results");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStep("capture");
    }
  }

  function handleReset() {
    setStep("capture");
    setPreview(null);
    setResult(null);
    setError(null);
    // Clear value so the same file can trigger onChange again
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-accent-sand/60 px-8 py-5">
        <span className="font-serif text-xl text-foreground tracking-wide">
          Looksmaxxing AI
        </span>
      </nav>

      {/* Capture step */}
      {step === "capture" && (
        <>
          <section className="pt-24 pb-4 px-6 text-center">
            <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight tracking-tight max-w-xl mx-auto">
              Discover Your Best Self
            </h1>
            <p className="font-sans text-muted text-lg mt-5 max-w-md mx-auto leading-relaxed">
              Upload a clear photo and receive a personalized aesthetic analysis
              with a science-backed routine.
            </p>
          </section>

          <section className="px-6 mt-10">
            <div className="max-w-lg mx-auto">
              <label
                htmlFor="photo-upload"
                className="block rounded-3xl border-2 border-dashed border-accent-sand bg-accent-beige/40 px-8 py-16 cursor-pointer text-center hover:bg-accent-sand/30 transition-colors"
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
                Your photo is processed locally and never stored.
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

              {error && (
                <p className="mt-4 text-center font-sans text-sm text-warm-accent">
                  {error}
                </p>
              )}
            </div>
          </section>
        </>
      )}

      {/* Loading step */}
      {step === "loading" && <LoadingShimmer />}

      {/* Results step */}
      {step === "results" && result && (
        <ResultsView result={result} onReset={handleReset} />
      )}
    </main>
  );
}
