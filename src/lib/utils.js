import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const getPosterUrl = (posterPath) => {
  if (!posterPath) return null;
  const path = posterPath.startsWith("/") ? posterPath : `/${posterPath}`;
  return `https://image.tmdb.org/t/p/w300_and_h450_bestv2${path}`;
};

export const getBackdropUrl = (backdropPath) => {
  if (!backdropPath) return null;
  const path = backdropPath.startsWith("/") ? backdropPath : `/${backdropPath}`;
  return `https://image.tmdb.org/t/p/original${path}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatRating = (rating) => {
  if (!rating) return "N/A";
  return rating.toFixed(1);
};

export const getLogoUrl = (logoPath) => {
  if (!logoPath) return null;
  const path = logoPath.startsWith('/') ? logoPath : `/${logoPath}`;
  return `https://image.tmdb.org/t/p/w200${path}`;
};

export const getYear = (releaseDate) => {
  if (!releaseDate) return "N/A";
  return new Date(releaseDate).getFullYear();
};
