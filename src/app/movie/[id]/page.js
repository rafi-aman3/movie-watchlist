"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useGetMovieDetailsQuery, useDiscoverMoviesByGenreQuery } from "@/lib/api/moviesApi";
import { AddToWatchlistButton } from "@/components/add-to-watchlist-button";
import { MovieCard } from "@/components/movie-card";

export default function MovieDetailsPage() {
  const params = useParams();
  const [posterError, setPosterError] = useState(false);
  const [backdropError, setBackdropError] = useState(false);
  const { data: movie, isLoading, error } = useGetMovieDetailsQuery(params.id);

  // Get genre IDs for similar movies
  const genreIds = movie?.genres?.map((g) => g.id) || [];
  const { data: similarMoviesData } = useDiscoverMoviesByGenreQuery(
    {
      genreIds: genreIds.slice(0, 2), // Use first 2 genres
      page: 1,
      excludeId: params.id,
    },
    {
      skip: !movie || genreIds.length === 0,
    }
  );

  // Filter out current movie and limit to 12
  const similarMovies = (similarMoviesData?.results || [])
    .filter((m) => m.id.toString() !== params.id.toString())
    .slice(0, 12);

  const getPosterUrl = (posterPath) => {
    if (!posterPath) {
      return null;
    }
    // Ensure posterPath starts with /
    const path = posterPath.startsWith('/') ? posterPath : `/${posterPath}`;
    return `https://image.tmdb.org/t/p/w300_and_h450_bestv2${path}`;
  };

  const getBackdropUrl = (backdropPath) => {
    if (!backdropPath) {
      return null;
    }
    // Ensure backdropPath starts with /
    const path = backdropPath.startsWith('/') ? backdropPath : `/${backdropPath}`;
    return `https://image.tmdb.org/t/p/original${path}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatRating = (rating) => {
    if (!rating) return "N/A";
    return rating.toFixed(1);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md mb-6">
          Failed to load movie details. Please try again.
        </div>
        <Link href="/search">
          <Button variant="outline">
            <ArrowLeft className="size-4 mr-2" />
            Back to Search
          </Button>
        </Link>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <p className="text-muted-foreground mb-4">Movie not found.</p>
        <Link href="/search">
          <Button variant="outline">
            <ArrowLeft className="size-4 mr-2" />
            Back to Search
          </Button>
        </Link>
      </div>
    );
  }

  const backdropUrl = getBackdropUrl(movie.backdrop_path);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[60vh] sm:h-[70vh] min-h-[400px] sm:min-h-[500px] w-full overflow-hidden">
        {backdropUrl && !backdropError ? (
          <>
            <div className="absolute inset-0">
              <Image
                src={backdropUrl}
                alt={movie.title || "Movie backdrop"}
                fill
                className="object-cover"
                priority
                sizes="100vw"
                onError={() => {
                  console.error("Backdrop failed to load:", backdropUrl);
                  setBackdropError(true);
                }}
                onLoad={() => setBackdropError(false)}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-muted" />
        )}

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-end">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl pb-6 sm:pb-12">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Poster */}
              <motion.div
                className="md:col-span-1 max-w-[300px] mx-auto md:max-w-none"
                variants={itemVariants}
              >
                <div className="relative aspect-[2/3] bg-muted rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                  {getPosterUrl(movie.poster_path) && !posterError ? (
                    <img
                      src={getPosterUrl(movie.poster_path)}
                      alt={movie.title || "Movie poster"}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      onError={() => {
                        console.error("Poster failed to load:", getPosterUrl(movie.poster_path));
                        setPosterError(true);
                      }}
                      onLoad={() => setPosterError(false)}
                    />
                  ) : (
                    <div className="text-center p-4 text-muted-foreground h-full flex items-center justify-center">
                      <p className="text-sm">No Poster</p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Movie Info */}
              <motion.div
                className="md:col-span-2 text-white text-center md:text-left"
                variants={itemVariants}
              >
                <motion.h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4"
                  variants={itemVariants}
                >
                  {movie.title}
                </motion.h1>

                <motion.div
                  className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg"
                  variants={itemVariants}
                >
                  {movie.release_date && (
                    <span>{formatDate(movie.release_date)}</span>
                  )}
                  {movie.vote_average && (
                    <span>⭐ {formatRating(movie.vote_average)}</span>
                  )}
                  {movie.runtime && (
                    <span>{movie.runtime} min</span>
                  )}
                </motion.div>

                {movie.genres && movie.genres.length > 0 && (
                  <motion.div
                    className="flex flex-wrap justify-center md:justify-start gap-2 mb-4 sm:mb-6"
                    variants={itemVariants}
                  >
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs sm:text-sm border border-white/30 hover:bg-white/30 transition-colors"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </motion.div>
                )}

                {movie.overview && (
                  <motion.p
                    className="text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed max-w-3xl mx-auto md:mx-0"
                    variants={itemVariants}
                  >
                    {movie.overview}
                  </motion.p>
                )}

                <motion.div
                  className="flex justify-center md:justify-start gap-4"
                  variants={itemVariants}
                >
                  <AddToWatchlistButton movie={movie} size="lg" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      

      {/* Additional Details Section */}
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-6 sm:py-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground mb-1">
              Rating
            </h2>
            <p className="text-lg">
              {formatRating(movie.vote_average)} / 10
              {movie.vote_count && (
                <span className="text-muted-foreground text-sm ml-2">
                  ({movie.vote_count.toLocaleString()} votes)
                </span>
              )}
            </p>
          </div>

          {movie.release_date && (
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground mb-1">
                Release Date
              </h2>
              <p className="text-lg">{formatDate(movie.release_date)}</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Similar Movies Section */}
      {similarMovies.length > 0 && (
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-6 sm:py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Similar Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {similarMovies.map((similarMovie) => (
                <MovieCard key={similarMovie.id} movie={similarMovie} />
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
