export const tmdb = async (path) => {
    return fetch(`https://api.themoviedb.org/3${path}`, {
      headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN}` },
      next: { revalidate: 60 }
    }).then(r => r.json());
  };
  