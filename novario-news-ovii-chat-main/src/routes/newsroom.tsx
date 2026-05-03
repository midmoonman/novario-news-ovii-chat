import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, MapPin, Globe2, Newspaper, ArrowRight } from "lucide-react";
import { Header } from "@/components/novario/Header";
import { BottomNav } from "@/components/novario/BottomNav";
import { INDIA_CITIES, WORLD_CITIES, type City } from "@/lib/cities";
import { getCityNews, type RemoteArticle } from "@/server/newsapi.functions";

type Search = { city?: string; scope?: "india" | "world" };

export const Route = createFileRoute("/newsroom")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    city: typeof s.city === "string" ? s.city : undefined,
    scope: s.scope === "world" ? "world" : "india",
  }),
  component: Newsroom,
});

function Newsroom() {
  const { city: cityParam, scope = "india" } = Route.useSearch();
  const navigate = Route.useNavigate();

  const list: City[] = scope === "world" ? WORLD_CITIES : INDIA_CITIES;
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? list.filter((c) => c.city.toLowerCase().includes(q) || c.country.toLowerCase().includes(q)) : list;
  }, [list, query]);

  const activeCity: City | undefined =
    (cityParam && list.find((c) => c.city.toLowerCase() === cityParam.toLowerCase())) || filtered[0] || list[0];

  const [articles, setArticles] = useState<RemoteArticle[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!activeCity) return;
    let alive = true;
    setLoading(true);
    setArticles(null);
    getCityNews(activeCity.city, activeCity.country)
      .then((res) => { if (alive) setArticles(res.articles); })
      .catch(() => { if (alive) setArticles([]); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [activeCity?.city, activeCity?.country]);

  // Featured chips: a quick-jump row of marquee cities
  const featured = scope === "india"
    ? ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad"]
    : ["New York", "London", "Tokyo", "Paris", "Dubai", "Singapore", "Sydney", "Berlin"];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="mx-auto max-w-7xl w-full px-4 py-8 flex-1">
        {/* M3-style header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary font-bold">
            <Newspaper className="h-3.5 w-3.5" /> Inside the Newsroom
          </div>
          <h1 className="serif text-3xl md:text-5xl font-extrabold mt-2 text-balance">
            City desks, filing live.
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            Pick a city to see the latest stories our editors are tracking from there.
          </p>
        </div>

        {/* M3 segmented button */}
        <div className="inline-flex p-1 rounded-full bg-secondary/60 border border-border mb-5">
          {(["india", "world"] as const).map((s) => {
            const active = scope === s;
            const Icon = s === "india" ? MapPin : Globe2;
            return (
              <button
                key={s}
                onClick={() => navigate({ search: { scope: s, city: undefined } })}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  active
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {s === "india" ? "India" : "World"}
              </button>
            );
          })}
        </div>

        {/* Featured city chips */}
        {!query && (
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 mb-5">
            {featured.map((name) => {
              const active = activeCity?.city === name;
              return (
                <button
                  key={name}
                  onClick={() => navigate({ search: { scope, city: name } })}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    active
                      ? "bg-primary/15 border-primary text-primary"
                      : "border-border bg-card hover:border-primary/40 text-foreground/80"
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* M3 surface — city list */}
          <aside className="lg:sticky lg:top-4 lg:self-start lg:max-h-[80vh] flex flex-col rounded-3xl bg-card/80 border border-border overflow-hidden shadow-elegant">
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search a city"
                  className="w-full bg-secondary/50 border border-transparent focus:border-primary focus:bg-background rounded-full pl-9 pr-3 py-2.5 text-sm focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div className="overflow-y-auto max-h-[60vh] lg:max-h-none p-2">
              {filtered.map((c) => {
                const active = activeCity && c.city === activeCity.city && c.country === activeCity.country;
                return (
                  <button
                    key={`${c.city}-${c.country}`}
                    onClick={() => navigate({ search: { scope, city: c.city } })}
                    className={`w-full text-left px-3 py-2.5 my-0.5 rounded-2xl text-sm transition-all flex items-center gap-3 ${
                      active
                        ? "bg-primary/15 text-foreground"
                        : "hover:bg-muted/50 text-foreground/85"
                    }`}
                  >
                    <span className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-[11px] font-bold ${
                      active ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground/70"
                    }`}>
                      {c.city.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-semibold truncate">{c.city}</span>
                      <span className="block text-[11px] text-muted-foreground truncate">{c.country}</span>
                    </span>
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <div className="p-6 text-sm text-muted-foreground text-center">No cities match “{query}”.</div>
              )}
            </div>
          </aside>

          {/* Feed */}
          <section>
            {activeCity && (
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-breaking animate-pulse-dot" />
                    Now reporting from
                  </div>
                  <h2 className="serif text-2xl md:text-3xl font-bold mt-1">
                    {activeCity.city}
                    <span className="text-muted-foreground font-normal">, {activeCity.country}</span>
                  </h2>
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  {loading ? "Loading…" : articles ? `${articles.length} stories` : ""}
                </div>
              </div>
            )}

            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-3xl border border-border bg-card overflow-hidden animate-pulse">
                    <div className="aspect-[16/10] bg-muted/40" />
                    <div className="p-4 space-y-2">
                      <div className="h-3 bg-muted/40 rounded w-1/3" />
                      <div className="h-4 bg-muted/40 rounded w-5/6" />
                      <div className="h-4 bg-muted/40 rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && articles && articles.length === 0 && (
              <div className="rounded-3xl border border-dashed border-border p-10 text-center text-muted-foreground bg-card/40">
                No stories filed from {activeCity?.city} in the last cycle. Try another city.
              </div>
            )}

            {!loading && articles && articles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {articles.map((a) => (
                  <Link
                    key={a.id}
                    to="/news/$slug"
                    params={{ slug: a.slug }}
                    className="group rounded-3xl overflow-hidden bg-card border border-border hover:border-primary/40 hover:shadow-glow transition-all flex flex-col"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={a.image}
                        alt={a.title}
                        loading="lazy"
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="text-[10px] text-primary font-bold uppercase tracking-wider">{a.source}</div>
                      <h3 className="mt-2 serif font-bold text-lg leading-snug line-clamp-3">{a.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{a.excerpt}</p>
                      <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{a.publishedAt} · {a.readTime} min read</span>
                        <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
