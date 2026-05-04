import { useEffect, useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ARTICLES, CATEGORIES, type Article } from "@/lib/news";
import { getNews, type RemoteArticle } from "@/server/newsapi.functions";

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
              {c}
              {active === c && (
                <motion.span layoutId="cat-underline" className="absolute inset-x-2 -bottom-px h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((a) => (
          <Link
            key={a.id}
            to="/news/$slug"
            params={{ slug: a.slug }}
            className="group rounded-xl overflow-hidden bg-card border border-border hover:border-primary/40 hover:shadow-glow transition-all"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img src={a.image} alt={a.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-5">
              <div className="text-xs text-primary font-bold uppercase tracking-wider">{a.category}</div>
              <h3 className="mt-2 serif text-lg font-bold leading-snug text-balance line-clamp-2">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{a.excerpt}</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-medium text-foreground/80">{a.author}</span>
                <span>•</span><span>{a.publishedAt}</span>
              </div>
            </div>
          </Link>
        ))}
        {list.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground">No stories in this section yet.</div>
        )}
      </div>

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
                Loading...
              </>
            ) : (
              "Load More News"
            )}
          </button>
        </div>
      )}
    </section>
  );
}
