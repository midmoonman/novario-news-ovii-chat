import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Header } from "@/components/novario/Header";
import { BottomNav } from "@/components/novario/BottomNav";
import { BreakingTicker } from "@/components/novario/BreakingTicker";
import { getArticle, getHomeFeed } from "@/server/newsapi.functions";

export const Route = createFileRoute("/news/$slug")({
  loader: async ({ params }) => {
    const { article } = await getArticle(params.slug);
    if (!article) throw notFound();
    const { all } = await getHomeFeed();
    const related = all.filter((a) => a.slug !== article.slug).slice(0, 3);
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

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <BreakingTicker />

      <article className="mx-auto max-w-3xl w-full px-4 pt-10 pb-16 flex-1">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-3 text-xs uppercase tracking-wider mb-4">
            <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 font-bold">{article.category}</span>
            <span className="text-muted-foreground">{article.publishedAt} · {article.readTime} min read</span>
          </div>
          <h1 className="serif text-4xl md:text-5xl font-extrabold leading-tight text-balance">{article.title}</h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{article.excerpt}</p>

          <div className="mt-6 flex items-center justify-between gap-3 pb-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full gradient-gold flex items-center justify-center font-bold text-primary-foreground">
                {article.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-semibold text-sm">{article.author}</div>
                <div className="text-xs text-muted-foreground">{article.source} · via Novario</div>
              </div>
            </div>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">Read source ↗</a>
          </div>

          <div className="my-8 rounded-xl overflow-hidden shadow-elegant">
            <img src={article.image} alt={article.title} className="w-full h-auto" />
          </div>

          <div className="prose prose-invert max-w-none space-y-5 text-[17px] leading-[1.8] text-foreground/90">
            {article.body.map((p: string, i: number) => (
              <p key={i} className={i === 0 ? "first-letter:serif first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-primary" : ""}>
                {p}
              </p>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-border flex items-center justify-between text-sm">
            <div className="flex gap-3">
              <button className="rounded-full border border-border px-4 py-2 hover:border-primary/50">Share</button>
              <button className="rounded-full border border-border px-4 py-2 hover:border-primary/50">Save</button>
            </div>
            <Link to="/news" className="text-primary hover:underline">More stories →</Link>
          </div>
        </motion.div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-border bg-card/30">
          <div className="mx-auto max-w-7xl px-4 py-12">
            <h2 className="serif text-2xl font-bold mb-6">More from Novario</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((a: import("@/server/newsapi.functions").RemoteArticle) => (
                <Link key={a.id} to="/news/$slug" params={{ slug: a.slug }} className="group rounded-xl overflow-hidden bg-card border border-border hover:border-primary/40">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={a.image} alt={a.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-primary font-bold uppercase">{a.category}</div>
                    <h3 className="serif font-bold mt-2 line-clamp-2">{a.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <BottomNav />
    </div>
  );
}
