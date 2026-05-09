import { useEffect, useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ARTICLES, CATEGORIES, type Article } from "@/lib/news";
import { getNews, type RemoteArticle } from "@/server/newsapi.functions";
import { useTranslation } from "@/lib/i18n";
import { ChevronDown } from "lucide-react";

type Item = Pick<Article, "id" | "slug" | "title" | "excerpt" | "image" | "category" | "author" | "publishedAt">;

export function CategoryGrid({
  initial = "Top",
  articles,
  categories,
}: {
  initial?: string;
  articles?: Item[];
  categories?: string[];
}) {
  const [active, setActive] = useState<string>(initial);
  const [page, setPage] = useState(1);
  const [extra, setExtra] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => { 
    setActive(initial); 
    setPage(1); 
    setExtra([]); 
  }, [initial]);

  useEffect(() => {
    setPage(1);
    setExtra([]);
  }, [active]);

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const nextPage = page + 1;
      const { articles: res } = await getNews(active, nextPage);
      if (res.length > 0) {
        setExtra((prev) => [...prev, ...res]);
      }
      setPage(nextPage);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const source: Item[] = articles ?? ARTICLES;
  const cats = categories ?? (CATEGORIES as unknown as string[]);
  const baseList = active === "Top" || cats.length === 1 ? source : source.filter((a) => a.category === active);
  const list = [...baseList, ...extra];

  return (
    <section>
      {cats.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 mb-8 border-b border-white/5">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`relative shrink-0 px-5 py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all ${
                active === c ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t(c)}
              {active === c && (
                <motion.span layoutId="cat-underline" className="absolute inset-x-4 -bottom-px h-1 bg-primary rounded-t-full shadow-[0_0_15px_rgba(245,158,11,0.4)]" />
              )}
            </button>
          ))}
        </div>
      )}

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {list.map((a) => (
            <motion.div
              key={a.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                to="/news/$slug"
                params={{ slug: a.slug }}
                className="group block glass-2 rounded-[32px] overflow-hidden hover:scale-[1.02] transition-all duration-500 shadow-xl h-full"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={a.image} alt={a.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <div className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mb-2">{t(a.category)}</div>
                  <h3 className="serif text-[19px] font-black leading-snug tracking-tight text-balance line-clamp-2 group-hover:text-primary transition-colors">{t(a.title)}</h3>
                  <p className="mt-3 text-sm text-muted-foreground font-medium line-clamp-2 leading-relaxed opacity-70">{t(a.excerpt)}</p>
                  <div className="mt-6 flex items-center gap-3 text-[10px] text-muted-foreground font-bold uppercase tracking-widest border-t border-white/5 pt-4">
                    <span className="text-foreground/60">{a.author}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>{a.publishedAt}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
        {list.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground">{t("No stories in this section yet.")}</div>
        )}
      </motion.div>

      {list.length > 0 && (
        <div className="mt-8 py-8 flex justify-center">
          <button 
            onClick={loadMore}
            disabled={loading}
            className="px-8 py-3 rounded-full border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all font-medium disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                {t("Loading...")}
              </>
            ) : (
              t("Load More News")
            )}
          </button>
        </div>
      )}
    </section>
  );
}
