"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/components/auth-provider";
import {
  useAddToWatchlistMutation,
  useRemoveFromWatchlistMutation,
  useLazyCheckWatchlistStatusQuery,
} from "@/lib/api/watchlistApi";
import { useRouter } from "next/navigation";
import MovieCardPoster from "./movie/movie-card-poster";
import MovieCardOverlay from "./movie/movie-card-overlay";
import MovieCardContent from "./movie/movie-card-content";
import { toast } from "sonner";

export function MovieCard({ movie, size = "default" }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasCheckedStatus, setHasCheckedStatus] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const [
    checkWatchlistStatus,
    { data: statusData, isLoading: checkingStatus },
  ] = useLazyCheckWatchlistStatusQuery();

  const [addToWatchlist, { isLoading: adding }] = useAddToWatchlistMutation();
  const [removeFromWatchlist, { isLoading: removing }] =
    useRemoveFromWatchlistMutation();

  const inWatchlist = statusData?.inWatchlist || false;
  const isLoading = adding || removing || checkingStatus;

  const handleHoverStart = () => {
    setIsHovered(true);

    // Only check watchlist status on first hover if user is logged in
    if (user && !hasCheckedStatus) {
      checkWatchlistStatus(movie.id);
      setHasCheckedStatus(true);
    }
  };

  const handleWatchlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      router.push("/login");
      return;
    }

    try {
      if (inWatchlist) {
        await removeFromWatchlist(movie.id).unwrap();
        toast.success("Movie has been removed from Watchlist");
      } else {
        await addToWatchlist({
          movie_id: movie.id,
          movie_title: movie.title,
          release_year: movie.release_date
            ? new Date(movie.release_date).getFullYear()
            : null,
          poster_path: movie.poster_path,
        }).unwrap();

        toast.success("Movie has been added to Watchlist");
      }
    } catch (error) {
      console.error("Watchlist operation failed:", error);
    }
  };

  const cardVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
  };

  return (
    <motion.div
      className="relative aspect-2/3 bg-muted rounded-lg overflow-hidden cursor-pointer group"
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      onHoverStart={handleHoverStart}
      onHoverEnd={() => setIsHovered(false)}
    >
      <MovieCardPoster movie={movie} />
      <MovieCardOverlay isHovered={isHovered} />
      <MovieCardContent
        isHovered={isHovered}
        movie={movie}
        handleWatchlistClick={handleWatchlistClick}
        isLoading={isLoading}
        inWatchlist={inWatchlist}
      />
    </motion.div>
  );
}
