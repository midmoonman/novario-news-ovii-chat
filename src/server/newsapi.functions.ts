// News feed powered by The Guardian API

const GUARDIAN_API_KEY = "70f3d718-766d-49bd-ae89-44b455129f16";

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

const CATEGORY_TO_SECTION: Record<string, string> = {
  Business: "business",
  Entertainment: "culture",
  Health: "society",
  Science: "science",
  Sports: "sport",
  Tech: "technology",
  World: "world",
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "story";
}

function readTime(text: string) {
  const words = text.split(/\s+/).length;
  return Math.max(2, Math.round(words / 200));
}

export function getGradientFallback(seed: string) {
  // Ultra-premium dark neutral gradient (midnight blue to zinc black).
  // No random colors generated, meaning absolutely zero chance of green.
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><defs><radialGradient id="r" cx="50%" cy="50%" r="75%"><stop offset="0%" stop-color="%231a1a2e"/><stop offset="100%" stop-color="%2309090b"/></radialGradient><pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/></pattern></defs><rect width="800" height="500" fill="%2309090b"/><rect width="800" height="500" fill="url(%23r)"/><rect width="800" height="500" fill="url(%23g)"/></svg>`;
}

// ── Cache ──
const cache = new Map<string, { at: number; data: RemoteArticle[] }>();
const CACHE_MS = 15 * 60 * 1000;

let articlesBySlug = new Map<string, RemoteArticle>();
if (typeof window !== "undefined") {
  try {
    // Force clear cache once to fix the Molly-Mae Hague issue
    sessionStorage.removeItem("novario-articles");
    sessionStorage.removeItem("novario-time");
    cache.clear();
  } catch (e) {}
}

function saveToStorage() {
  if (typeof window !== "undefined") {
    const obj = Object.fromEntries(articlesBySlug.entries());
    try {
      sessionStorage.setItem("novario-articles", JSON.stringify(obj));
      sessionStorage.setItem("novario-time", Date.now().toString());
    } catch (e) {}
  }
}

export async function fetchGuardianNews(query: string, category: string, page = 1): Promise<RemoteArticle[]> {
  const cacheKey = `g:${query}:${category}:${page}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.at < CACHE_MS) return cached.data;

  try {
    const section = CATEGORY_TO_SECTION[category];
    let url = `https://content.guardianapis.com/search?api-key=${GUARDIAN_API_KEY}&show-fields=thumbnail,bodyText,byline&page=${page}&page-size=30`;
    
    if (section) url += `&section=${section}`;
    if (query) url += `&q=${encodeURIComponent(query)}`;
    
    // Always use newest to guarantee recent news
    url += `&order-by=newest`;

    const res = await fetch(url);
    if (!res.ok) return [];
    
    const data = await res.json();
    const results = data.response?.results || [];

    const articles = results.map((item: any, i: number): RemoteArticle => {
      const title = item.webTitle;
      const slug = slugify(title) + "-" + item.id.replace(/\//g, "-");
      const bodyText = item.fields?.bodyText || "Full article content is not available for this story.";
      
      // Split by double newline or fallback to chunks if it's one massive block
      let body = bodyText.split(/\n+/).filter(Boolean);
      if (body.length === 1 && body[0].length > 500) {
        body = body[0].match(/.{1,500}(\s|$)/g) || [body[0]];
      }

      const excerpt = body[0]?.substring(0, 150) + "..." || title;

      const article: RemoteArticle = {
        id: item.id,
        slug,
        title,
        excerpt,
        body,
        image: item.fields?.thumbnail || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
        category: category || item.sectionName,
        author: item.fields?.byline || "Guardian Staff",
        publishedAt: new Date(item.webPublicationDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
        source: "The Guardian",
        url: item.webUrl,
        readTime: readTime(title + " " + bodyText),
        trending: i < 6,
      };
      
      articlesBySlug.set(article.slug, article);
      return article;
    });

    // Wikipedia fallback is handled at the getNews level now

    saveToStorage();
    cache.set(cacheKey, { at: Date.now(), data: articles });
    return articles;
  } catch (e) {
    console.error("Guardian fetch failed", e);
    return [];
  }
}

export async function fetchWikipediaFallback(query: string, category: string): Promise<RemoteArticle[]> {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|pageimages&generator=search&exlimit=1&explaintext=1&piprop=thumbnail&pithumbsize=800&gsrsearch=${encodeURIComponent(query)}&gsrlimit=1&origin=*`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    
    const pages = data.query?.pages;
    if (!pages) return [];
    
    const pageObj: any = Object.values(pages)[0];
    if (!pageObj) return [];
    
    const title = pageObj.title;
    
    // Check if it's a completely unrelated fuzzy match (e.g. searching "Molly Little" returns "Molly-Mae Hague")
    // The Wikipedia title must contain at least the first word or last word of the query exactly, or vice versa
    const tLower = title.toLowerCase();
    const qLower = query.toLowerCase();
    
    // Very strict match: if it's not a direct substring either way, reject it.
    // E.g. "molly little" and "molly-mae hague" -> rejected.
    // "sydney sweeney" and "Sydney Sweeney" -> accepted.
    // But also allow partial first-word match for people with middle names etc.
    const queryWords = qLower.split(/\s+/).filter(w => w.length >= 4);
    const isPartialMatch = queryWords.some(word => tLower.includes(word));
    
    if (!tLower.includes(qLower) && !qLower.includes(tLower) && !isPartialMatch) {
       return [];
    }
    
    let bodyText = pageObj.extract || "No detailed summary available.";
    
    // TRUNCATE useless bottom sections where links/tables are stripped by the API
    bodyText = bodyText.replace(/==+\s*(Filmography|References|External links|See also|Notes|Bibliography|Discography|Awards and nominations)\s*==+[\s\S]*/gi, "");
    
    // Clean up Wikipedia == Section == headers
    bodyText = bodyText.replace(/==+([^=]+)==+/g, "\n\n$1\n\n");
    
    const slug = slugify(title) + "-wiki-" + pageObj.pageid;
    
    let body = bodyText.split(/\n+/).filter(Boolean);
    if (body.length === 1 && body[0].length > 500) {
      body = body[0].match(/.{1,500}(\s|$)/g) || [body[0]];
    }

    const excerpt = body[0]?.substring(0, 150) + "..." || title;

    const article: RemoteArticle = {
      id: "wiki-" + pageObj.pageid,
      slug,
      title,
      excerpt,
      body,
      image: pageObj.thumbnail?.source || getGradientFallback(query),
      category: category || "Encyclopedia",
      author: "Wikipedia Contributors",
      publishedAt: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      source: "Wikipedia",
      url: `https://en.wikipedia.org/?curid=${pageObj.pageid}`,
      readTime: readTime(title + " " + bodyText),
      trending: false,
    };
    
    articlesBySlug.set(article.slug, article);
    return [article];
  } catch (e) {
    console.error("Wiki fetch failed", e);
    return [];
  }
}

