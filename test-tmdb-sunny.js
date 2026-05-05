const TMDB_API_KEY = "3f8af7f1ca1d529dea0f89190639240d";

async function fetchWithTimeout(url, ms = 1500) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

async function fetchTMDBImages(query) {
  try {
    const cleanQuery = query.toLowerCase().replace(" series", "").replace(" movie", "");
    const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(cleanQuery)}`;
    console.log("Searching TMDB:", searchUrl);
    const res = await fetchWithTimeout(searchUrl, 5000);
    const data = await res.json();
    
    console.log(`TMDB returned ${data.results?.length} results`);
    if (data.results && data.results.length > 0) {
      const topResult = data.results[0];
      console.log("Top result type:", topResult.media_type, topResult.name || topResult.title);
      
      const newsImages = [];
      let profile = undefined;
      
      if (topResult.media_type === 'person') {
        const imgRes = await fetchWithTimeout(`https://api.themoviedb.org/3/person/${topResult.id}/images?api_key=${TMDB_API_KEY}`, 5000);
        const imgData = await imgRes.json();
        
        if (imgData.profiles && imgData.profiles.length > 0) {
           profile = `https://image.tmdb.org/t/p/w780${imgData.profiles[0].file_path}`;
        }

        if (topResult.known_for) {
          for (const media of topResult.known_for) {
             const mediaType = media.media_type || 'movie';
             if (media.backdrop_path) newsImages.push(`https://image.tmdb.org/t/p/w780${media.backdrop_path}`);
             
             try {
               const mediaImgs = await fetchWithTimeout(`https://api.themoviedb.org/3/${mediaType}/${media.id}/images?api_key=${TMDB_API_KEY}`, 5000);
               const mediaImgData = await mediaImgs.json();
               if (mediaImgData.backdrops) {
                  mediaImgData.backdrops.slice(0, 5).forEach((b) => {
                     newsImages.push(`https://image.tmdb.org/t/p/w780${b.file_path}`);
                  });
               }
             } catch(e) {}
          }
        }
        
        if (newsImages.length === 0 && imgData.profiles) {
           imgData.profiles.forEach((p) => newsImages.push(`https://image.tmdb.org/t/p/w780${p.file_path}`));
        }
      }
      return { profile, newsImages: Array.from(new Set(newsImages)) };
    }
    return { newsImages: [] };
  } catch (err) {
    console.error(err);
    return { newsImages: [] };
  }
}

fetchTMDBImages("Sunny Deol").then(res => {
  console.log("Result:", JSON.stringify(res, null, 2));
});
