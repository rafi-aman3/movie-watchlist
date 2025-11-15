"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { MovieCard } from "@/components/movie-card";
import { motion } from "framer-motion";

export function MovieSection({
  title,
  movies,
  isLoading,
  onLoadMore,
  hasMore,
}) {
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

  return (
    <section className={`py-8 sm:py-12 ${getGradientClass()}`}>
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <motion.h2
          className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
          {movies.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: "easeOut",
              }}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              onClick={onLoadMore}
              disabled={isLoading}
              variant="outline"
              size="lg"
            >
              {isLoading ? (
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
