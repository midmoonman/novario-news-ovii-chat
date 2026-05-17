async function testRSS() {
  const cleanQuery = "premier league match yesterday winner";
  const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(cleanQuery)}&hl=en-US&gl=US&ceid=US:en`;
  console.log("Fetching URL:", rssUrl);
  try {
    const res = await fetch(rssUrl, { headers: { "User-Agent": "Mozilla/5.0" } });
    console.log("Status:", res.status, res.statusText);
    const xml = await res.text();
    console.log("Length of XML:", xml.length);
    console.log("Snippet:", xml.substring(0, 1000));
  } catch (e) {
    console.error("Fetch error:", e);
  }
}
testRSS();
