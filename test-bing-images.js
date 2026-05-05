// test-bing-images.js  — run with: node test-bing-images.js
const BING_KEY = "643c267be4b9b46d212104cbdbc3b31c5433ad527af8ac96a687bc3cb253815c";

const QUERIES = [
  "Madhya Pradesh industrial growth India",
  "ISRO SpaDeX space docking",
  "RBI repo rate India",
  "India AI compute technology",
  "G20 Cape Town climate summit",
  "Smriti Mandhana cricket India",
  "Busan International Film Festival",
  "Vande Bharat train India",
  "silicon photonics startup Bengaluru",
];

async function bingImage(query) {
  const url = `https://api.bing.microsoft.com/v7.0/images/search?q=${encodeURIComponent(query)}&count=1&imageType=Photo&safeSearch=Moderate`;
  const res = await fetch(url, {
    headers: { "Ocp-Apim-Subscription-Key": BING_KEY },
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }
  const data = await res.json();
  return data?.value?.[0]?.contentUrl || null;
}

(async () => {
  console.log("Testing Bing Image Search API...\n");
  let passed = 0;
  for (const q of QUERIES) {
    try {
      const img = await bingImage(q);
      if (img) {
        console.log(`✅  ${q.substring(0, 50)}`);
        console.log(`    → ${img.substring(0, 80)}...\n`);
        passed++;
      } else {
        console.log(`⚠️  ${q} — no image returned\n`);
      }
    } catch (e) {
      console.log(`❌  ${q} — ${e.message}\n`);
    }
  }
  console.log(`\nResult: ${passed}/${QUERIES.length} queries returned images.`);
})();
