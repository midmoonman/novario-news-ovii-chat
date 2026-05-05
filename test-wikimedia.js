// test-wikimedia.js — run with: node test-wikimedia.js
// Tests Wikimedia Commons image search (no API key needed)

const QUERIES = [
  "Madhya Pradesh industrial India",
  "ISRO spacecraft satellite",
  "Reserve Bank of India building",
  "artificial intelligence technology",
  "G20 climate summit",
  "cricket India women team",
  "Bollywood film festival",
  "Vande Bharat train",
  "silicon photonics technology",
];

async function fetchWikimediaImage(query) {
  try {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&prop=imageinfo&iiprop=url&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=5&origin=*`;
    const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return null;
    const data = await res.json();
    const pages = data.query?.pages;
    if (!pages) return null;

    // Find first result with a valid image URL (jpg/png/webp, skip SVG/PDF)
    for (const page of Object.values(pages)) {
      const imgUrl = page.imageinfo?.[0]?.url;
      if (imgUrl && /\.(jpe?g|png|webp)/i.test(imgUrl)) {
        return imgUrl;
      }
    }
    return null;
  } catch {
    return null;
  }
}

(async () => {
  console.log("Testing Wikimedia Commons Image Search...\n");
  let passed = 0;
  for (const q of QUERIES) {
    const img = await fetchWikimediaImage(q);
    if (img) {
      console.log(`✅  ${q}`);
      console.log(`    → ${img.substring(0, 90)}\n`);
      passed++;
    } else {
      console.log(`⚠️  ${q} — no image found\n`);
    }
  }
  console.log(`\nResult: ${passed}/${QUERIES.length} queries returned images.`);
})();
