import { useEffect, useState, useCallback, useMemo } from "react";
const MAX_PAGES = 10;

export function useMoviePagination(queryHook) {
  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState([]);

  const { data, isLoading, error } = queryHook(page);

  useEffect(() => {
    if (data?.results && data.results.length > 0) {
      setAllMovies((prev) => {
        if (page === 1) {
          return data.results;
        }

        const newMovies = data.results.filter(
          (movie) => !prev.some((m) => m.id === movie.id)
        );
        return [...prev, ...newMovies];
      });
    }
  }, [data, page]);

  const totalPages = useMemo(
    () => Math.min(data?.total_pages || 1, MAX_PAGES),
    [data?.total_pages]
  );

  const loadMore = useCallback(() => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  }, [page, totalPages]);

  const hasMore = page < totalPages;

  return {
    movies: allMovies,
    isLoading,
    error,
    loadMore,
    hasMore,
    totalPages,
    currentPage: page,
  };
}
