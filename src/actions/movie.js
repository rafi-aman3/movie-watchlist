import { tmdb } from "@/lib/tmdb";

export async function getMovieDetails(id) {
    try {
        const movie = await tmdb(`/movie/${id}`);
        return movie;
    } catch (error) {
        console.error("Failed to fetch movie:", error);
        return null;
    }
}

export async function getSimilarMovies(genreIds, excludeId) {
    if (!genreIds || genreIds.length === 0) {
        return [];
    }

    try {
        const url = `/discover/movie?with_genres=${genreIds.slice(0, 3).join(",")}&page=1&sort_by=popularity.desc`;
        const data = await tmdb(url);

        const filtered = (data.results || [])
            .filter((m) => m.id.toString() !== excludeId.toString())
            .slice(0, 18);

        return filtered;
    } catch (error) {
        console.error("Failed to fetch similar movies:", error);
        return [];
    }
}