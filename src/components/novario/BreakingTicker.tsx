import { useEffect, useState } from "react";
import { BREAKING } from "@/lib/news";
import { getHomeFeed } from "@/server/newsapi.functions";

export function BreakingTicker() {
  const [items, setItems] = useState<string[]>(BREAKING);

  useEffect(() => {
    let alive = true;
    getHomeFeed()
      .then((res) => {
        if (!alive) return;
        const live = res.all.slice(0, 8).map((a) => a.title);
        if (live.length >= 3) setItems(live);
      })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  const loop = [...items, ...items];
  return (
    <div className="flex items-stretch border-y border-border bg-card overflow-hidden">
      <div className="flex items-center gap-2 bg-breaking px-4 py-2 text-breaking-foreground font-bold text-xs uppercase tracking-wider shrink-0">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse-dot" />
        Breaking
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div className="flex gap-12 whitespace-nowrap py-2 animate-ticker">
          {loop.map((t, i) => (
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
