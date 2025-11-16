import React from "react";
import { motion } from "framer-motion";
import { MovieCard } from "../movie-card";

const SimilarMovies = ({ similarMovies }) => {
  if (similarMovies.length <= 0) return null;

  return (
    <div className=" backdrop-blur-2xl">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            Similar Movies
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {similarMovies.map((similarMovie) => (
              <MovieCard key={similarMovie.id} movie={similarMovie} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SimilarMovies;
