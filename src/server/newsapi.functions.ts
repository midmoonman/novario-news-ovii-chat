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

const CATEGORY_MAP: Record<string, { endpoint: "top-headlines" | "everything"; params: Record<string, string> }> = {
  Top:        { endpoint: "top-headlines", params: { country: "in" } },
  India:      { endpoint: "top-headlines", params: { country: "in" } },
  World:      { endpoint: "top-headlines", params: { country: "us" } },
  Business:   { endpoint: "top-headlines", params: { country: "in", category: "business" } },
  Tech:       { endpoint: "top-headlines", params: { country: "in", category: "technology" } },
  Sports:     { endpoint: "top-headlines", params: { country: "in", category: "sports" } },
  Entertainment: { endpoint: "top-headlines", params: { country: "in", category: "entertainment" } },
  Science:    { endpoint: "top-headlines", params: { country: "in", category: "science" } },
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

// In-memory cache (per worker instance) — avoid hammering NewsAPI on every nav.
const cache = new Map<string, { at: number; data: RemoteArticle[] }>();
const CACHE_MS = 5 * 60 * 1000;

async function fetchCategory(category: string): Promise<RemoteArticle[]> {
  const cfg = CATEGORY_MAP[category] ?? CATEGORY_MAP.Top;
  const cacheKey = category;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.at < CACHE_MS) return cached.data;

  const url = new URL(`https://newsapi.org/v2/${cfg.endpoint}`);
  Object.entries(cfg.params).forEach(([k, v]) => url.searchParams.set(k, v));
  url.searchParams.set("pageSize", "20");
  url.searchParams.set("apiKey", NEWS_API_KEY);

  try {
    const res = await fetch(url.toString(), { headers: { "User-Agent": "Novario/1.0" } });
    if (!res.ok) {
      console.error(`NewsAPI ${category} error ${res.status}`);
      return [];
    }
    const json = await res.json() as { articles?: any[] };
    const articles = (json.articles ?? [])
      .filter((a) => a?.title && a?.url && a?.urlToImage && !a.title.includes("[Removed]"))
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
    cache.set(cacheKey, { at: Date.now(), data: articles });
    return articles;
  } catch (e) {
    console.error("NewsAPI fetch failed", e);
    return [];
  }
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
  // Build a deduped "all" feed
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
    // Search across all cached/fresh categories
    const cats = ["Top", "India", "World", "Business", "Tech", "Sports", "Entertainment", "Science"];
    for (const c of cats) {
      const list = await fetchCategory(c);
      const hit = list.find((a) => a.slug === data.slug);
      if (hit) return { article: hit };
    }
    return { article: null };
  });
