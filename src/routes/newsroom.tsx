import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
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
  head: () => ({
    meta: [
      { title: "Newsroom — City news from across India & the world | Novario" },
      { name: "description", content: "Live, city-by-city headlines from 140+ Indian and global cities. Inspired by Google News." },
    ],
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
    getCityNews({ data: { city: activeCity.city, country: activeCity.country } })
      .then((res) => { if (alive) setArticles(res.articles); })
      .catch(() => { if (alive) setArticles([]); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [activeCity?.city, activeCity?.country]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="mx-auto max-w-7xl w-full px-4 py-6 flex-1">
        <div className="mb-6">
          <div className="text-xs uppercase tracking-[0.2em] text-primary font-bold">Newsroom</div>
          <h1 className="serif text-3xl md:text-4xl font-extrabold mt-1">City desks — live headlines</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl text-sm">
            Pick any city to see the latest stories filed from there. Powered by NewsAPI.
          </p>
        </div>

        <div className="flex gap-2 mb-4">
          {(["india", "world"] as const).map((s) => (
            <button
              key={s}
              onClick={() => navigate({ search: { scope: s, city: undefined } })}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                scope === s ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"
              }`}
            >
              {s === "india" ? `India · ${INDIA_CITIES.length}` : `World · ${WORLD_CITIES.length}`}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* City list */}
          <aside className="lg:sticky lg:top-4 lg:self-start lg:max-h-[80vh] flex flex-col rounded-xl border border-border bg-card overflow-hidden">
            <div className="p-3 border-b border-border">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search city or country…"
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div className="overflow-y-auto max-h-[60vh] lg:max-h-none">
              {filtered.map((c) => {
                const active = activeCity && c.city === activeCity.city && c.country === activeCity.country;
                return (
                  <button
                    key={`${c.city}-${c.country}`}
                    onClick={() => navigate({ search: { scope, city: c.city } })}
                    className={`w-full text-left px-4 py-2.5 text-sm border-l-2 transition-colors ${
                      active ? "border-primary bg-primary/10 text-foreground" : "border-transparent hover:bg-muted/40 text-foreground/80"
                    }`}
                  >
                    <div className="font-semibold">{c.city}</div>
                    <div className="text-[11px] text-muted-foreground flex justify-between">
                      <span>{c.country}</span>
                      <span>{(c.pop / 1_000_000).toFixed(1)}M</span>
                    </div>
                  </button>
                );
              })}
              {filtered.length === 0 && <div className="p-4 text-sm text-muted-foreground">No matches.</div>}
            </div>
          </aside>

          {/* Feed */}
          <section>
            {activeCity && (
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Now reporting from</div>
                  <h2 className="serif text-2xl md:text-3xl font-bold">{activeCity.city}<span className="text-muted-foreground">, {activeCity.country}</span></h2>
                </div>
                <div className="text-xs text-muted-foreground">{loading ? "Loading…" : articles ? `${articles.length} stories` : ""}</div>
              </div>
            )}

            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-xl border border-border bg-card overflow-hidden animate-pulse">
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
              <div className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
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
                    className="group rounded-xl overflow-hidden bg-card border border-border hover:border-primary/40 hover:shadow-glow transition-all"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={a.image} alt={a.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-4">
                      <div className="text-[10px] text-primary font-bold uppercase tracking-wider">{a.source}</div>
                      <h3 className="mt-2 serif font-bold leading-snug line-clamp-3">{a.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{a.excerpt}</p>
                      <div className="mt-3 text-xs text-muted-foreground">{a.publishedAt} · {a.readTime} min</div>
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
