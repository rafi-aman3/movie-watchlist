"use client";

import { HeroCarousel } from "@/components/hero-carousel";
import { MovieSection } from "@/components/movie-section";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import {
  useGetPopularMoviesQuery,
  useGetTrendingMoviesQuery,
} from "@/lib/api/moviesApi";
import MovieLoader from "@/components/movie-loader";
import { useEffect, useState } from "react";

export default function Home() {
  const {
    data: popularData,
    isLoading: popularLoading,
    error: popularError,
  } = useGetPopularMoviesQuery(1);

  const {
    data: trendingData,
    isLoading: trendingLoading,
    error: trendingError,
  } = useGetTrendingMoviesQuery(1);

  const apiLoading = popularLoading || trendingLoading;
  const error = popularError || trendingError;

  const [minLoadingTime, setMinLoadingTime] = useState(true);

  const heroMovies = (popularData?.results || []).slice(0, 10);
  const popularMovies = popularData?.results || [];
  const popularTotalPages = Math.min(popularData?.total_pages || 1, 10);
  const trendingMovies = trendingData?.results || [];
  const trendingTotalPages = Math.min(trendingData?.total_pages || 1, 10);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinLoadingTime(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const loading = apiLoading || minLoadingTime;

  if (loading) {
    return <MovieLoader />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md">
          Failed to load movies. Please try again later.
        </div>
      </div>
    );
  }

  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="bg-background"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* Hero Carousel Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <HeroCarousel movies={heroMovies} />
      </motion.div>

      {/* Trending Movies Section */}
      <MovieSection
        title="Trending Now"
        apiEndpoint="/api/trending"
        initialMovies={trendingMovies}
        initialPage={1}
        totalPages={trendingTotalPages}
      />

      {/* Popular Movies Section */}
      <MovieSection
        title="Popular Movies"
        apiEndpoint="/api/popular"
        initialMovies={popularMovies}
        initialPage={1}
        totalPages={popularTotalPages}
      />
    </motion.div>
  );
}
