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
            className="group relative shrink-0 w-72 rounded-[24px] overflow-hidden glass-2 hover:scale-[1.02] transition-all duration-500"
          >
            <div className="relative h-40 overflow-hidden">
              <img src={a.image} alt={a.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute top-3 left-3 glass-2-light rounded-full w-8 h-8 flex items-center justify-center text-xs font-black text-primary">
                {idx + 1}
              </div>
            </div>
            <div className="p-5">
              <div className="text-[9px] text-primary font-black uppercase tracking-[0.2em]">{a.category}</div>
              <h3 className="mt-2 serif font-bold leading-snug line-clamp-3 text-[16px] group-hover:text-primary transition-colors">{a.title}</h3>
              <div className="mt-4 text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{a.publishedAt} • {a.readTime} min read</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
