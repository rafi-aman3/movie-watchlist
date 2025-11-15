"use client";

import { useGetWatchlistQuery } from "@/lib/api/watchlistApi";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { MovieCard } from "@/components/movie-card";
import { motion } from "framer-motion";

export default function WatchlistPage() {
  const { user } = useAuth();
  const { data: watchlist, isLoading, error } = useGetWatchlistQuery(undefined, {
    skip: !user,
  });


  if (!user) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">My Watchlist</h1>
          <p className="text-muted-foreground mb-6">
            Please log in to view your watchlist.
          </p>
          <Link href="/login">
            <Button className="hover:scale-105 transition-transform">Login</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

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
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md">
          Failed to load watchlist. Please try again.
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-7xl">
      <motion.h1
        className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Watchlist
      </motion.h1>

      {!watchlist || watchlist.length === 0 ? (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-muted-foreground text-base sm:text-lg mb-4">
            Your watchlist is empty.
          </p>
          <Link href="/search">
            <Button className="hover:scale-105 transition-transform">Browse Movies</Button>
          </Link>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {watchlist.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <MovieCard
                movie={{
                  id: item.movie_id,
                  title: item.movie_title,
                  release_date: item.release_year
                    ? `${item.release_year}-01-01`
                    : null,
                  poster_path: item.poster_path,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
