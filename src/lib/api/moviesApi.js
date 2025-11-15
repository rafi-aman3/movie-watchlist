import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Movies"],
  endpoints: (builder) => ({
    searchMovies: builder.query({
      query: (query) => `/search?q=${encodeURIComponent(query)}`,
      providesTags: ["Movies"],
    }),
    getMovieDetails: builder.query({
      query: (id) => `/movie/${id}`,
      providesTags: (result, error, id) => [{ type: "Movies", id }],
    }),
    getPopularMovies: builder.query({
      query: (page = 1) => `/popular?page=${page}`,
      providesTags: ["Movies"],
    }),
    getTrendingMovies: builder.query({
      query: (page = 1) => `/trending?page=${page}`,
      providesTags: ["Movies"],
    }),
    discoverMoviesByGenre: builder.query({
      query: ({ genreIds, page = 1, excludeId }) => {
        const params = new URLSearchParams({
          with_genres: genreIds.join(","),
          page: page.toString(),
        });
        if (excludeId) {
          params.append("exclude_id", excludeId);
        }
        return `/discover?${params.toString()}`;
      },
      providesTags: ["Movies"],
    }),
  }),
});

export const {
  useSearchMoviesQuery,
  useGetMovieDetailsQuery,
  useGetPopularMoviesQuery,
  useGetTrendingMoviesQuery,
  useLazySearchMoviesQuery,
  useDiscoverMoviesByGenreQuery,
} = moviesApi;

