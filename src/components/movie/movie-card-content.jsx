import { getYear } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Check, Info, Loader2, Plus } from "lucide-react";

const contentVariants = {
  initial: { y: 20, opacity: 0 },
  hover: { y: 0, opacity: 1 },
};

const MovieCardContent = ({
  isHovered,
  movie,
  handleWatchlistClick,
  isLoading,
  inWatchlist,
}) => {
  return (
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
            <Link
              href={`/movie/${movie.id}`}
              className="flex-1"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-white/10 hover:bg-white/20 border-white/20 text-white"
              >
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
  );
};

export default MovieCardContent;
