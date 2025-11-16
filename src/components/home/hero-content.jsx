import { getYear } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { AddToWatchlistButton } from "../add-to-watchlist-button";

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

const HeroContent = ({ currentIndex,currentMovie }) => {
  return (
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
              <Link
                href={`/movie/${currentMovie.id}`}
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto hover:scale-105 transition-transform"
                >
                  View Details
                </Button>
              </Link>
              <div className="w-full sm:w-auto">
                <AddToWatchlistButton
                  movie={currentMovie}
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                />
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroContent;
