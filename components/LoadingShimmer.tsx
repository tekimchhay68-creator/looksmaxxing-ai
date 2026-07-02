export default function LoadingShimmer() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6">
      {/* Breathing gradient card */}
      <div
        className="w-full max-w-sm rounded-3xl animate-breathing"
        style={{
          height: "340px",
          background: "linear-gradient(135deg, #FAFAFA 0%, #EDE5D8 100%)",
        }}
      />

      {/* Serif status line */}
      <p
        className="font-serif text-xl text-foreground/55 mt-8 tracking-wide animate-breathing"
        style={{ animationDelay: "300ms" }}
      >
        Analyzing your unique features…
      </p>
    </div>
  );
}