export async function fetchWebSearchFallback(query: string, category: string): Promise<RemoteArticle[]> {
  try {
    const ddgUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    // Use corsproxy.io to bypass browser CORS restrictions for DuckDuckGo HTML
    const url = `https://corsproxy.io/?${encodeURIComponent(ddgUrl)}`;
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } });
    if (!res.ok) return [];
    
    const html = await res.text();
    const snippetMatch = html.match(/<a class="result__snippet[^>]*>([\s\S]*?)<\/a>/);
    const titleMatch = html.match(/<h2 class="result__title">[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/);
    
    if (!snippetMatch || !titleMatch) return [];
    
    const snippet = snippetMatch[1].replace(/<\/?b>/g, '').trim();
    const title = titleMatch[1].replace(/<\/?b>/g, '').trim();
    
    const slug = slugify(title) + "-ddg-" + Date.now();
    const body = snippet.split(/\n+/).filter(Boolean);
    const excerpt = body[0]?.substring(0, 150) + "..." || title;
    
    const article: RemoteArticle = {
      id: "ddg-" + Date.now(),
      slug,
      title,
      excerpt,
      body,
      image: getGradientFallback(query),
      category: category || "Web Search",
      author: "DuckDuckGo Results",
      publishedAt: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      source: "Web Search",
      url: `https://duckduckgo.com/?q=${encodeURIComponent(query)}`,
      readTime: readTime(title + " " + snippet),
      trending: false,
    };
    
    articlesBySlug.set(article.slug, article);
    return [article];
  } catch (e) {
    console.error("DDG fetch failed", e);
    return [];
  }
}

