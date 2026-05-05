// test-og-images.js — run with: node test-og-images.js
// Tests OG image extraction from real article URLs via allorigins.win

const TESTS = [
  {
    label: "The Guardian (tech article)",
    url: "https://www.theguardian.com/technology/2024/nov/20/openai-chatgpt-anniversary",
  },
  {
    label: "Google News RSS link",
    url: "https://news.google.com/rss/search?q=India+AI+technology&hl=en-US&gl=US&ceid=US:en",
  },
  {
    label: "BBC News",
    url: "https://www.bbc.com/news/technology",
  },
];

async function fetchOGImage(articleUrl) {
  if (!articleUrl || articleUrl === "#") return null;
  try {
    const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(articleUrl)}`;
    const res = await fetch(proxy, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const html = await res.text();
    const match =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i) ||
      html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i);
    return match?.[1] || null;
  } catch (e) {
    return null;
  }
}

(async () => {
  console.log("Testing OG Image Extraction via allorigins.win...\n");
  let passed = 0;
  for (const t of TESTS) {
    const img = await fetchOGImage(t.url);
    if (img) {
      console.log(`✅  ${t.label}`);
      console.log(`    → ${img.substring(0, 90)}...\n`);
      passed++;
    } else {
      console.log(`⚠️  ${t.label} — no og:image found\n`);
    }
  }
  console.log(`Result: ${passed}/${TESTS.length} URLs returned OG images.`);
})();
