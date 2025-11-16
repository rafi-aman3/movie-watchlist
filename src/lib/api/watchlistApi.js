import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const watchlistApi = createApi({
  reducerPath: "watchlistApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/watchlist" }),
  tagTypes: ["Watchlist"],
  endpoints: (builder) => ({
    getWatchlist: builder.query({
      query: () => "/",
      providesTags: ["Watchlist"],
    }),
    addToWatchlist: builder.mutation({
      query: (movie) => ({
        url: "/",
        method: "POST",
        body: movie,
      }),
      invalidatesTags: ["Watchlist"],
    }),
    removeFromWatchlist: builder.mutation({
      query: (movieId) => ({
        url: `/${movieId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Watchlist"],
    }),
    checkWatchlistStatus: builder.query({
      query: (movieId) => `/check/${movieId}`,
      providesTags: (result, error, movieId) => [
        { type: "Watchlist", id: movieId },
      ],
    }),
  }),
});

export const {
  useGetWatchlistQuery,
  useAddToWatchlistMutation,
  useRemoveFromWatchlistMutation,
  useCheckWatchlistStatusQuery,
  useLazyCheckWatchlistStatusQuery
} = watchlistApi;

