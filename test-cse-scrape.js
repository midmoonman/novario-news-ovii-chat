async function testCseScrape() {
  const cx = "b04126928d9bb4e1a";
  const query = "Molly Little"; // Unknown person
  
  try {
    // 1. Fetch the cse.js file to extract the token
    console.log("Fetching CSE JS...");
    const jsUrl = `https://cse.google.com/cse.js?cx=${cx}`;
    const jsRes = await fetch(jsUrl);
    const jsText = await jsRes.text();
    
    // The token is usually in a structure like: "cse_token": "..."
    const tokenMatch = jsText.match(/"cse_token":\s*"([^"]+)"/);
    if (!tokenMatch) {
       console.log("Failed to find cse_token in JS file.");
       return;
    }
    const cse_tok = tokenMatch[1];
    console.log("Extracted Token:", cse_tok);
    
    // 2. Build the unauthenticated Google CSE V1 endpoint request
    // rsz=filtered_cse -> results
    // num=10 -> number of results
    // hl=en -> language
    // source=gcsc -> source
    // cx=... -> engine id
    // q=... -> query
    // safe=off -> safe search
    // searchType=image or tbm=isch
    const searchUrl = `https://cse.google.com/cse/element/v1?rsz=filtered_cse&num=10&hl=en&source=gcsc&gss=.com&cx=${cx}&q=${encodeURIComponent(query)}&safe=off&cse_tok=${cse_tok}&exp=csqr,cc&callback=google.search.cse.api16393&tbm=isch`;
    
    console.log("Fetching Search Results...");
    const searchRes = await fetch(searchUrl);
    const searchText = await searchRes.text();
    
    // The response is JSONP wrapped in the callback, e.g. /*O_o*/\ngoogle.search.cse.api16393({ ... })
    // We can extract the JSON part
    const jsonMatch = searchText.match(/google\.search\.cse\.api\d+\((.*)\);?/s);
    if (jsonMatch) {
       const jsonStr = jsonMatch[1];
       const data = JSON.parse(jsonStr);
       console.log("Success! Found results.");
       if (data.results && data.results.length > 0) {
          console.log(`First image URL: ${data.results[0].image.url}`);
          console.log(`Second image URL: ${data.results[1].image.url}`);
       } else {
          console.log("No results array found.");
       }
    } else {
       console.log("Failed to parse JSONP response.", searchText.substring(0, 200));
    }
    
  } catch (e) {
    console.error("Error:", e);
  }
}

testCseScrape();
