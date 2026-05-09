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
      {/* Background blobs for glassmorphism effect - HIGHER VIBRANCY */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[140px] animate-float opacity-80" />
        <div className="absolute bottom-[5%] right-[-10%] w-[70%] h-[70%] rounded-full bg-blue-600/15 blur-[140px] animate-float opacity-70" style={{ animationDelay: "-5s" }} />
        <div className="absolute top-[30%] right-[10%] w-[50%] h-[50%] rounded-full bg-purple-600/15 blur-[140px] animate-float opacity-60" style={{ animationDelay: "-10s" }} />
        <div className="absolute bottom-[20%] left-[10%] w-[40%] h-[40%] rounded-full bg-orange-500/10 blur-[140px] animate-float opacity-40" style={{ animationDelay: "-15s" }} />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <BreakingTicker />
        <main className="mx-auto max-w-7xl w-full px-4 py-8 space-y-20 flex-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <HeroSlider articles={heroPool} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <TrendingRow articles={data.all.slice(0, 12)} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <TrendingPeople />
          </motion.div>

          {/* Per-section strips with scroll animations */}
          {(["India", "World", "Business", "Tech", "Sports"] as const).map((cat, idx) => {
            const list = data.byCategory[cat]?.slice(0, 4) ?? [];
            if (list.length === 0) return null;
            return (
              <motion.section 
                key={cat} 
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: idx * 0.05 }}
              >
                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-3">
                  <h2 className="serif text-3xl font-black tracking-tight">{cat}</h2>
                  <Link to="/news" search={{ cat }} className="text-[11px] uppercase tracking-[0.2em] font-black text-primary hover:opacity-70 transition-opacity flex items-center gap-2">
                    Explore {cat} <span className="text-lg">→</span>
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {list.map((a: import("@/server/newsapi.functions").RemoteArticle) => (
                    <motion.div
                      key={a.id}
                      whileHover={{ y: -10, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <Link to="/news/$slug" params={{ slug: a.slug }} className="block glass-2 rounded-[32px] overflow-hidden shadow-2xl h-full border border-white/5">
                        <div className="aspect-[16/10] overflow-hidden relative">
                          <img src={a.image} alt={a.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                        </div>
                        <div className="p-6">
                          <div className="text-[10px] text-primary font-black uppercase tracking-[0.3em] mb-3">{a.source}</div>
                          <h3 className="serif font-black leading-[1.3] line-clamp-3 text-[19px] tracking-tight group-hover:text-primary transition-colors">{a.title}</h3>
                          <div className="mt-6 flex items-center gap-3 text-[10px] text-white/40 font-bold uppercase tracking-widest">
                            <span>{a.publishedAt}</span>
                            <span className="w-1 h-1 rounded-full bg-white/10" />
                            <span>{a.readTime}m read</span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            );
          })}

          <motion.div 
            className="pt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <CategoryGrid initial="Top" articles={data.all} categories={CATEGORIES as unknown as string[]} />
          </motion.div>
        </main>
        <BottomNav />
      </div>
    </motion.div>
  );
}
