import { createServerFn } from "@tanstack/react-start";

export type RemoteArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  image: string;
  category: string;
  author: string;
  publishedAt: string;
  source: string;
  url: string;
  readTime: number;
  trending?: boolean;
};

const NEWS_API_KEY = "0da1339d74e246fbb905f6b15b062a3c";

// NewsAPI's free tier no longer returns results for `country=in` top-headlines.
// We use the `everything` endpoint with curated queries per section so the
// homepage feels like a real, multi-section news site (à la Google News).
type Cfg = { q: string; domains?: string; sortBy?: "publishedAt" | "popularity" | "relevancy" };
const CATEGORY_MAP: Record<string, Cfg> = {
  Top:       { q: "India OR Modi OR Mumbai OR Delhi OR Bengaluru", domains: "thehindu.com,indianexpress.com,ndtv.com,hindustantimes.com,timesofindia.indiatimes.com,livemint.com,thehindubusinessline.com,news18.com", sortBy: "publishedAt" },
  India:     { q: "India OR Modi OR Parliament OR Delhi OR Mumbai OR Bengaluru OR Kolkata", domains: "thehindu.com,indianexpress.com,ndtv.com,hindustantimes.com,timesofindia.indiatimes.com,news18.com,livemint.com", sortBy: "publishedAt" },
  World:     { q: "world OR international OR UN OR global", domains: "bbc.co.uk,reuters.com,aljazeera.com,theguardian.com,apnews.com,cnn.com,nytimes.com", sortBy: "publishedAt" },
  Business:  { q: "business OR markets OR economy OR Sensex OR Nifty OR RBI", domains: "thehindubusinessline.com,livemint.com,moneycontrol.com,business-standard.com,economictimes.indiatimes.com,reuters.com,bloomberg.com", sortBy: "publishedAt" },
  Tech:      { q: "technology OR AI OR startup OR software OR semiconductor", domains: "techcrunch.com,theverge.com,wired.com,arstechnica.com,engadget.com,zdnet.com", sortBy: "publishedAt" },
  Sports:    { q: "cricket OR IPL OR football OR ISL OR olympics OR badminton OR hockey", domains: "espn.com,espncricinfo.com,skysports.com,bbc.co.uk", sortBy: "publishedAt" },
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "story";
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.round(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} hour${h > 1 ? "s" : ""} ago`;
  const d = Math.round(h / 24);
  return `${d} day${d > 1 ? "s" : ""} ago`;
}

function readTime(text: string) {
  const words = text.split(/\s+/).length;
  return Math.max(2, Math.round(words / 200));
}

const cache = new Map<string, { at: number; data: RemoteArticle[] }>();
const CACHE_MS = 5 * 60 * 1000;

function mapArticles(rawArticles: any[], category: string): RemoteArticle[] {
  return rawArticles
    .filter((a) => a?.title && a?.url && a?.urlToImage && !String(a.title).includes("[Removed]"))
    .map((a, i): RemoteArticle => {
      const title = a.title as string;
      const desc = (a.description ?? "") as string;
      const content = (a.content ?? desc) as string;
      const cleanContent = content.replace(/\[\+\d+ chars\]$/, "").trim();
      const body = [
        desc || cleanContent,
        cleanContent && cleanContent !== desc ? cleanContent : "",
        `This story was reported by ${a.source?.name ?? "wire services"} and curated by Novario's newsroom. Read the original report for the full account.`,
      ].filter(Boolean);
      return {
        id: `${category}-${i}-${slugify(title)}`,
        slug: slugify(title),
        title,
        excerpt: desc || title,
        body,
        image: a.urlToImage,
        category,
        author: a.author?.split(",")[0]?.trim() || a.source?.name || "Newsroom",
        publishedAt: timeAgo(a.publishedAt),
        source: a.source?.name ?? "Wire",
        url: a.url,
        readTime: readTime(body.join(" ")),
        trending: i < 6,
      };
    });
}

async function fetchEverything(params: Record<string, string>, cacheKey: string, category: string): Promise<RemoteArticle[]> {
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.at < CACHE_MS) return cached.data;

  const url = new URL("https://newsapi.org/v2/everything");
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  url.searchParams.set("language", "en");
  url.searchParams.set("pageSize", "30");
  url.searchParams.set("apiKey", NEWS_API_KEY);

  try {
    const res = await fetch(url.toString(), { headers: { "User-Agent": "Novario/1.0" } });
    if (!res.ok) {
      console.error(`NewsAPI ${cacheKey} HTTP ${res.status}`);
      return [];
    }
    const json = (await res.json()) as { status?: string; articles?: any[]; message?: string };
    if (json.status !== "ok") {
      console.error(`NewsAPI ${cacheKey} status=${json.status} msg=${json.message}`);
      return [];
    }
    const articles = mapArticles(json.articles ?? [], category);
    cache.set(cacheKey, { at: Date.now(), data: articles });
    return articles;
  } catch (e) {
    console.error("NewsAPI fetch failed", cacheKey, e);
    return [];
  }
}

async function fetchCategory(category: string): Promise<RemoteArticle[]> {
  const cfg = CATEGORY_MAP[category] ?? CATEGORY_MAP.Top;
  const params: Record<string, string> = { q: cfg.q, sortBy: cfg.sortBy ?? "publishedAt" };
  if (cfg.domains) params.domains = cfg.domains;
  return fetchEverything(params, `cat:${category}`, category);
}

export const getNews = createServerFn({ method: "GET" })
  .inputValidator((data: { category?: string }) => ({ category: data?.category ?? "Top" }))
  .handler(async ({ data }) => {
    const articles = await fetchCategory(data.category);
    return { articles, category: data.category };
  });

export const getHomeFeed = createServerFn({ method: "GET" }).handler(async () => {
  const cats = ["Top", "India", "World", "Business", "Tech", "Sports"];
  const results = await Promise.all(cats.map((c) => fetchCategory(c)));
  const byCategory: Record<string, RemoteArticle[]> = {};
  cats.forEach((c, i) => { byCategory[c] = results[i]; });
  const seen = new Set<string>();
  const all: RemoteArticle[] = [];
  for (const list of results) {
    for (const a of list) {
      if (seen.has(a.url)) continue;
      seen.add(a.url);
      all.push(a);
    }
  }
  return { byCategory, all };
});

export const getArticle = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => ({ slug: data.slug }))
  .handler(async ({ data }) => {
    const cats = ["Top", "India", "World", "Business", "Tech", "Sports"];
    for (const c of cats) {
      const list = await fetchCategory(c);
      const hit = list.find((a) => a.slug === data.slug);
      if (hit) return { article: hit };
    }
    return { article: null };
  });

export const getCityNews = createServerFn({ method: "GET" })
  .inputValidator((data: { city: string; country?: string }) => ({
    city: String(data.city).slice(0, 60),
    country: data.country ? String(data.country).slice(0, 60) : "",
  }))
  .handler(async ({ data }) => {
    const q = data.country ? `"${data.city}" AND "${data.country}"` : `"${data.city}"`;
    const articles = await fetchEverything(
      { q, sortBy: "publishedAt" },
      `city:${data.city}:${data.country}`,
      data.city,
    );
    return { articles, city: data.city };
  });
