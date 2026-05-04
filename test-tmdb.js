const tmdbKey = "3f8af7f1ca1d529dea0f89190639240d";
const query = "Sydney Sweeney";

async function testTmdb() {
  // 1. Search for person
  const searchUrl = `https://api.themoviedb.org/3/search/person?api_key=${tmdbKey}&query=${encodeURIComponent(query)}`;
  
  try {
    const res = await fetch(searchUrl);
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      const person = data.results[0];
      console.log(`Found: ${person.name} (ID: ${person.id})`);
      
      // 2. Fetch all their images (profiles)
      const imagesUrl = `https://api.themoviedb.org/3/person/${person.id}/images?api_key=${tmdbKey}`;
      const imgRes = await fetch(imagesUrl);
      const imgData = await imgRes.json();
      
      console.log(`\nFound ${imgData.profiles?.length || 0} profile photos`);
      if (imgData.profiles) {
         imgData.profiles.slice(0, 3).forEach((p, i) => {
           console.log(`Photo ${i+1}: https://image.tmdb.org/t/p/w500${p.file_path}`);
         });
      }
      
      // 3. Look at movies they are known for, to get movie posters!
      console.log(`\nFound ${person.known_for?.length || 0} known-for movies/shows`);
      if (person.known_for) {
        person.known_for.forEach((m, i) => {
          console.log(`Poster ${i+1}: ${m.title || m.name} -> https://image.tmdb.org/t/p/w500${m.poster_path}`);
          if (m.backdrop_path) {
             console.log(`Backdrop ${i+1}: https://image.tmdb.org/t/p/w780${m.backdrop_path}`);
          }
        });
      }
      
    } else {
      console.log("No person found.");
    }
  } catch (e) {
    console.error("TMDB error:", e);
  }
}

testTmdb();
