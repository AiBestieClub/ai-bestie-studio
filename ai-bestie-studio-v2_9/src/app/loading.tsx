export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]" role="status" aria-label="Loading">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-2xl bg-gradient-luxury animate-pulse shadow-glow-soft" />
          <div className="absolute inset-0 rounded-2xl border border-primary/30 animate-ping" />
        </div>
        <div className="space-y-2 w-48">
          <div className="skeleton h-2 w-full rounded" />
          <div className="skeleton h-2 w-3/4 rounded" />
        </div>
        <p className="text-xs text-text-faint animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
