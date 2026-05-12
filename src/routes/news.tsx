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
  const isGlobalLoading = useRouterState({ select: (s) => s.isLoading });
  const isArticleView = pathname !== "/news" && pathname !== "/news/";

  useEffect(() => {
    initArticleImages();
    const interval = setInterval(() => {
      window.location.reload();
    }, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const SkeletonBento = () => (
    <div className="mx-auto max-w-7xl w-full px-4 py-8 space-y-20 flex-1 animate-pulse">
      <div className="h-[400px] rounded-3xl bg-primary/5 border border-primary/10 animate-glass-shimmer" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-64 rounded-2xl bg-primary/5 border border-primary/10 animate-glass-shimmer" />
        ))}
      </div>
      <div className="h-[600px] rounded-3xl bg-primary/5 border border-primary/10 animate-glass-shimmer" />
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <Header />
      <BreakingTicker />
      
      {isGlobalLoading ? (
        <SkeletonBento />
      ) : (
        <div className="flex-1 flex flex-col">
          {data.mode === "cat" ? (
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
          ) : (
            <main className="mx-auto max-w-7xl w-full px-4 py-8 space-y-20 flex-1 relative z-10">
              <section>
                <HeroSlider articles={data.all.slice(0, 8)} />
              </section>

              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-8 w-1.5 bg-primary rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                  <h2 className="serif text-3xl font-black tracking-tight">Trending Now</h2>
                </div>
                <TrendingRow articles={data.all.slice(0, 12)} />
              </section>

              <TrendingPeople />

              {(["India", "World", "Business", "Tech", "Sports"] as const).map((cat) => {
                const list = data.byCategory[cat]?.slice(0, 5) ?? [];
                if (list.length === 0) return null;
                const mainArticle = list[0];
                const sideArticles = list.slice(1, 5);

                return (
                  <section key={cat} className="group">
                    <div className="flex items-end justify-between mb-8 border-b border-primary/10 pb-4">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-1">Section Insight</div>
                        <h2 className="serif text-4xl font-black">{cat}</h2>
                      </div>
                      <Link to="/news" search={{ cat }} className="px-5 py-2 rounded-full bg-muted/50 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-primary-foreground transition-all border border-primary/10">
                        Full Dossier →
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-7">
                        <Link to="/news/$slug" params={{ slug: mainArticle.slug }} className="glass-card group/hero relative block h-full min-h-[380px]">
                          <img src={mainArticle.image} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/hero:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                          <div className="absolute bottom-4 left-4 right-4 p-6 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 z-20 overflow-hidden group-hover/hero:bg-black/50 transition-all">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="px-3 py-1 rounded-full bg-primary text-[9px] font-black uppercase tracking-[0.2em] text-primary-foreground shadow-lg">{mainArticle.source}</span>
                              <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                              <span className="text-white/80 text-[9px] font-black uppercase tracking-[0.3em]">{mainArticle.readTime} MIN READ</span>
                            </div>
                            <h3 className="serif text-xl md:text-3xl font-black text-white leading-tight group-hover/hero:text-primary transition-colors">{mainArticle.title}</h3>
                          </div>
                        </Link>
                      </div>

                      <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {sideArticles.map((a: any) => (
                          <Link key={a.id} to="/news/$slug" params={{ slug: a.slug }} className="glass-card group/item flex flex-col h-fit">
                            <div className="aspect-[16/10] overflow-hidden relative">
                               <img src={a.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110" />
                               <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[7px] font-black text-white uppercase tracking-widest">{a.source}</div>
                            </div>
                            <div className="p-3 flex-1 flex flex-col">
                              <h4 className="serif font-black text-sm leading-tight line-clamp-3 group-hover/item:text-primary transition-colors mb-4">{a.title}</h4>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </section>
                );
              })}

              <div className="pt-10">
                <div className="flex items-center gap-4 mb-10 justify-center">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/20" />
                  <h2 className="font-tokyo text-2xl md:text-4xl text-primary drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]">Deep Archive</h2>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/20" />
                </div>
                <CategoryGrid initial="Top" articles={data.all} categories={CATEGORIES as unknown as string[]} />
              </div>
            </main>
          )}
        </div>
      )}

      <BottomNav />

      {/* Liquid Sheet Overlay */}
      <AnimatePresence>
        {isArticleView && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end md:items-center justify-center p-0 md:p-10 pointer-events-none"
          >
            <Link to="/news" className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-5xl h-[92vh] md:h-full bg-background rounded-t-[32px] md:rounded-[32px] shadow-2xl overflow-hidden pointer-events-auto border-t md:border border-white/10 relative"
            >
               {/* Sheet Handle (Mobile) */}
               <div className="md:hidden w-full flex justify-center py-4">
                 <div className="w-10 h-1 rounded-full bg-primary/20" />
               </div>
               
               <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-hide">
                 <Outlet />
               </div>

               {/* Close Button (Desktop) */}
               <Link 
                to="/news"
                className="hidden md:flex absolute top-6 right-6 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md items-center justify-center text-white hover:bg-primary transition-colors border border-white/10"
               >
                 ✕
               </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
