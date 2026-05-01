import { BREAKING } from "@/lib/news";

export function BreakingTicker() {
  const items = [...BREAKING, ...BREAKING];
  return (
    <div className="flex items-stretch border-y border-border bg-card overflow-hidden">
      <div className="flex items-center gap-2 bg-breaking px-4 py-2 text-breaking-foreground font-bold text-xs uppercase tracking-wider shrink-0">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse-dot" />
        Breaking
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div className="flex gap-12 whitespace-nowrap py-2 animate-ticker">
          {items.map((t, i) => (
            <span key={i} className="text-sm text-foreground/90">
              <span className="text-breaking mr-2">●</span>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
