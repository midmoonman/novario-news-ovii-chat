const tmdbKey = "3f8af7f1ca1d529dea0f89190639240d";

async function testTmdbMulti(query) {
  const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${tmdbKey}&query=${encodeURIComponent(query)}`;
  
  try {
    const res = await fetch(searchUrl);
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      const topResult = data.results[0];
      console.log(`[${query}] Found: ${topResult.name || topResult.title} (Type: ${topResult.media_type})`);
      
      let images = [];
      
      if (topResult.media_type === 'person') {
        const imgRes = await fetch(`https://api.themoviedb.org/3/person/${topResult.id}/images?api_key=${tmdbKey}`);
        const imgData = await imgRes.json();
        if (imgData.profiles) images.push(...imgData.profiles.map(p => p.file_path));
        if (topResult.known_for) {
           topResult.known_for.forEach(m => {
              if (m.backdrop_path) images.push(m.backdrop_path);
              if (m.poster_path) images.push(m.poster_path);
           });
        }
      } else if (topResult.media_type === 'tv' || topResult.media_type === 'movie') {
        const type = topResult.media_type;
        const imgRes = await fetch(`https://api.themoviedb.org/3/${type}/${topResult.id}/images?api_key=${tmdbKey}`);
        const imgData = await imgRes.json();
        if (imgData.backdrops) images.push(...imgData.backdrops.map(b => b.file_path));
        if (imgData.posters) images.push(...imgData.posters.map(p => p.file_path));
      }
      
      console.log(`Found ${images.length} total images!`);
      images.slice(0, 3).forEach(img => console.log(` - https://image.tmdb.org/t/p/w780${img}`));
      
    } else {
      console.log(`[${query}] No result.`);
    }
  } catch (e) {
    console.error(e);
  }
}

testTmdbMulti("from series");
testTmdbMulti("sydney sweeney");
