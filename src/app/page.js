"use client";

import { HeroCarousel } from "@/components/hero-carousel";
import { MovieSection } from "@/components/movie-section";
import { motion } from "framer-motion";
import {
  useGetPopularMoviesQuery,
  useGetTrendingMoviesQuery,
} from "@/lib/api/moviesApi";
import { useMemo } from "react";
import { HomepageVariants } from "@/lib/animation/homepage";
import { ErrorComponent } from "@/components/movie-error";
import { useMoviePagination } from "@/hooks/homepage/useMoviePagination";
import { useMinimumLoadingTime } from "@/hooks/homepage/useMinimumLoadingTime";
import LoadingSpinner from "@/components/loading-spinner";

const HERO_MOVIES_COUNT = 10;

export default function Home() {
  const isMinTimePassed = useMinimumLoadingTime();

  const popular = useMoviePagination(useGetPopularMoviesQuery);
  const trending = useMoviePagination(useGetTrendingMoviesQuery);

  const isInitialLoad = !isMinTimePassed;
  const hasError = (popular.error || trending.error) && isInitialLoad;
  const isLoading = (popular.isLoading || trending.isLoading) && isInitialLoad;

  const heroMovies = useMemo(
    () => popular.movies.slice(0, HERO_MOVIES_COUNT),
    [popular.movies]
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (hasError) {
    return (
      <ErrorComponent
        title="Failed to Load Movies"
        message="We couldn't fetch the movie data. Please check your connection and try again."
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <motion.div
      className="bg-background"
      variants={HomepageVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <HeroCarousel movies={heroMovies} />
      </motion.div>
      <MovieSection
        title="Trending Now"
        movies={trending.movies}
        isLoading={trending.isLoading && !isInitialLoad}
        onLoadMore={trending.loadMore}
        hasMore={trending.hasMore}
      />
      <MovieSection
        title="Popular Movies"
        movies={popular.movies}
        isLoading={popular.isLoading && !isInitialLoad}
        onLoadMore={popular.loadMore}
        hasMore={popular.hasMore}
      />
    </motion.div>
  );
}
