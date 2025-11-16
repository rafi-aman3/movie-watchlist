import { notFound } from "next/navigation";
import { tmdb } from "@/lib/tmdb";
import { MovieDetailsContent } from "@/components/movie/movie-details";
import { getMovieDetails, getSimilarMovies } from "@/actions/movie";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const movie = await tmdb(`/movie/${id}`);
    return {
      title: `${movie.title} - Movie Details`,
      description: movie.overview || `Details about ${movie.title}`,
      openGraph: {
        title: movie.title,
        description: movie.overview,
        images: movie.poster_path
          ? [`https://image.tmdb.org/t/p/w500${movie.poster_path}`]
          : [],
      },
    };
  } catch (error) {
    return {
      title: "Movie Details",
      description: "Movie details page",
    };
  }
}

export default async function MovieDetailsPage({ params }) {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  if (!movie) {
    notFound();
  }

  const genreIds = movie.genres?.map((g) => g.id) || [];
  const similarMovies = await getSimilarMovies(genreIds, id);

  return <MovieDetailsContent movie={movie} similarMovies={similarMovies} />;
}