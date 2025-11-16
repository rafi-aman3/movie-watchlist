import { getPosterUrl } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const MovieCardPoster = ({ movie }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <>
      {getPosterUrl(movie.poster_path) && !imageError ? (
        <Image
          src={getPosterUrl(movie.poster_path)}
          alt={movie.title || "Movie poster"}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 20vw, 16vw"
          onError={() => {
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
    </>
  );
};

export default MovieCardPoster;
