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
  pendingComponent: NewsSkeleton,
});

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-card/50 backdrop-blur-sm border border-white/5 rounded-xl ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

function NewsSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <Header />
      <BreakingTicker />
      <main className="mx-auto max-w-7xl w-full px-4 py-8 space-y-20 flex-1 relative z-10">
        <section>
          <Skeleton className="h-[400px] w-full rounded-3xl" />
        </section>

        <section>
          <div className="flex items-center gap-4 mb-8">
            <Skeleton className="h-8 w-1.5 rounded-full" />
            <Skeleton className="h-8 w-48 rounded-md" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        </section>

        <section className="space-y-8">
           <div className="flex items-end justify-between mb-8">
             <div className="space-y-2">
               <Skeleton className="h-3 w-32" />
               <Skeleton className="h-10 w-48" />
             </div>
             <Skeleton className="h-10 w-32 rounded-full" />
           </div>
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
             <div className="lg:col-span-7">
               <Skeleton className="h-[450px] w-full rounded-3xl" />
             </div>
             <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
               {[1, 2, 3, 4].map((i) => (
                 <Skeleton key={i} className="h-48 w-full rounded-2xl" />
               ))}
             </div>
           </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}

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
      {/* Background Glow Orbs - Eliminates "Empty" feeling */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
            opacity: [0.03, 0.08, 0.03]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, -20, 0],
            opacity: [0.02, 0.06, 0.02]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-orange-600 blur-[100px]" 
        />
      </div>

      <Header />
      <BreakingTicker />
      
      <main className="mx-auto max-w-7xl w-full px-4 py-8 space-y-20 flex-1 relative z-10">
        <section>
          <HeroSlider articles={heroPool} />
        </section>

        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-8 w-1.5 bg-primary rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
            <h2 className="serif text-3xl font-black tracking-tight">Trending Now</h2>
          </div>
          <TrendingRow articles={data.all.slice(0, 12)} />
        </section>

        <TrendingPeople />

        {/* Cinematic Bento Sections */}
        {(["India", "World", "Business", "Tech", "Sports"] as const).map((cat, idx) => {
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
                {/* Main Hero Card */}
                <div className="lg:col-span-7">
                  <Link to="/news/$slug" params={{ slug: mainArticle.slug }} className="glass-card group/hero relative block h-full min-h-[380px]">
                    <img src={mainArticle.image} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/hero:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                    
                    {/* Glass Overlay for Content */}
                    <div className="absolute bottom-4 left-4 right-4 p-6 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 z-20 overflow-hidden group-hover/hero:bg-black/50 transition-all">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full bg-primary text-[9px] font-black uppercase tracking-[0.2em] text-primary-foreground shadow-lg">
                          {mainArticle.source}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                        <span className="text-white/80 text-[9px] font-black uppercase tracking-[0.3em]">
                          {mainArticle.readTime} MIN READ
                        </span>
                      </div>
                      <h3 className="serif text-xl md:text-3xl font-black text-white leading-tight group-hover/hero:text-primary transition-colors drop-shadow-md">
                        {mainArticle.title}
                      </h3>
                    </div>
                  </Link>
                </div>

                {/* Side Cards */}
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sideArticles.map((a: any) => (
                    <Link key={a.id} to="/news/$slug" params={{ slug: a.slug }} className="glass-card group/item flex flex-col h-fit">
                      <div className="aspect-[16/10] overflow-hidden relative">
                         <img src={a.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110 group-hover/item:blur-[1px]" />
                         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                         <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[7px] font-black text-white uppercase tracking-widest border border-white/10">{a.source}</div>
                      </div>
                      <div className="p-3 flex-1 flex flex-col relative z-20">
                        <h4 className="serif font-black text-sm leading-tight line-clamp-3 group-hover/item:text-primary transition-colors mb-4 drop-shadow-sm">{a.title}</h4>
                        <div className="mt-auto flex items-center justify-between pt-1 border-t border-white/5">
                          <div className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/50">{a.publishedAt}</div>
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center group-hover/item:bg-primary transition-colors">
                            <span className="text-primary group-hover:text-primary-foreground text-[8px]">→</span>
                          </div>
                        </div>
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
      <BottomNav />
    </motion.div>
  );
}
