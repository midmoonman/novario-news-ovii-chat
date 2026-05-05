const query = "Molly Little";
const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;

fetch(url)
  .then(r => r.text())
  .then(html => {
    const snippetMatch = html.match(/<a class="result__snippet[^>]*>([\s\S]*?)<\/a>/);
    const titleMatch = html.match(/<h2 class="result__title">[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/);
    if (snippetMatch && titleMatch) {
      // Remove b tags
      const snippet = snippetMatch[1].replace(/<\/?b>/g, '').trim();
      const title = titleMatch[1].replace(/<\/?b>/g, '').trim();
      console.log({ title, snippet });
    } else {
      console.log("No results");
    }
  })
  .catch(console.error);