// ── Google News RSS ── Free, universal, no API key needed ─────────────────────
// This guarantees recent news for ANY person/topic search, sorted newest first.
export async function fetchGoogleNewsRSS(query: string, fallbackImage?: string): Promise<RemoteArticle[]> {
  const DEFAULT_IMG = `https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80`;
  try {
    const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
    // rss2json.com converts RSS to JSON and handles CORS — free, 10k req/day
    const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    if (data.status !== "ok" || !Array.isArray(data.items)) return [];
    
    // Sort by newest first
    const items = (data.items as any[]).sort((a, b) =>
      new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );

    // De-dupe by title
    const seen = new Set<string>();
    const unique = items.filter(item => {
      const key = (item.title || "").toLowerCase().trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return unique.map((item: any, i: number): RemoteArticle => {
      const title = item.title || "Untitled";
      const slug = slugify(title) + "-gnews-" + i + "-" + Date.now();
      
      // Google News hides thumbnails inside the HTML description. Extract it!
      const imgMatch = (item.description || "").match(/<img[^>]+src="([^">]+)"/i);
      const extractedImg = imgMatch ? imgMatch[1] : null;

      const rawDesc = item.description?.replace(/<[^>]+>/g, "") || "";
      const body = rawDesc ? [rawDesc] : [title];
      const excerpt = rawDesc.substring(0, 150) + "..." || title;
      
      // Use actual article image, then extracted thumbnail, then fallback
      const image = item.enclosure?.link
        ? item.enclosure.link
        : extractedImg
          ? extractedImg
          : item.thumbnail
            ? item.thumbnail
            : fallbackImage || DEFAULT_IMG;

      const sourceName = item.author?.split(" - ").pop()?.trim() || item.source?.title || "News";

      const article: RemoteArticle = {
        id: "gnews-" + slugify(title) + i,
        slug,
        title,
        excerpt,
        body,
        image,
        category: sourceName,  // Use actual news source name, not the search query
        author: item.author?.split(" - ")[0]?.trim() || sourceName,
        publishedAt: new Date(item.pubDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
        source: sourceName,
        url: item.link || "#",
        readTime: readTime(title + " " + rawDesc),
        trending: i < 5,
      };

      articlesBySlug.set(article.slug, article);
      return article;
    });
  } catch (e) {
    console.error("Google News RSS failed", e);
    return [];
  }
}

// Try to fetch a Wikipedia thumbnail image for non-notable people via the REST summary API
async function fetchWikipediaImage(query: string): Promise<string | null> {
  try {
    // Try exact page title first
    const pageName = query.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join("_");
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageName)}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data.thumbnail?.source) return data.thumbnail.source;
    }
    return null;
  } catch {
    return null;
  }
}

// ── Napkin AI for Story Illustrations ──
const NAPKIN_API_KEY = "sk-40491de7962ad41bc114c1af338f3d4afc048da427833061b765eb8fb58a7dba";

export async function fetchNapkinIllustration(query: string, excerpt: string): Promise<string | null> {
  try {
    // Note: Since Napkin AI API is in developer preview, this endpoint might need adjustment.
    // Most standard visual generation APIs use a POST request like this.
    const res = await fetch("https://api.napkin.ai/v1/visuals", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${NAPKIN_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: `Create a professional, sleek illustration for: ${query}. Context: ${excerpt}` })
    });
    
    if (res.ok) {
      const data = await res.json();
      // Adjust this based on the actual response structure (e.g. data.url or data.image_url)
      if (data && data.url) return data.url;
    }
    return null;
  } catch (e) {
    console.error("Napkin AI fetch failed", e);
    return null;
  }
}

const TMDB_API_KEY = "3f8af7f1ca1d529dea0f89190639240d";

async function fetchWithTimeout(url: string, ms = 1500) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

