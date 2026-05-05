const TMDB_API_KEY = "3f8af7f1ca1d529dea0f89190639240d";

async function testFetch() {
    const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=sydney+sweeney`;
    const res = await fetch(searchUrl);
    const data = await res.json();
    const topResult = data.results[0];
    
    console.log("Found person:", topResult.name);
    if (topResult.known_for) {
        for (const media of topResult.known_for) {
            console.log("Known for:", media.name || media.title);
            const mediaType = media.media_type || 'movie';
            const mediaImgs = await fetch(`https://api.themoviedb.org/3/${mediaType}/${media.id}/images?api_key=${TMDB_API_KEY}`);
            const mediaImgData = await mediaImgs.json();
            console.log("Backdrops found:", mediaImgData.backdrops?.length || 0);
            if (mediaImgData.backdrops) {
                console.log("Sample:", mediaImgData.backdrops[0].file_path);
            }
        }
    }
}
testFetch();
