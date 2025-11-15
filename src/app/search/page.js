"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { useLazySearchMoviesQuery, useGetPopularMoviesQuery, useGetTrendingMoviesQuery } from "@/lib/api/moviesApi";
import { MovieSection } from "@/components/movie-section";
import { MovieCard } from "@/components/movie-card";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [triggerSearch, { data, isLoading, error }] = useLazySearchMoviesQuery();

  // Fetch popular and trending movies
  const {
    data: popularData,
    isLoading: popularLoading,
  } = useGetPopularMoviesQuery(1);

  const {
    data: trendingData,
    isLoading: trendingLoading,
  } = useGetTrendingMoviesQuery(1);

  const popularMovies = popularData?.results || [];
  const popularTotalPages = Math.min(popularData?.total_pages || 1, 10);
  const trendingMovies = trendingData?.results || [];
  const trendingTotalPages = Math.min(trendingData?.total_pages || 1, 10);

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
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-7xl">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Search Movies</h1>
      
      <form onSubmit={handleSearch} className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4 sm:size-5" />
            <Input
              type="text"
              placeholder="Search for movies by title..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 sm:pl-10 text-sm sm:text-base"
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full sm:w-auto hover:scale-105 transition-transform"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" />
                <span className="hidden sm:inline">Searching...</span>
                <span className="sm:hidden">Searching</span>
              </>
            ) : (
              "Search"
            )}
          </Button>
        </div>
      </form>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md mb-6">
          Failed to search movies. Please try again.
        </div>
      )}

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {!isLoading && hasSearched && results.length === 0 && !error && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No movies found. Try a different search term.
          </p>
        </div>
      )}

      {!isLoading && results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {!hasSearched && !isLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Enter a movie title above to start searching
          </p>
        </div>
      )}

      {/* Trending Movies Section */}
      {!popularLoading && !trendingLoading && (
        <>
          <MovieSection
            title="Trending Now"
            apiEndpoint="/api/trending"
            initialMovies={trendingMovies}
            initialPage={1}
            totalPages={trendingTotalPages}
          />

          {/* Popular Movies Section */}
          <MovieSection
            title="Popular Movies"
            apiEndpoint="/api/popular"
            initialMovies={popularMovies}
            initialPage={1}
            totalPages={popularTotalPages}
          />
        </>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
