// test-image-cascade.js — run with: node test-image-cascade.js
const BING_API_KEY = "643c267be4b9b46d212104cbdbc3b31c5433ad527af8ac96a687bc3cb253815c";

const QUERIES = [
  "Madhya Pradesh industrial growth India",
  "ISRO SpaDeX space docking",
  "Smriti Mandhana cricket India",
  "Taylor Swift concert",
  "Elon Musk Tesla",
];

async function fetchBingDirect(query) {
  const url = `https://api.bing.microsoft.com/v7.0/images/search?q=${encodeURIComponent(query)}&count=3&imageType=Photo&safeSearch=Moderate`;
  const res = await fetch(url, { headers: { "Ocp-Apim-Subscription-Key": BING_API_KEY } });
  if (!res.ok) return null;
  const data = await res.json();
  const images = data?.value || [];
  for (const img of images) {
    if (img?.contentUrl && /^https?:\/\//i.test(img.contentUrl)) return img.contentUrl;
  }
  return null;
}

async function fetchWikimediaDirect(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&prop=imageinfo&iiprop=url&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=8&origin=*`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const pages = data.query?.pages;
  if (!pages) return null;
  for (const page of Object.values(pages)) {
    const imgUrl = page.imageinfo?.[0]?.url;
    if (imgUrl && /\.(jpe?g|png|webp)/i.test(imgUrl)) return imgUrl;
  }
  return null;
}

async function fetchImage(query) {
  const bing = await fetchBingDirect(query);
  if (bing) return { url: bing, source: "Bing ✅" };
  const wiki = await fetchWikimediaDirect(query);
  if (wiki) return { url: wiki, source: "Wikimedia (fallback) ✅" };
  return { url: null, source: "None ❌" };
}

(async () => {
  console.log("Testing image cascade (Bing → Wikimedia)...\n");
  let passed = 0;
  for (const q of QUERIES) {
    const { url, source } = await fetchImage(q);
    if (url) {
      console.log(`[${source}] ${q}`);
      console.log(`  → ${url.substring(0, 90)}...\n`);
      passed++;
    } else {
      console.log(`[${source}] ${q}\n`);
    }
  }
  console.log(`Result: ${passed}/${QUERIES.length} queries returned images.`);
})();
