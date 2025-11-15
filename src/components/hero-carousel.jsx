"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AddToWatchlistButton } from "@/components/add-to-watchlist-button";
import { motion, AnimatePresence } from "framer-motion";

export function HeroCarousel({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000); // Auto-play every 5 seconds

    return () => clearInterval(interval);
  }, [movies.length]);

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  if (movies.length === 0) {
    return null;
  }

  const currentMovie = movies[currentIndex];
  const getBackdropUrl = (backdropPath) => {
    if (!backdropPath) return null;
    const path = backdropPath.startsWith('/') ? backdropPath : `/${backdropPath}`;
    return `https://image.tmdb.org/t/p/original${path}`;
  };
  const backdropUrl = getBackdropUrl(currentMovie.backdrop_path);

  const getYear = (releaseDate) => {
    if (!releaseDate) return "";
    return new Date(releaseDate).getFullYear();
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative h-[600px] md:h-[700px] w-full overflow-hidden">
      {/* Background Image with Animation */}
      <AnimatePresence mode="wait" custom={direction}>
        {backdropUrl ? (
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <Image
              src={backdropUrl}
              alt={currentMovie.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </motion.div>
        ) : (
          <div className="absolute inset-0 bg-muted" />
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="max-w-2xl"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-foreground"
                variants={itemVariants}
              >
                {currentMovie.title}
              </motion.h1>
              <motion.div
                className="flex flex-wrap items-center gap-3 sm:gap-4 mb-3 sm:mb-4 text-sm sm:text-base text-muted-foreground"
                variants={itemVariants}
              >
                {getYear(currentMovie.release_date) && (
                  <span>{getYear(currentMovie.release_date)}</span>
                )}
                {currentMovie.vote_average && (
                  <span>⭐ {currentMovie.vote_average.toFixed(1)}</span>
                )}
              </motion.div>
              {currentMovie.overview && (
                <motion.p
                  className="text-base sm:text-lg mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3 text-muted-foreground"
                  variants={itemVariants}
                >
                  {currentMovie.overview}
                </motion.p>
              )}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                variants={itemVariants}
              >
                <Link href={`/movie/${currentMovie.id}`} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto hover:scale-105 transition-transform">View Details</Button>
                </Link>
                <div className="w-full sm:w-auto">
                  <AddToWatchlistButton movie={currentMovie} size="lg" variant="outline" className="w-full sm:w-auto" />
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-background/50 hover:bg-background/80 rounded-full p-2 transition-all duration-200 hover:scale-110 active:scale-95"
        aria-label="Previous slide"
      >
        <ChevronLeft className="size-5 sm:size-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-background/50 hover:bg-background/80 rounded-full p-2 transition-all duration-200 hover:scale-110 active:scale-95"
        aria-label="Next slide"
      >
        <ChevronRight className="size-5 sm:size-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? "w-8 bg-primary"
                : "w-2 bg-primary/50 hover:bg-primary/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

