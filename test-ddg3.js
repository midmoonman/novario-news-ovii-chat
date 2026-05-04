const query = "Molly Little";
const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } })
  .then(r => r.text())
  .then(html => {
    const snippetMatch = html.match(/<a class="result__snippet[^>]*>([\s\S]*?)<\/a>/);
    const titleMatch = html.match(/<h2 class="result__title">[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/);
    if (snippetMatch && titleMatch) {
      console.log("Title:", titleMatch[1].replace(/<\/?b>/g, '').trim());
      console.log("Snippet:", snippetMatch[1].replace(/<\/?b>/g, '').trim());
    } else {
      console.log("No match");
    }
  });
