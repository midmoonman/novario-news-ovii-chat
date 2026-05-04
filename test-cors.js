const query = "Molly Little";
const ddgUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
const url = `https://api.allorigins.win/get?url=${encodeURIComponent(ddgUrl)}`;

fetch(url)
  .then(r => r.json())
  .then(data => {
    const html = data.contents;
    const snippetMatch = html.match(/<a class="result__snippet[^>]*>([\s\S]*?)<\/a>/);
    const titleMatch = html.match(/<h2 class="result__title">[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/);
    if (snippetMatch && titleMatch) {
      console.log("Title:", titleMatch[1].replace(/<\/?b>/g, '').trim());
      console.log("Snippet:", snippetMatch[1].replace(/<\/?b>/g, '').trim());
    } else {
      console.log("No match");
    }
  });
