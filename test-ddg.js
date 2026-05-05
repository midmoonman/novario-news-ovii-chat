const query = "Molly Little";
const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`;

fetch(url).then(r => r.json()).then(console.log).catch(console.error);
