import { useEffect, useState } from "react";
import { BREAKING } from "@/lib/news";
import { getNews } from "@/server/newsapi.functions";
import { useTranslation } from "@/lib/i18n";
import { motion } from "framer-motion";

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
    <div className="flex items-stretch border-y border-primary/20 bg-card/30 backdrop-blur-md overflow-hidden relative group h-12">
      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      
      <div className="flex items-center gap-2 bg-gradient-to-r from-primary via-orange-600 to-primary px-6 text-primary-foreground font-black text-[11px] uppercase tracking-[0.2em] shrink-0 shadow-[4px_0_20px_rgba(245,158,11,0.4)] relative z-10">
        <div className="relative">
          <div className="w-2.5 h-2.5 rounded-full bg-white animate-ping absolute inset-0" />
          <div className="w-2.5 h-2.5 rounded-full bg-white relative z-10" />
        </div>
        {t("Live")}
      </div>
      <div className="flex-1 overflow-hidden relative flex items-center">
        <div className="flex gap-20 whitespace-nowrap animate-ticker">
          {loop.map((tText, i) => (
            <span key={i} className="text-[14px] font-bold text-foreground/90 flex items-center gap-4 group/item cursor-pointer hover:text-primary transition-colors">
              <span className="text-primary text-[10px] drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]">✦</span>
              {t(tText)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
