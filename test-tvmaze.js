async function testTvMaze() {
  const query = "Sydney Sweeney";
  const url = `https://api.tvmaze.com/search/people?q=${encodeURIComponent(query)}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(`Found ${data.length} results`);
    if (data.length > 0) {
       console.log("Image:", data[0].person.image);
    }
  } catch (e) {
    console.error(e);
  }
}
testTvMaze();
