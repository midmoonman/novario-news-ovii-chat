const TMDB_API_KEY = "3f8af7f1ca1d529dea0f89190639240d";

async function testFetch() {
    const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=from+series`;
    const res = await fetch(searchUrl);
    const data = await res.json();
    const topResult = data.results[0];
    
    console.log("Found:", topResult.name || topResult.title);
    console.log("Media type:", topResult.media_type);
    console.log("Poster path:", topResult.poster_path);
}
testFetch();
