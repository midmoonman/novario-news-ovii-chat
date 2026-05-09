import { useEffect, useState } from "react";
import { BREAKING } from "@/lib/news";
import { getNews } from "@/server/newsapi.functions";
import { useTranslation } from "@/lib/i18n";

export function BreakingTicker() {
  const [items, setItems] = useState<string[]>(BREAKING);
  const { t } = useTranslation();

  useEffect(() => {
    let alive = true;
    getNews("Top")
      .then((res) => {
        if (!alive) return;
        const live = res.articles.slice(0, 8).map((a) => a.title);
        if (live.length >= 3) setItems(live);
      })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  const loop = [...items, ...items];
  return (
    <div className="flex items-stretch border-b border-white/5 bg-background overflow-hidden">
      <div className="flex items-center gap-2 bg-primary px-4 py-2 text-primary-foreground font-black text-[10px] uppercase tracking-widest shrink-0">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse-dot" />
        {t("Breaking")}
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div className="flex gap-12 whitespace-nowrap py-2 animate-ticker">
          {loop.map((tText, i) => (
            <span key={i} className="text-sm text-foreground/90">
              <span className="text-breaking mr-2">●</span>
              {t(tText)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
