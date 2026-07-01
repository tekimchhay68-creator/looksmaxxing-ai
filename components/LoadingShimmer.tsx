export default function LoadingShimmer() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-10 px-6">
      <div className="flex gap-5 items-end">
        <div
          className="w-14 h-14 bg-accent-sand/70 animate-pulse"
          style={{ borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%" }}
        />
        <div
          className="w-10 h-10 bg-warm-accent/50 animate-pulse [animation-delay:400ms]"
          style={{ borderRadius: "50% 60% 40% 55% / 45% 55% 50% 60%" }}
        />
        <div
          className="w-7 h-7 bg-accent-beige/80 animate-pulse [animation-delay:800ms]"
          style={{ borderRadius: "55% 45% 60% 40% / 60% 40% 55% 45%" }}
        />
      </div>
      <div className="text-center space-y-2">
        <p className="font-serif text-xl text-foreground/70 tracking-wide">
          Analysing your photo…
        </p>
        <p className="font-sans text-sm text-muted max-w-xs mx-auto leading-relaxed">
          This takes 15–30 seconds. Good things take time.
        </p>
      </div>
    </div>
  );
}
