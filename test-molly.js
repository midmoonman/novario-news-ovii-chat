const query = "Molly Little";
const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

fetch(url)
  .then(r => r.json())
  .then(data => {
    if (data.status === "ok") {
      console.log(`✅ Got ${data.items.length} articles for "${query}"`);
      data.items.slice(0, 3).forEach((item, i) => {
        console.log(`${i+1}. [${item.pubDate}] ${item.title}`);
      });
    } else {
      console.log("❌ Failed:", data.message);
    }
  });
