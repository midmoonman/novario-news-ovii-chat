const query = "Sydney Sweeney";
const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

fetch(url)
  .then(r => r.json())
  .then(data => {
    if (data.status === "ok") {
      data.items.slice(0, 3).forEach((item, i) => {
        console.log(`\nArticle ${i+1}:`, item.title);
        console.log(`Thumbnail:`, item.thumbnail);
        console.log(`Enclosure:`, item.enclosure);
        // Check if image is in description
        const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
        console.log(`Img in desc:`, imgMatch ? imgMatch[1] : null);
        console.log(`Content:`, item.content ? 'has content' : 'no content');
      });
    }
  });
