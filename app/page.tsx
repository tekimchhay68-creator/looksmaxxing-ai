"use client";

import { useState, useRef } from "react";

export default function Home() {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-accent-sand/60 px-8 py-5">
        <span className="font-serif text-xl text-foreground tracking-wide">
          Looksmaxxing AI
        </span>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-4 px-6 text-center">
        <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight tracking-tight max-w-xl mx-auto">
          Discover Your Best Self
        </h1>
        <p className="font-sans text-muted text-lg mt-5 max-w-md mx-auto leading-relaxed">
          Upload a clear photo and receive a personalized aesthetic analysis
          with a science-backed routine.
        </p>
      </section>

      {/* Upload Zone */}
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
        </div>
      </section>

      {/* Results Placeholder */}
      <section className="mt-20 pb-28 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl text-foreground/30 text-center mb-8 tracking-wide">
            Your Analysis
          </h2>
          <div className="pointer-events-none select-none grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Glow Score */}
            <div className="rounded-2xl bg-accent-beige/30 border border-accent-sand/40 p-6 text-center">
              <p className="text-xs text-muted uppercase tracking-widest font-sans mb-3">
                Glow Score
              </p>
              <span className="font-serif text-5xl text-foreground/20">—</span>
            </div>

            {/* Top Priority */}
            <div className="rounded-2xl bg-accent-beige/30 border border-accent-sand/40 p-6 text-center">
              <p className="text-xs text-muted uppercase tracking-widest font-sans mb-4">
                Top Priority
              </p>
              <div className="space-y-2">
                <div className="bg-accent-beige/60 rounded h-4 w-3/4 mx-auto" />
                <div className="bg-accent-beige/60 rounded h-3 w-1/2 mx-auto" />
                <div className="bg-accent-beige/60 rounded h-3 w-2/3 mx-auto" />
              </div>
            </div>

            {/* Routine */}
            <div className="rounded-2xl bg-accent-beige/30 border border-accent-sand/40 p-6 text-center">
              <p className="text-xs text-muted uppercase tracking-widest font-sans mb-4">
                Routine
              </p>
              <div className="space-y-2">
                <div className="bg-accent-beige/60 rounded h-3 w-full mx-auto" />
                <div className="bg-accent-beige/60 rounded h-3 w-4/5 mx-auto" />
                <div className="bg-accent-beige/60 rounded h-3 w-3/5 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