// Fetch massive collection of real celebrity photos, movie posters, and backdrops from TMDB
async function fetchTMDBImages(query: string): Promise<{ profile?: string, newsImages: string[] }> {
  try {
    const cleanQuery = query.toLowerCase().replace(" series", "").replace(" movie", "");
    const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(cleanQuery)}`;
    const res = await fetchWithTimeout(searchUrl, 1500);
    const data = await res.json();
    
    if (data.results && data.results.length > 0) {
      const topResult = data.results[0];
      const newsImages: string[] = [];
      let profile: string | undefined;
      
      if (topResult.media_type === 'person') {
        const imgRes = await fetchWithTimeout(`https://api.themoviedb.org/3/person/${topResult.id}/images?api_key=${TMDB_API_KEY}`, 1500);
        const imgData = await imgRes.json();
        
        // Save the best portrait for their Bio card
        if (imgData.profiles && imgData.profiles.length > 0) {
           profile = `https://image.tmdb.org/t/p/w780${imgData.profiles[0].file_path}`;
        }

        // Fetch high-quality 16:9 backdrops from their movies/shows to use for news cards
        if (topResult.known_for) {
          for (const media of topResult.known_for) {
             const mediaType = media.media_type || 'movie';
             if (media.backdrop_path) newsImages.push(`https://image.tmdb.org/t/p/w780${media.backdrop_path}`);
             
             // Fetch additional backdrops from this specific movie/show
             try {
               const mediaImgs = await fetchWithTimeout(`https://api.themoviedb.org/3/${mediaType}/${media.id}/images?api_key=${TMDB_API_KEY}`, 1500);
               const mediaImgData = await mediaImgs.json();
               if (mediaImgData.backdrops) {
                  // Grab top 5 backdrops per show to ensure variety
                  mediaImgData.backdrops.slice(0, 5).forEach((b: any) => {
                     newsImages.push(`https://image.tmdb.org/t/p/w780${b.file_path}`);
                  });
               }
             } catch(e) {}
          }
        }
        
        // Fallback to portraits ONLY if we found absolutely no backdrops
        if (newsImages.length === 0 && imgData.profiles) {
           imgData.profiles.forEach((p: any) => newsImages.push(`https://image.tmdb.org/t/p/w780${p.file_path}`));
        }

      } else if (topResult.media_type === 'tv' || topResult.media_type === 'movie') {
        const type = topResult.media_type;
        const imgRes = await fetchWithTimeout(`https://api.themoviedb.org/3/${type}/${topResult.id}/images?api_key=${TMDB_API_KEY}`, 1500);
        const imgData = await imgRes.json();
        
        if (topResult.poster_path) profile = `https://image.tmdb.org/t/p/w780${topResult.poster_path}`;
        if (topResult.backdrop_path) newsImages.push(`https://image.tmdb.org/t/p/w780${topResult.backdrop_path}`);
        
        if (imgData.backdrops) imgData.backdrops.forEach((b: any) => newsImages.push(`https://image.tmdb.org/t/p/w780${b.file_path}`));
      }
      
      // Remove duplicates
      return { profile, newsImages: Array.from(new Set(newsImages)) };
    }
    return { newsImages: [] };
  } catch {
    return { newsImages: [] };
  }
}
export async function getNews(category = "Top", page = 1) {
  // If category doesn't match our standard ones, treat it as a search query
  const standardCats = ["Top", "India", "World", "Business", "Tech", "Sports", "Entertainment", "Science", "Health"];
  
  if (standardCats.includes(category)) {
    const articles = await fetchGuardianNews(category === "India" ? "India" : "", category === "Top" || category === "India" ? "" : category, page);
    return { articles, category };
  } else {
    // ── STRICT RULE: custom search always returns bio first, then recent news ──
    
    if (page === 1) {
      const [wikiResults, googleNews, guardianArticles, tmdbData] = await Promise.all([
        fetchWikipediaFallback(category, "Encyclopedia"),
        fetchGoogleNewsRSS(category),
        fetchGuardianNews(category, "", 1),
        fetchTMDBImages(category), // Fetch TMDB posters and photos
      ]);
      
      const tmdbImages = tmdbData.newsImages;
      const tmdbProfile = tmdbData.profile;

      // Bio: Wikipedia first, DDG fallback, then try Wikipedia REST image API
      let bio = wikiResults;
      let primaryImage: string | undefined;
      
      if (bio.length > 0) {
        // Wikipedia found the article.
        // If Wikipedia didn't have an image (it used the ui-avatars fallback)
        // AND TMDB found a poster/profile, overwrite the avatar with the TMDB image!
        if (bio[0].image.includes("ui-avatars.com")) {
           if (tmdbProfile) {
             bio[0].image = tmdbProfile;
           } else if (tmdbImages.length > 0) {
             bio[0].image = tmdbImages[0];
           }
        }
        primaryImage = bio[0].image;
      } else {
        // Try Wikipedia REST API for image only (more lenient than search API)
        const wikiImg = await fetchWikipediaImage(category);
        bio = await fetchWebSearchFallback(category, "Web Search");
        
        if (bio.length > 0) {
          // If we found a Wiki image, attach it. Otherwise leave the DDG placeholder.
          if (wikiImg) {
            bio[0].image = wikiImg;
          } else if (tmdbProfile) {
            bio[0].image = tmdbProfile;
          } else if (tmdbImages.length > 0) {
            bio[0].image = tmdbImages[0];
          } else {
             // NO STOCK PHOTOS ALLOWED: Use an elegant abstract gradient instead of alphabets
             bio[0].image = getGradientFallback(category);
          }
          articlesBySlug.set(bio[0].slug, bio[0]);
        }
        primaryImage = bio[0]?.image;
      }

      // Inject a distinct real photo of the person into each news card so they don't repeat
      const DEFAULT_IMG = "photo-1504711434969-e33886168f5c";
      const enrichedNews = googleNews.map((a, i) => {
        if (a.image.includes(DEFAULT_IMG)) {
           // If we found TMDB images (posters, backdrops, candid photos), cycle through them sequentially
           if (tmdbImages.length > 0) {
              const hash = (i + 1) % tmdbImages.length; // +1 to avoid using the same poster as the bio card if possible
              return { ...a, image: tmdbImages[hash] };
           } else {
              // NO STOCK PHOTOS ALLOWED: Generate an elegant dark gradient instead of alphabets
              return { ...a, image: getGradientFallback(category + i) };
           }
        }
        return a;
      });

      // News: Google News RSS is primary (sorted newest first)
      // De-dupe Guardian against Google News
      const gnewsUrls = new Set(enrichedNews.map(a => a.url));
      const guardianOnly = guardianArticles.filter(a => !gnewsUrls.has(a.url));

      // Final order: [Bio] → [Google News, newest first] → [Guardian supplements]
      const articles = [...bio, ...enrichedNews, ...guardianOnly];

      return { articles, category };
    } else {
      // For pagination (page 2+), just load more from Google News + Guardian
      const [googleNews, guardianArticles, tmdbData] = await Promise.all([
        fetchGoogleNewsRSS(category),
        fetchGuardianNews(category, "", page),
        fetchTMDBImages(category)
      ]);
      const tmdbImages = tmdbData.newsImages;
      
      const DEFAULT_IMG = "photo-1504711434969-e33886168f5c";
      const enrichedNews = googleNews.map((a, i) => {
        if (a.image.includes(DEFAULT_IMG)) {
           if (tmdbImages.length > 0) {
              const hash = (i + 10) % tmdbImages.length; // offset for pagination
              return { ...a, image: tmdbImages[hash] };
           } else {
              return { ...a, image: getGradientFallback(category + i) };
           }
        }
        return a;
      });

      const gnewsUrls = new Set(enrichedNews.map(a => a.url));
      const guardianOnly = guardianArticles.filter(a => !gnewsUrls.has(a.url));
      return { articles: [...enrichedNews, ...guardianOnly], category };
    }
  }
}

