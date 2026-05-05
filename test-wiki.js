const query = "Molly Little";
const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|pageimages&generator=search&exlimit=1&explaintext=1&piprop=thumbnail&pithumbsize=800&gsrsearch=${encodeURIComponent(query)}&gsrlimit=1&origin=*`;

fetch(url).then(r => r.json()).then(d => console.log(JSON.stringify(d, null, 2))).catch(console.error);
