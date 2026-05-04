import { getNews } from './src/server/newsapi.functions.js';

// Simple mock for fetch since newsapi uses DOM fetch
const originalFetch = global.fetch;

async function runTest() {
  console.log("Testing getNews('Sydney Sweeney')...");
  try {
    const { articles } = await getNews("Sydney Sweeney");
    
    console.log(`✅ Got ${articles.length} articles`);
    
    // Bio should be first
    const bio = articles[0];
    console.log(`\n[BIO CARD]`);
    console.log(`Title: ${bio.title}`);
    console.log(`Image: ${bio.image}`);
    console.log(`Source: ${bio.source}`);
    
    // Check next 3 news articles to ensure images are varied
    console.log(`\n[NEWS CARDS]`);
    articles.slice(1, 4).forEach((a, i) => {
      console.log(`${i+1}. ${a.title}`);
      console.log(`   Img: ${a.image}`);
      console.log(`   Source: ${a.source}`);
    });

  } catch (e) {
    console.error("Test failed:", e);
  }
}

// Since the file is TypeScript and uses ES modules, we need to compile it or use ts-node
// Let's just write a test we can run with ts-node or node --experimental-specifier-resolution=node
runTest();
