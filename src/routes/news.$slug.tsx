import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Header } from "@/components/novario/Header";
import { BottomNav } from "@/components/novario/BottomNav";
import { BreakingTicker } from "@/components/novario/BreakingTicker";
import { useState } from "react";
import { getArticle, getNews } from "@/server/newsapi.functions";
import { LiveIllustration } from "@/components/novario/LiveIllustration";
import { ArticleTimeline } from "@/components/novario/ArticleTimeline";
import { ShareCard } from "@/components/novario/ShareCard";

export const Route = createFileRoute("/news/$slug")({
  loader: async ({ params }) => {
    const { article } = await getArticle(params.slug);
    if (!article) throw notFound();
    const { articles } = await getNews(article.category);
    const related = articles.filter((a: any) => a.slug !== article.slug).slice(0, 3);
    return { article, related };
  },
  component: ArticlePage,
  errorComponent: ({ error }) => <div className="p-10 text-center text-destructive">{error.message}</div>,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center text-center p-10">
      <div>
        <h1 className="serif text-3xl font-bold">Story not found</h1>
        <p className="text-muted-foreground mt-2">It may have rolled off the live wire.</p>
        <Link to="/news" className="text-primary mt-4 inline-block">Back to Novario</Link>
      </div>
    </div>
  ),
});

function ArticlePage() {
  const { article, related } = Route.useLoaderData();
  const [isShareOpen, setShareOpen] = useState(false);
  const [accent, setAccent] = useState("rgba(245, 158, 11, 0.4)");

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = article.image;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = 1;
      canvas.height = 1;
      ctx.drawImage(img, 0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      setAccent(`rgba(${r}, ${g}, ${b}, 0.5)`);
    };
  }, [article.image]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden"
    >
      {/* Background blobs for glassmorphism effect - COLOR SYNCED */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] rounded-full blur-[140px] animate-float opacity-80 transition-colors duration-1000" style={{ backgroundColor: accent }} />
        <div className="absolute bottom-[5%] right-[-10%] w-[70%] h-[70%] rounded-full bg-blue-600/10 blur-[140px] animate-float opacity-70" style={{ animationDelay: "-5s" }} />
        <div className="absolute top-[30%] right-[10%] w-[50%] h-[50%] rounded-full blur-[140px] animate-float opacity-60 transition-colors duration-1000" style={{ backgroundColor: accent.replace("0.5", "0.3"), animationDelay: "-10s" }} />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <BreakingTicker />

        <main className="mx-auto max-w-4xl w-full px-4 pt-10 pb-20 flex-1">
          <motion.article 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="glass-2 rounded-[48px] p-6 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden"
            style={{ boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 40px ${accent.replace("0.5", "0.1")}` }}
          >
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundColor: accent }} />

            <div className="relative z-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] mb-6 font-black">
              <span className="text-white rounded-full px-4 py-1.5 shadow-lg" style={{ backgroundColor: accent.replace("0.5", "0.8") }}>{article.category}</span>
              <span className="text-white/40">{article.publishedAt} · {article.readTime} min read</span>
            </div>
            <h1 className="relative z-10 serif text-4xl md:text-6xl font-black leading-[1.1] text-balance tracking-tight">{article.title}</h1>
            <p className="relative z-10 mt-8 text-xl text-white/50 leading-relaxed font-medium">{article.excerpt}</p>

            <div className="relative z-10 mt-10 flex items-center justify-between gap-3 pb-8 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full glass-2 flex items-center justify-center font-black text-primary text-xl border border-white/10" style={{ color: accent }}>
                  {article.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-black text-[15px] tracking-tight">{article.author}</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-white/30">{article.source} · Novario Verified</div>
                </div>
              </div>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-[11px] uppercase tracking-widest font-black transition-opacity" style={{ color: accent }}>Read source ↗</a>
            </div>

            <motion.div 
              className="relative z-10 my-12 rounded-[32px] overflow-hidden shadow-2xl border border-white/5"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.5 }}
            >
              <img src={article.image} alt={article.title} className="w-full h-auto" />
            </motion.div>

            <div className="relative z-10 max-w-none text-[19px] leading-[1.8] text-white/80 font-medium font-serif space-y-6">
              <ArticleTimeline paragraphs={article.body} />
            </div>

            <div className="relative z-10 mt-16 pt-10 border-t border-white/5 flex items-center justify-between">
              <div className="flex gap-4">
                <button 
                  onClick={() => setShareOpen(true)}
                  className="rounded-full glass-2 border px-10 py-3 transition-all font-black uppercase tracking-widest text-[11px]"
                  style={{ borderColor: accent, color: accent }}
                >
                  Share Story
                </button>
              </div>
              <Link to="/news" className="text-[11px] uppercase tracking-widest font-black text-white/40 hover:text-primary transition-colors flex items-center gap-2">
                Back to Feed <span className="text-lg">→</span>
              </Link>
            </div>
          </motion.article>

          {related.length > 0 && (
            <section className="mt-24">
              <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-3">
                <h2 className="serif text-3xl font-black tracking-tight">More from Novario</h2>
                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-primary/40">Next Up</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {related.map((a: import("@/server/newsapi.functions").RemoteArticle, i) => (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link key={a.id} to="/news/$slug" params={{ slug: a.slug }} className="group block glass-2 rounded-[32px] overflow-hidden hover:scale-[1.05] transition-all duration-500 shadow-xl h-full border border-white/5">
                      <div className="aspect-[16/10] overflow-hidden relative">
                        <img src={a.image} alt={a.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      </div>
                      <div className="p-6">
                        <div className="text-[9px] text-primary font-black uppercase tracking-[0.2em] mb-2">{a.category}</div>
                        <h3 className="serif font-bold text-[17px] leading-tight line-clamp-2 group-hover:text-primary transition-colors">{a.title}</h3>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </main>

      </div>
      <BottomNav />
      <ShareCard 
        isOpen={isShareOpen} 
        onClose={() => setShareOpen(false)} 
        title={article.title} 
        image={article.image} 
        category={article.category} 
      />
    </motion.div>
  );
}
