async function performSearch(query) {
  const cleanQuery = query.replace(/['"“”‘’]/g, "").trim();
  let results = "";

  // 1. Wikipedia Factual Summary API
  try {
    const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanQuery)}`;
    const res = await fetch(wikiUrl, { headers: { "User-Agent": "ELEVONE-WebSearch/1.0" } });
    if (res.ok) {
      const data = await res.json();
      if (data.extract) {
        results += `Wikipedia Factual Info:\n${data.extract}\n\n`;
      }
    }
  } catch (e) {
    console.error("Wiki search failed:", e);
  }

  // 2. Google News RSS
  try {
    const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(cleanQuery)}&hl=en-US&gl=US&ceid=US:en`;
    const res = await fetch(rssUrl, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (res.ok) {
      const xml = await res.text();
      const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];
      if (items.length > 0) {
        results += "Recent Google News & Search Results:\n";
        items.slice(0, 4).forEach((item) => {
          const title = (item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] || item.match(/<title>(.*?)<\/title>/)?.[1] || "").replace(/<[^>]+>/g, "").trim();
          const desc = (item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1] || item.match(/<description>(.*?)<\/description>/)?.[1] || "").replace(/<[^>]+>/g, "").trim();
          if (title) {
            results += `- ${title} ${desc ? `(${desc.substring(0, 150)}...)` : ""}\n`;
          }
        });
      }
    }
  } catch (e) {
    console.error("Google News search failed:", e);
  }

  return results || "No real-time web results found for this query.";
}

performSearch("Premier League match results yesterday").then(res => console.log(res));
