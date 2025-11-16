"use client";
import { motion } from "framer-motion";
import {
  MovieDetailsContainerVariants,
  MovieDetailsItemVariants,
} from "@/lib/animation/moviedetails";
import { formatDate, formatRating, getPosterUrl } from "@/lib/utils";
import { useState } from "react";
import { AddToWatchlistButton } from "../add-to-watchlist-button";

const HeroSection = ({ movie }) => {
  const [posterError, setPosterError] = useState(false);

  return (
    <>
      <div className=" pt-10 md:pt-30 flex items-end pb-8 ">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8"
            variants={MovieDetailsContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="md:col-span-1 max-w-[300px] mx-auto md:max-w-none"
              variants={MovieDetailsItemVariants}
            >
              <div className="relative aspect-2/3 bg-muted rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                {getPosterUrl(movie?.poster_path) && !posterError ? (
                  <img
                    src={getPosterUrl(movie?.poster_path)}
                    alt={movie?.title || "Movie poster"}
                    className="object-cover w-full h-[300px] md:h-full"
                    onError={() => {
                      console.error(
                        "Poster failed to load:",
                        getPosterUrl(movie?.poster_path)
                      );
                      setPosterError(true);
                    }}
                    onLoad={() => setPosterError(false)}
                  />
                ) : (
                  <div className="text-center p-4 text-muted-foreground h-full flex items-center justify-center">
                    <p className="text-sm">No Poster</p>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              className="md:col-span-2 text-white text-center md:text-left"
              variants={MovieDetailsItemVariants}
            >
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 drop-shadow-lg text-primary"
                variants={MovieDetailsItemVariants}
              >
                {movie?.title}
              </motion.h1>

              <motion.div
                className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg"
                variants={MovieDetailsItemVariants}
              >
                {movie?.release_date && (
                  <span className="drop-shadow-md">
                    {formatDate(movie?.release_date)}
                  </span>
                )}
                {movie?.vote_average && (
                  <span className="drop-shadow-md">
                    ⭐ {formatRating(movie?.vote_average)}
                  </span>
                )}
                {movie?.runtime && (
                  <span className="drop-shadow-md">{movie?.runtime} min</span>
                )}
              </motion.div>

              {movie?.genres && movie?.genres.length > 0 && (
                <motion.div
                  className="flex flex-wrap justify-center md:justify-start gap-2 mb-4 sm:mb-6"
                  variants={MovieDetailsItemVariants}
                >
                  {movie?.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs sm:text-sm border border-white/30 hover:bg-white/30 transition-colors"
                    >
                      {genre.name}
                    </span>
                  ))}
                </motion.div>
              )}

              {movie?.tagline && (
                <motion.p
                  className="text-sm mb-3 sm:mb-2 italic leading-relaxed max-w-3xl mx-auto md:mx-0 drop-shadow-md"
                  variants={MovieDetailsItemVariants}
                >
                  {movie?.tagline}
                </motion.p>
              )}

              {movie?.overview && (
                <motion.p
                  className="text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed max-w-3xl mx-auto md:mx-0 drop-shadow-md"
                  variants={MovieDetailsItemVariants}
                >
                  {movie?.overview}
                </motion.p>
              )}

              <motion.div
                className="flex justify-center md:justify-start gap-4"
                variants={MovieDetailsItemVariants}
              >
                <AddToWatchlistButton movie={movie} size="lg" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-6 sm:py-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground mb-1">
                Rating
              </h2>
              <p className="text-lg">
                {formatRating(movie.vote_average)} / 10
                {movie.vote_count && (
                  <span className="text-muted-foreground text-sm ml-2">
                    ({movie.vote_count.toLocaleString()} votes)
                  </span>
                )}
              </p>
            </div>

            {movie.release_date && (
              <div>
                <h2 className="text-sm font-semibold text-muted-foreground mb-1">
                  Release Date
                </h2>
                <p className="text-lg">{formatDate(movie.release_date)}</p>
              </div>
            )}

            {movie.production_companies &&
              movie.production_companies.length > 0 && (
                <motion.div
                  className=""
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h2 className="text-sm font-semibold text-muted-foreground mb-1 ">
                    Production Companies
                  </h2>
                  <div className="flex flex-wrap gap-2 items-center">
                    {movie.production_companies.map((company) => (
                      <div
                        key={company.id}
                        className="flex flex-col items-center gap-2"
                      >
                        <span className="text-sm text-center text-muted-foreground">
                          {company.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
