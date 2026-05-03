import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/novario/Header";
import { BottomNav } from "@/components/novario/BottomNav";
import { BreakingTicker } from "@/components/novario/BreakingTicker";
import { HeroSlider } from "@/components/novario/HeroSlider";
import { TrendingRow } from "@/components/novario/TrendingRow";
import { CategoryGrid } from "@/components/novario/CategoryGrid";
import { getHomeFeed, getNews } from "@/server/newsapi.functions";
import { CATEGORIES } from "@/lib/news";

type NewsSearch = { cat?: string };

export const Route = createFileRoute("/news")({
  validateSearch: (s: Record<string, unknown>): NewsSearch => ({
    cat: typeof s.cat === "string" ? s.cat : undefined,
  }),
  loaderDeps: ({ search }) => ({ cat: search.cat }),
  loader: async ({ deps }) => {
    if (deps.cat) {
      const { articles } = await getNews(deps.cat);
      return { mode: "cat" as const, cat: deps.cat, articles };
    }
    const home = await getHomeFeed();
    return { mode: "home" as const, ...home };
  },
  component: NewsHome,
  errorComponent: ({ error }) => <div className="p-10 text-center text-destructive">{error.message}</div>,
});

function NewsHome() {
  const data = Route.useLoaderData();

  if (data.mode === "cat") {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />
        <BreakingTicker />
        <main className="mx-auto max-w-7xl w-full px-4 py-8 flex-1">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-primary font-bold">Section</div>
              <h1 className="serif text-4xl font-extrabold mt-1">{data.cat}</h1>
            </div>
            <Link to="/news" className="text-sm text-muted-foreground hover:text-primary">← Front page</Link>
          </div>
          <CategoryGrid initial={data.cat} articles={data.articles} categories={[data.cat]} />
        </main>
        <BottomNav />
      </div>
    );
  }

  const heroPool = data.all.slice(0, 8);
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <BreakingTicker />
      <main className="mx-auto max-w-7xl w-full px-4 py-6 space-y-12 flex-1">
        <HeroSlider articles={heroPool} />
        <TrendingRow articles={data.all.slice(0, 12)} />

        {/* Per-section strips so the homepage isn't repetitive */}
        {(["India", "World", "Business", "Tech", "Sports"] as const).map((cat) => {
          const list = data.byCategory[cat]?.slice(0, 4) ?? [];
          if (list.length === 0) return null;
          return (
            <section key={cat}>
              <div className="flex items-center justify-between mb-5 border-b border-border pb-2">
                <h2 className="serif text-2xl font-bold">{cat}</h2>
                <Link to="/news" search={{ cat }} className="text-xs uppercase tracking-wider text-primary hover:underline">More {cat} →</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {list.map((a: import("@/server/newsapi.functions").RemoteArticle) => (
                  <Link key={a.id} to="/news/$slug" params={{ slug: a.slug }} className="group rounded-xl overflow-hidden bg-card border border-border hover:border-primary/40 transition-all">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={a.image} alt={a.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-4">
                      <div className="text-[10px] text-primary font-bold uppercase tracking-wider">{a.source}</div>
                      <h3 className="mt-2 serif font-bold leading-snug line-clamp-3">{a.title}</h3>
                      <div className="mt-3 text-xs text-muted-foreground">{a.publishedAt} · {a.readTime} min</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <div className="pt-4">
          <CategoryGrid initial="Top" articles={data.all} categories={CATEGORIES as unknown as string[]} />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
