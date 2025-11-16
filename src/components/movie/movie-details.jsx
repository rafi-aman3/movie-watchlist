"use client";

import { useState } from "react";
import Image from "next/image";
import { getBackdropUrl } from "@/lib/utils";
import HeroSection from "./hero-section";
import SimilarMovies from "./similar-movies";

export function MovieDetailsContent({ movie, similarMovies }) {
  const [backdropError, setBackdropError] = useState(false);
  const backdropUrl = getBackdropUrl(movie.backdrop_path);

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 w-full h-screen overflow-hidden -z-10">
        {backdropUrl && !backdropError ? (
          <>
            <Image
              src={backdropUrl}
              alt={movie.title || "Movie backdrop"}
              fill
              className="object-cover"
              priority
              sizes="100vw"
              onError={() => {
                console.error("Backdrop failed to load:", backdropUrl);
                setBackdropError(true);
              }}
              onLoad={() => setBackdropError(false)}
            />

            <div className="absolute inset-0 bg-black/60" />
          </>
        ) : (
          <div className="absolute inset-0 bg-muted" />
        )}
      </div>

      <div className="relative z-10 ">
        <HeroSection movie={movie} />
        <SimilarMovies similarMovies={similarMovies} />
      </div>
    </div>
  );
}