export async function getHomeFeed() {
  const cats = ["Top", "World", "Business", "Tech", "Sports", "Entertainment"];
  const results = await Promise.all(cats.map((c) => getNews(c)));
  
  const byCategory: Record<string, RemoteArticle[]> = {};
  cats.forEach((c, i) => { byCategory[c] = results[i].articles; });
  
  const seen = new Set<string>();
  const all: RemoteArticle[] = [];
  for (const res of results) {
    for (const a of res.articles) {
      if (seen.has(a.url)) continue;
      seen.add(a.url);
      all.push(a);
    }
  }
  return { byCategory, all };
}

export async function getArticle(slug: string) {
  if (articlesBySlug.has(slug)) {
    return { article: articlesBySlug.get(slug)! };
  }
  
  // Try to search Guardian for this specific article if not in cache
  // The slug format is `slugified-title-guardian/path/to/article`
  // We can just query the Guardian by the ID if we parse it, but for simplicity we can just search the title or return null.
  // Actually, to make direct links work, we should query Guardian. Let's extract the Guardian ID.
  const idMatch = slug.match(/-(.*)$/);
  if (idMatch && idMatch[1]) {
     // Reconstruct original ID (Guardian IDs have slashes, we replaced them with dashes in slug). 
     // This is tricky because we replaced all non-alphanumeric with dashes in slugify.
     // Safer to just use the search API with the first few words of the slug.
     const queryTerms = slug.split("-").slice(0, 5).join(" ");
     const articles = await fetchGuardianNews(queryTerms, "", 1);
     const hit = articles.find(a => a.slug === slug);
     if (hit) return { article: hit };
     if (articles.length > 0) return { article: articles[0] }; // closest match
  }
  
  if (slug.includes("-wiki-")) {
     const idMatch = slug.match(/-wiki-(.*)$/);
     if (idMatch && idMatch[1]) {
       // A direct fetch for a wiki page might be complex if we just have the ID, 
       // but since Wikipedia fallback is 1 result, we can just search the title part again.
       const queryTerms = slug.split("-wiki-")[0].split("-").join(" ");
       const articles = await fetchWikipediaFallback(queryTerms, "");
       const hit = articles.find(a => a.slug === slug);
       if (hit) return { article: hit };
     }
  }
  return { article: null };
}

export async function getCityNews(city: string) {
  const articles = await fetchGuardianNews(city, "");
  return { articles, city };
}
