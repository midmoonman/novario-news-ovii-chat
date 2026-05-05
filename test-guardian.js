const GUARDIAN_API_KEY = "70f3d718-766d-49bd-ae89-44b455129f16";
const query = "Molly Little";
const url = `https://content.guardianapis.com/search?api-key=${GUARDIAN_API_KEY}&q=${encodeURIComponent(query)}`;

fetch(url).then(r => r.json()).then(d => console.log(d.response.results.length)).catch(console.error);
