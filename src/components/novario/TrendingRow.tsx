import { Link } from "@tanstack/react-router";
import { ARTICLES, type Article } from "@/lib/news";

type Item = Pick<Article, "id" | "slug" | "title" | "image" | "category" | "publishedAt" | "readTime"> & { trending?: boolean };

export function TrendingRow({ articles }: { articles?: Item[] }) {
  const items: Item[] = articles && articles.length > 0
    ? articles.slice(0, 10)
    : (ARTICLES as Item[]).filter((a) => a.trending);
  if (items.length === 0) return null;
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="serif text-2xl font-bold flex items-center gap-2">
          <span className="text-primary">🔥</span> Trending Now
        </h2>
        <span className="text-xs text-muted-foreground uppercase tracking-wider">Updated live</span>
      </div>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
        {items.map((a, idx) => (
          <Link
            key={a.id}
            to="/news/$slug"
            params={{ slug: a.slug }}
            className="group relative shrink-0 w-72 rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all"
          >
            <div className="relative h-40 overflow-hidden">
              <img src={a.image} alt={a.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-2 left-2 bg-background/80 backdrop-blur rounded-full px-2 py-1 text-xs font-bold text-primary">
                #{idx + 1}
              </div>
            </div>
            <div className="p-4">
              <div className="text-xs text-primary font-semibold uppercase tracking-wide">{a.category}</div>
              <h3 className="mt-1 serif font-bold leading-snug line-clamp-3">{a.title}</h3>
              <div className="mt-3 text-xs text-muted-foreground">{a.publishedAt} • {a.readTime} min</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
