import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityFade = useTransform(scrollY, [0, 400], [1, 0.5]);

  return (
    <div className="relative h-[65vh] min-h-[480px] max-h-[720px] w-full overflow-hidden rounded-3xl shadow-glow preserve-3d">
      <AnimatePresence mode="wait">
        <motion.div
          key={s.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="absolute inset-0 preserve-3d"
          style={{ y: yParallax, opacity: opacityFade }}
        >
          <img src={s.image} alt={s.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 p-8 md:p-16 z-10 preserve-3d">
        <motion.div 
          key={s.id + "-t"} 
          initial={{ y: 40, opacity: 0, rotateX: -10 }} 
          animate={{ y: 0, opacity: 1, rotateX: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="preserve-3d"
        >
          <span className="inline-block rounded-full bg-primary px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-primary-foreground shadow-glow">
            {t(s.category)}
          </span>
          <Link to="/news/$slug" params={{ slug: s.slug }} className="block mt-6 group">
            <h1 className="serif text-3xl md:text-6xl font-black text-white text-balance max-w-4xl leading-[1.1] bloom-gold group-hover:text-primary transition-colors">
              {t(s.title)}
            </h1>
          </Link>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-white/70 line-clamp-2 leading-relaxed font-medium">{t(s.excerpt)}</p>
          <div className="mt-8 flex items-center gap-5 text-[11px] text-white/50 font-black uppercase tracking-widest border-l-2 border-primary/50 pl-4">
            <span className="text-white/90">{s.author}</span>
            <span>{s.publishedAt}</span>
            <span className="bg-white/10 px-2 py-0.5 rounded-md">{s.readTime} {t("MIN READ")}</span>
          </div>
        </motion.div>
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
        {slides.map((_, k) => (
          <button
            key={k}
            onClick={() => setI(k)}
            className={`transition-all duration-500 rounded-full border border-white/20 ${k === i ? "h-12 w-2 bg-primary border-primary shadow-glow" : "h-2 w-2 bg-white/20 hover:bg-white/40"}`}
            aria-label={`Slide ${k + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
