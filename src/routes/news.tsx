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
import { Background3D } from "@/components/novario/Background3D";
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
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
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

  const { scrollYProgress } = useScroll();
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <div className="relative min-h-screen perspective-2000 overflow-x-hidden">
      <Background3D />
      
      {/* 3D Scroll Meter */}
      <div className="fixed top-24 right-6 z-50 hidden lg:block preserve-3d">
        <motion.div 
          style={{ rotateY: useTransform(scrollYProgress, [0, 1], [0, 360 * 2]) }}
          className="w-10 h-10 preserve-3d"
        >
          <div className="absolute inset-0 bg-primary/20 border border-primary/40 backdrop-blur-sm rounded-lg flex items-center justify-center font-black text-[10px] text-primary">
            {Math.round(scrollYProgress.get() * 100)}%
          </div>
          {/* 3D Sides */}
          <div className="absolute inset-0 bg-primary/10 border border-primary/20 translate-z-[-20px] rounded-lg" />
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ rotateX, transformOrigin: "top" }}
        className="flex flex-col preserve-3d"
      >
        <Header />
        <BreakingTicker />
        <main className="mx-auto max-w-7xl w-full px-4 py-6 space-y-20 flex-1 preserve-3d">
          <HeroSlider articles={heroPool} />
          <TrendingRow articles={data.all.slice(0, 12)} />
          <TrendingPeople />

          {/* Per-section strips with 3D Reveal */}
          {(["India", "World", "Business", "Tech", "Sports"] as const).map((cat) => {
            const list = data.byCategory[cat]?.slice(0, 4) ?? [];
            if (list.length === 0) return null;
            return (
              <motion.section 
                key={cat}
                initial={{ opacity: 0, rotateX: -10, y: 30 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="preserve-3d"
              >
                <div className="flex items-center justify-between mb-8 border-b border-border/40 pb-3">
                  <h2 className="serif text-3xl font-extrabold tracking-tight bloom-primary">{cat}</h2>
                  <Link to="/news" search={{ cat }} className="text-[10px] font-black uppercase tracking-widest text-primary hover:bloom-gold transition-all">More {cat} →</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {list.map((a: import("@/server/newsapi.functions").RemoteArticle) => (
                    <Link key={a.id} to="/news/$slug" params={{ slug: a.slug }} className="group rounded-2xl overflow-hidden bg-card/40 backdrop-blur-sm border border-border/40 hover:border-primary/60 transition-all hover:-translate-y-2 hover:shadow-glow preserve-3d">
                      <div className="aspect-[16/10] overflow-hidden relative">
                        <img src={a.image} alt={a.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="p-5">
                        <div className="text-[9px] text-primary font-black uppercase tracking-[0.2em]">{a.source}</div>
                        <h3 className="mt-2.5 serif font-bold text-lg leading-tight line-clamp-3 group-hover:text-primary transition-colors">{a.title}</h3>
                        <div className="mt-4 flex items-center justify-between text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                          <span>{a.readTime} MIN</span>
                          <span>{a.publishedAt}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.section>
            );
          })}

          <div className="pt-10">
            <CategoryGrid initial="Top" articles={data.all} categories={CATEGORIES as unknown as string[]} />
          </div>
        </main>
        <BottomNav />
      </motion.div>
    </div>
  );
}
