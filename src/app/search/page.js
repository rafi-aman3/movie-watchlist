"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { useLazySearchMoviesQuery } from "@/lib/api/moviesApi";
import { MovieCard } from "@/components/movie-card";
import LoadingSpinner from "@/components/loading-spinner";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [triggerSearch, { data, isLoading, error }] =
    useLazySearchMoviesQuery();

  useEffect(() => {
    const urlQuery = searchParams.get("q");
    if (urlQuery) {
      setQuery(urlQuery);
      triggerSearch(urlQuery);
    }
  }, [searchParams, triggerSearch]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      return;
    }

    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    triggerSearch(query.trim());
  };

  const results = data?.results || [];
  const hasSearched = !!searchParams.get("q") || data;

  return (
    <div className="min-h-screen relative">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage: "url('https://image.tmdb.org/t/p/original/4R1ifpFZ1dfwBMiCIDyZ2M2Gvwp.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>
      <div className="relative h-[300px] sm:h-[400px] md:h-[450px] mb-8 sm:mb-12">
        <div className="relative container mx-auto px-4 sm:px-6 h-full flex flex-col justify-center max-w-4xl">
          <h1 className="text-3xl sm:text-4xl  font-bold mb-3 sm:mb-4 text-white drop-shadow-lg">
            Discover Your Next Favorite Movie
          </h1>
          <p className="text-base  text-gray-200 mb-6 sm:mb-8 drop-shadow-md max-w-2xl">
            Search through thousands of movies to find exactly what you're looking for
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="w-full">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4 sm:size-5" />
                <Input
                  type="text"
                  placeholder="Search for movies by title..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 sm:pl-12 h-12 sm:h-14 text-sm sm:text-base bg-background text-foreground placeholder:text-muted-foreground border-2 focus:border-primary shadow-lg"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
                className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-base hover:scale-105 transition-transform shadow-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 sm:size-5 animate-spin mr-2" />
                    <span className="hidden sm:inline">Searching...</span>
                    <span className="sm:hidden">Searching</span>
                  </>
                ) : (
                  <>
                    <Search className="size-4 sm:size-5 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 pb-8 sm:pb-12 max-w-7xl">
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md mb-6">
            Failed to search movies. Please try again.
          </div>
        )}

        {isLoading && <LoadingSpinner />}

        {!isLoading && hasSearched && results.length === 0 && !error && (
          <div className="text-center py-12 sm:py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-muted mb-4">
              <Search className="size-8 sm:size-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-lg sm:text-xl font-medium">
              No movies found
            </p>
            <p className="text-muted-foreground text-sm sm:text-base mt-2">
              Try a different search term or check your spelling
            </p>
          </div>
        )}

        {!isLoading && results.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Search Results
                <span className="text-muted-foreground ml-2 text-base sm:text-lg font-normal">
                  ({results.length} {results.length === 1 ? 'movie' : 'movies'})
                </span>
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        )}

        {!hasSearched && !isLoading && (
          <div className="text-center py-12 sm:py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 mb-4">
              <Search className="size-8 sm:size-10 text-primary" />
            </div>
            <p className="text-muted-foreground text-lg sm:text-xl font-medium">
              Start Your Search
            </p>
            <p className="text-muted-foreground text-sm sm:text-base mt-2">
              Enter a movie title above to discover amazing films
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <LoadingSpinner />
      }
    >
      <SearchContent />
    </Suspense>
  );
}