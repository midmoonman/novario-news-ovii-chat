const cx = "b04126928d9bb4e1a";
const query = "Sydney Sweeney";

// Test unauthenticated direct call (likely requires API key)
const url = `https://customsearch.googleapis.com/customsearch/v1?cx=${cx}&q=${encodeURIComponent(query)}&searchType=image`;

fetch(url)
  .then(r => r.json())
  .then(data => {
    console.log("REST API Response:");
    if (data.error) {
       console.log("Error:", data.error.message);
    } else {
       console.log("Success! Found", data.items?.length, "images");
    }
  })
  .catch(console.error);
