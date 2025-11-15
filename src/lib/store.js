import { configureStore } from "@reduxjs/toolkit";
import { moviesApi } from "./api/moviesApi";
import { watchlistApi } from "./api/watchlistApi";

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    [watchlistApi.reducerPath]: watchlistApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      moviesApi.middleware,
      watchlistApi.middleware
    ),
});

