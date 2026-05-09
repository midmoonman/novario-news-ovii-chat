import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ARTICLES, type Article } from "@/lib/news";
import { useTranslation } from "@/lib/i18n";

type Slide = Pick<Article, "id" | "slug" | "title" | "excerpt" | "image" | "category" | "author" | "publishedAt" | "readTime">;

export function HeroSlider({ articles }: { articles?: Slide[] }) {
  const slides: Slide[] = (articles && articles.length > 0 ? articles : ARTICLES).slice(0, 5);
  const [i, setI] = useState(0);
  const [accent, setAccent] = useState("rgba(245, 158, 11, 0.3)"); // Default primary
  const { t } = useTranslation();
  const s = slides[i];

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, [slides.length]);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = s.image;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = 1;
      canvas.height = 1;
      ctx.drawImage(img, 0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      // Boost the color slightly for more vibrancy
      setAccent(`rgba(${r}, ${g}, ${b}, 0.5)`);
    };
  }, [s.image]);

  if (slides.length === 0) return null;

  return (
    <div className="relative h-[65vh] min-h-[500px] max-h-[750px] w-full overflow-hidden rounded-[40px] shadow-2xl border border-white/5 group">
      <AnimatePresence mode="wait">
        <motion.div
          key={s.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <motion.img 
            src={s.image} 
            alt={s.title} 
            loading="eager" 
            className="h-full w-full object-cover"
            initial={{ scale: 1.2, rotate: 1 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 10, ease: "linear" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-4 bottom-4 md:inset-x-10 md:bottom-10">
        <motion.div 
          key={s.id + "-t"} 
          initial={{ y: 50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.8, type: "spring", damping: 20 }}
          className="p-8 md:p-12 rounded-[48px] bg-black/40 backdrop-blur-none border border-white/5 shadow-2xl relative overflow-hidden"
          style={{ 
            boxShadow: `0 20px 60px rgba(0,0,0,0.8), 0 0 30px ${accent.replace("0.5", "0.2")}`
          }}
        >
          {/* Subtle color tint overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundColor: accent }} />

          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative z-10 inline-block rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.3em] text-white shadow-lg"
            style={{ backgroundColor: accent.replace("0.5", "0.8") }}
          >
            {t(s.category)}
          </motion.span>
          <Link to="/news/$slug" params={{ slug: s.slug }} className="block mt-6 group/link relative z-10">
            <h1 className="serif text-3xl md:text-6xl font-black text-white text-balance max-w-4xl leading-[1.1] tracking-tight group-hover/link:text-primary transition-colors duration-500">
              {t(s.title)}
            </h1>
          </Link>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-white/50 line-clamp-2 font-medium leading-relaxed relative z-10">{t(s.excerpt)}</p>
          <div className="mt-8 flex items-center gap-4 text-[11px] text-white/30 font-bold uppercase tracking-widest border-t border-white/5 pt-6 relative z-10">
            <span className="text-white/60">{s.author}</span>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
            <span>{s.publishedAt}</span>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
            <span>{s.readTime} {t("min read")}</span>
          </div>
        </motion.div>
      </div>

      <div className="absolute right-8 bottom-8 md:right-16 md:bottom-16 flex gap-3 z-20">
        {slides.map((_, k) => (
          <button
            key={k}
            onClick={() => setI(k)}
            className={`h-2 rounded-full transition-all duration-500 ${k === i ? "w-12 bg-primary shadow-glow" : "w-4 bg-white/20 hover:bg-white/40"}`}
            aria-label={`Slide ${k + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
