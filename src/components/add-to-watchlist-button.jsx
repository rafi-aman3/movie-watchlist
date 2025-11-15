"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";
import {
  useAddToWatchlistMutation,
  useRemoveFromWatchlistMutation,
  useCheckWatchlistStatusQuery,
} from "@/lib/api/watchlistApi";
import { Plus, Check, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";

export function AddToWatchlistButton({ movie, variant = "default", size = "default" }) {
  const { user } = useAuth();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const { data: statusData, isLoading: checkingStatus } =
    useCheckWatchlistStatusQuery(movie.id, {
      skip: !user || !movie.id,
    });

  const [addToWatchlist, { isLoading: adding }] = useAddToWatchlistMutation();
  const [removeFromWatchlist, { isLoading: removing }] =
    useRemoveFromWatchlistMutation();

  const inWatchlist = statusData?.inWatchlist || false;
  const isLoading = adding || removing || checkingStatus;

  const handleClick = async (e) => {
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

  if (!user) {
    return (
      <Button
        variant={variant}
        size={size}
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="size-4 animate-spin mr-2" />
        ) : (
          <Plus className="size-4 mr-2" />
        )}
        Add to Watchlist
      </Button>
    );
  }

  return (
    <Button
      variant={inWatchlist ? "secondary" : variant}
      size={size}
      onClick={handleClick}
      disabled={isLoading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isLoading ? (
        <Loader2 className="size-4 animate-spin mr-2" />
      ) : inWatchlist ? (
        <>
          {isHovered ? (
            <>
              <X className="size-4 mr-2" />
              Remove
            </>
          ) : (
            <>
              <Check className="size-4 mr-2" />
              In Watchlist
            </>
          )}
        </>
      ) : (
        <>
          <Plus className="size-4 mr-2" />
          Add to Watchlist
        </>
      )}
    </Button>
  );
}

