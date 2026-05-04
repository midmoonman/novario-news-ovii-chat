

async function testGNewsScrape() {
  const query = "Sydney Sweeney";
  const url = `https://news.google.com/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
  
  try {
    const res = await fetch(`https://corsproxy.io/?url=${encodeURIComponent(url)}`);
    const html = await res.text();
    
    // Check if we got something
    console.log("HTML length:", html.length);
    
    // We can't easily parse with cheerio in this browser script without installing it, 
    // so let's use regex to find article blocks or images.
    const articleRegex = /<article[^>]*>([\s\S]*?)<\/article>/g;
    let match;
    let count = 0;
    while ((match = articleRegex.exec(html)) !== null && count < 5) {
      count++;
      const articleHtml = match[1];
      
      // Extract title
      const titleMatch = articleHtml.match(/<a[^>]*class="JtKRv"[^>]*>([^<]+)<\/a>/);
      const title = titleMatch ? titleMatch[1] : "No title";
      
      // Extract image
      const imgMatch = articleHtml.match(/<img[^>]*src="([^"]+)"/);
      const img = imgMatch ? imgMatch[1] : "No image";
      
      console.log(`\nArticle ${count}: ${title}`);
      console.log(`Image: ${img}`);
    }
    
    if (count === 0) {
      console.log("No <article> tags found. Let's look for images directly.");
      const imgMatches = [...html.matchAll(/<img[^>]*src="([^"]+)"/g)].slice(0, 10);
      imgMatches.forEach((m, i) => console.log(`Img ${i+1}: ${m[1]}`));
    }
    
  } catch (e) {
    console.error(e);
  }
}

testGNewsScrape();
