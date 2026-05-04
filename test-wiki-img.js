const query = "Sydney Sweeney";
const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=10&gsrnamespace=6&prop=imageinfo&iiprop=url&format=json&origin=*`;

fetch(url)
  .then(r => r.json())
  .then(data => {
    if (data.query && data.query.pages) {
      const pages = Object.values(data.query.pages);
      console.log(`✅ Found ${pages.length} images for ${query}`);
      pages.forEach((p, i) => {
        if (p.imageinfo && p.imageinfo[0]) {
           console.log(`Image ${i+1}: ${p.imageinfo[0].url}`);
        }
      });
    } else {
      console.log("❌ No images found.");
    }
  });
