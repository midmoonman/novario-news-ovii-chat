import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Header } from "@/components/novario/Header";
import { BottomNav } from "@/components/novario/BottomNav";
import { BreakingTicker } from "@/components/novario/BreakingTicker";
import { HeroSlider } from "@/components/novario/HeroSlider";
import { TrendingRow } from "@/components/novario/TrendingRow";
import { TrendingPeople } from "@/components/novario/TrendingPeople";
import { CategoryGrid } from "@/components/novario/CategoryGrid";
import { getHomeFeed, getNews } from "@/server/newsapi.functions";
import { CATEGORIES, initArticleImages } from "@/lib/news";

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
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    // Only pre-fetch when on the news section
    initArticleImages();

    const interval = setInterval(() => {
      window.location.reload();
    }, 15 * 60 * 1000); // 15 minutes
    return () => clearInterval(interval);
  }, []);

  if (pathname !== "/news" && pathname !== "/news/") {
    return <Outlet />;
  }

  if (data.mode === "cat") {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-background text-foreground flex flex-col"
      >
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
      </motion.div>
    );
  }

  const heroPool = data.all.slice(0, 8);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden"
    >
      {/* Background blobs for glassmorphism effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] animate-float" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px] animate-float" style={{ animationDelay: "-5s" }} />
        <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] rounded-full bg-purple-500/10 blur-[120px] animate-float" style={{ animationDelay: "-10s" }} />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <BreakingTicker />
        <main className="mx-auto max-w-7xl w-full px-4 py-6 space-y-12 flex-1">
          <HeroSlider articles={heroPool} />
          <TrendingRow articles={data.all.slice(0, 12)} />
          <TrendingPeople />

          {/* Per-section strips */}
          {(["India", "World", "Business", "Tech", "Sports"] as const).map((cat) => {
            const list = data.byCategory[cat]?.slice(0, 4) ?? [];
            if (list.length === 0) return null;
            return (
              <section key={cat} className="relative">
                <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-2">
                  <h2 className="serif text-2xl font-bold tracking-tight">{cat}</h2>
                  <Link to="/news" search={{ cat }} className="text-[10px] uppercase tracking-[0.2em] font-black text-primary hover:opacity-70 transition-opacity">More {cat} →</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {list.map((a: import("@/server/newsapi.functions").RemoteArticle) => (
                    <Link key={a.id} to="/news/$slug" params={{ slug: a.slug }} className="group glass-2 rounded-[24px] overflow-hidden hover:scale-[1.02] transition-all duration-500">
                      <div className="aspect-[16/10] overflow-hidden relative">
                        <img src={a.image} alt={a.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="p-5">
                        <div className="text-[9px] text-primary font-black uppercase tracking-[0.2em] mb-2">{a.source}</div>
                        <h3 className="serif font-bold leading-[1.4] line-clamp-3 text-[17px] group-hover:text-primary transition-colors">{a.title}</h3>
                        <div className="mt-4 flex items-center gap-3 text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                          <span>{a.publishedAt}</span>
                          <span className="w-1 h-1 rounded-full bg-border" />
                          <span>{a.readTime} min read</span>
                        </div>
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
    </motion.div>
  );
}
