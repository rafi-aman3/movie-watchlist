"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HeroBackdrop from "./home/hero-backdrop";
import HeroContent from "./home/hero-content";

export function HeroCarousel({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);

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

  return (
    <div className="relative h-[600px] md:h-[700px] w-full overflow-hidden">
      <HeroBackdrop
        currentIndex={currentIndex}
        currentMovie={currentMovie}
        direction={direction}
      />

      <HeroContent currentIndex={currentIndex} currentMovie={currentMovie} />

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
