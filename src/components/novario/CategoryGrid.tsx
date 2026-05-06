import { useEffect, useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ARTICLES, CATEGORIES, type Article } from "@/lib/news";
import { getNews, type RemoteArticle } from "@/server/newsapi.functions";
import { useTranslation } from "@/lib/i18n";

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

  // Removed IntersectionObserver for infinite scroll

  const source: Item[] = articles ?? ARTICLES;
  const cats = categories ?? (CATEGORIES as unknown as string[]);
  const baseList = active === "Top" || cats.length === 1 ? source : source.filter((a) => a.category === active);
  const list = [...baseList, ...extra];

  return (
    <section>
      {cats.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 mb-5 border-b border-border">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`relative shrink-0 px-4 py-3 text-sm font-medium transition-colors ${
                active === c ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t(c)}
              {active === c && (
                <motion.span layoutId="cat-underline" className="absolute inset-x-2 -bottom-px h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-2000 preserve-3d">
        {list.map((a) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, rotateX: -15, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="preserve-3d"
          >
            <Link
              to="/news/$slug"
              params={{ slug: a.slug }}
              className="group block rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm border border-border/40 hover:border-primary/60 hover:shadow-glow transition-all preserve-3d h-full"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img src={a.image} alt={a.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full backdrop-blur-md">Read Story</span>
                </div>
              </div>
              <div className="p-6">
                <div className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">{t(a.category)}</div>
                <h3 className="mt-2.5 serif text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">{t(a.title)}</h3>
                <p className="mt-3 text-[13px] text-muted-foreground line-clamp-3 leading-relaxed">{t(a.excerpt)}</p>
                <div className="mt-6 flex items-center justify-between text-[10px] text-muted-foreground font-black uppercase tracking-widest border-t border-border/20 pt-4">
                  <span className="text-primary/80">{a.author}</span>
                  <span>{a.publishedAt}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
        {list.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground">{t("No stories in this section yet.")}</div>
        )}
      </div>

      {list.length > 0 && (
        <div className="mt-16 py-12 flex justify-center">
          <button 
            onClick={loadMore}
            disabled={loading}
            className="group relative px-10 py-4 rounded-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all font-black uppercase tracking-widest text-[11px] disabled:opacity-50 overflow-hidden shadow-glow"
          >
            <span className="relative z-10 flex items-center gap-3">
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  {t("Loading Stories...")}
                </>
              ) : (
                <>
                  {t("Load More News")}
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </button>
        </div>
      )}
    </section>
  );
}
