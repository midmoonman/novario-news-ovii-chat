const query = "Molly Little";
const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } })
  .then(r => r.text())
  .then(html => {
    const snippetMatch = html.match(/<a class="result__snippet[^>]*>([\s\S]*?)<\/a>/);
    console.log(snippetMatch ? "Found" : "Not Found");
  });
