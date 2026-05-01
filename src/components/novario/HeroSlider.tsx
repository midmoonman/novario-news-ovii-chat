import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ARTICLES } from "@/lib/news";

const slides = ARTICLES.slice(0, 4);

export function HeroSlider() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);
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
          <img src={s.image} alt={s.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 gradient-hero" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
        <motion.div key={s.id + "-t"} initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
          <span className="inline-block rounded-full bg-primary/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
            {s.category}
          </span>
          <Link to="/news/$slug" params={{ slug: s.slug }} className="block mt-3 hover:opacity-90">
            <h1 className="serif text-2xl md:text-5xl font-bold text-white text-balance max-w-3xl leading-tight">
              {s.title}
            </h1>
          </Link>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-white/80">{s.excerpt}</p>
          <div className="mt-4 flex items-center gap-3 text-xs text-white/70">
            <span>{s.author}</span><span>•</span><span>{s.publishedAt}</span><span>•</span><span>{s.readTime} min read</span>
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
