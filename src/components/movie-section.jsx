"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { MovieCard } from "@/components/movie-card";
import { motion, useInView } from "framer-motion";

export function MovieSection({ title, apiEndpoint, initialMovies = [], initialPage = 1, totalPages = 1 }) {
  const [movies, setMovies] = useState(initialMovies);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPagesState, setTotalPagesState] = useState(totalPages);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const loadMore = async () => {
    if (loading || currentPage >= totalPagesState) return;

    setLoading(true);
    try {
      const response = await fetch(`${apiEndpoint}?page=${currentPage + 1}`);
      if (!response.ok) throw new Error("Failed to load more movies");

      const data = await response.json();
      setMovies((prev) => [...prev, ...(data.results || [])]);
      setCurrentPage((prev) => prev + 1);
      setTotalPagesState(data.total_pages || totalPagesState);
    } catch (error) {
      console.error("Error loading more movies:", error);
    } finally {
      setLoading(false);
    }
  };


  if (movies.length === 0) {
    return null;
  }

  const getGradientClass = () => {
    if (title.toLowerCase().includes("trending")) {
      return "bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-red-500/10 dark:from-purple-500/20 dark:via-pink-500/20 dark:to-red-500/20";
    } else if (title.toLowerCase().includes("popular")) {
      return "bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-teal-500/10 dark:from-blue-500/20 dark:via-cyan-500/20 dark:to-teal-500/20";
    }
    return "bg-gradient-to-br from-gray-500/10 via-slate-500/10 to-zinc-500/10 dark:from-gray-500/20 dark:via-slate-500/20 dark:to-zinc-500/20";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section ref={ref} className={`py-8 sm:py-12 ${getGradientClass()}`}>
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <motion.h2
          className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {title}
        </motion.h2>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {movies.map((movie, index) => (
            <motion.div
              key={movie.id}
              variants={itemVariants}
              custom={index}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </motion.div>
        {currentPage < totalPagesState && (
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Button
              onClick={loadMore}
              disabled={loading}
              variant="outline"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" />
                  Loading...
                </>
              ) : (
                "Load More"
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

