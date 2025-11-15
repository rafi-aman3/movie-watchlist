"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";
import {
  useAddToWatchlistMutation,
  useRemoveFromWatchlistMutation,
  useCheckWatchlistStatusQuery,
} from "@/lib/api/watchlistApi";
import { Plus, Info, Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function MovieCard({ movie, size = "default" }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const { data: statusData, isLoading: checkingStatus } =
    useCheckWatchlistStatusQuery(movie.id, {
      skip: !user || !movie.id,
    });

  const [addToWatchlist, { isLoading: adding }] = useAddToWatchlistMutation();
  const [removeFromWatchlist, { isLoading: removing }] =
    useRemoveFromWatchlistMutation();

  const inWatchlist = statusData?.inWatchlist || false;
  const isLoading = adding || removing || checkingStatus;

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
      } else {
        await addToWatchlist({
          movie_id: movie.id,
          movie_title: movie.title,
          release_year: movie.release_date
            ? new Date(movie.release_date).getFullYear()
            : null,
          poster_path: movie.poster_path,
        }).unwrap();
      }
    } catch (error) {
      console.error("Watchlist operation failed:", error);
    }
  };

  const getPosterUrl = (posterPath) => {
    if (!posterPath) {
      return null;
    }
    // Ensure posterPath starts with /
    const path = posterPath.startsWith('/') ? posterPath : `/${posterPath}`;
    return `https://image.tmdb.org/t/p/w500${path}`;
  };

  const getYear = (releaseDate) => {
    if (!releaseDate) return "N/A";
    return new Date(releaseDate).getFullYear();
  };

  const cardVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
  };

  const overlayVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 1 },
  };

  const contentVariants = {
    initial: { y: 20, opacity: 0 },
    hover: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="relative aspect-[2/3] bg-muted rounded-lg overflow-hidden cursor-pointer group"
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Poster Image */}
      {getPosterUrl(movie.poster_path) && !imageError ? (
        <Image
          src={getPosterUrl(movie.poster_path)}
          alt={movie.title || "Movie poster"}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 20vw, 16vw"
          onError={() => {
            console.error("Image failed to load:", getPosterUrl(movie.poster_path));
            setImageError(true);
          }}
          onLoad={() => {
            setImageError(false);
          }}
        />
      ) : (
        <div className="text-center p-4 text-muted-foreground h-full flex items-center justify-center">
          <p className="text-xs">No Poster</p>
        </div>
      )}

      {/* Overlay with gradient */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
            variants={overlayVariants}
            initial="initial"
            animate="hover"
            exit="initial"
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Content on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-4 z-10"
            variants={contentVariants}
            initial="initial"
            animate="hover"
            exit="initial"
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            <motion.h3
              className="font-semibold text-lg mb-1 text-white line-clamp-2"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              {movie.title}
            </motion.h3>
            <motion.p
              className="text-sm text-white/80 mb-4"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {getYear(movie.release_date)}
            </motion.p>
            <motion.div
              className="flex gap-2"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <Link href={`/movie/${movie.id}`} className="flex-1" onClick={(e) => e.stopPropagation()}>
                <Button variant="outline" size="sm" className="w-full bg-white/10 hover:bg-white/20 border-white/20 text-white">
                  <Info className="size-4 mr-2" />
                  Details
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-white/10 hover:bg-white/20 border-white/20 text-white"
                onClick={handleWatchlistClick}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : inWatchlist ? (
                  <Check className="size-4" />
                ) : (
                  <Plus className="size-4" />
                )}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
