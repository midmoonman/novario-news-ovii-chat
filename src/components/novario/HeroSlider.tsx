import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ARTICLES, type Article } from "@/lib/news";
import { useTranslation } from "@/lib/i18n";

type Slide = Pick<Article, "id" | "slug" | "title" | "excerpt" | "image" | "category" | "author" | "publishedAt" | "readTime">;

export function HeroSlider({ articles }: { articles?: Slide[] }) {
  const slides: Slide[] = (articles && articles.length > 0 ? articles : ARTICLES).slice(0, 5);
  const [i, setI] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, [slides.length]);

  if (slides.length === 0) return null;
  const s = slides[i];

  return (
    <div className="relative h-[62vh] min-h-[420px] max-h-[640px] w-full overflow-hidden rounded-2xl shadow-elegant">
      <AnimatePresence mode="sync">
        <motion.div
          key={s.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <img src={s.image} alt={s.title} loading="eager" className="h-full w-full object-cover" />
          <div className="absolute inset-0 gradient-hero" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-4 bottom-4 md:inset-x-8 md:bottom-8">
        <motion.div 
          key={s.id + "-t"} 
          initial={{ y: 24, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.7 }}
          className="glass-2 p-6 md:p-10 rounded-[32px] border border-white/10"
        >
          <span className="inline-block rounded-full bg-primary px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary-foreground">
            {t(s.category)}
          </span>
          <Link to="/news/$slug" params={{ slug: s.slug }} className="block mt-4 group">
            <h1 className="serif text-2xl md:text-5xl font-black text-white text-balance max-w-3xl leading-[1.2] tracking-tight group-hover:text-primary transition-colors">
              {t(s.title)}
            </h1>
          </Link>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-white/60 line-clamp-2 font-medium leading-relaxed">{t(s.excerpt)}</p>
          <div className="mt-6 flex items-center gap-3 text-[10px] text-white/40 font-bold uppercase tracking-widest">
            <span>{s.author}</span><span>•</span><span>{s.publishedAt}</span><span>•</span><span>{s.readTime} {t("min read")}</span>
          </div>
        </motion.div>
      </div>

      <div className="absolute right-4 bottom-4 md:right-8 md:bottom-8 flex gap-2">
        {slides.map((_, k) => (
          <button
            key={k}
            onClick={() => setI(k)}
            className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-primary" : "w-3 bg-white/40"}`}
            aria-label={`Slide ${k + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
