import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trendingMovies: [],
  upcomingMovies: [],
  topRatedMovies: [],
  searchResults: [],
  similarMovies: [],
  movieDetails: [],
  favorites: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setTrendingMovies(state, action) {
      state.trendingMovies = action.payload;
    },
    setUpcomingMovies(state, action) {
      state.upcomingMovies = action.payload;
    },
    setTopRatedMovies(state, action) {
      state.topRatedMovies = action.payload;
    },
    setSearchResults(state, action) {
      state.searchResults = action.payload;
    },
    setSimilarMovies(state, action) {
      state.similarMovies = action.payload;
    },
    setMovieDetails(state, action) {
      state.movieDetails = action.payload;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorites = [...state.favorites, action.payload];
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
  },
});

export const {
  setTrendingMovies,
  setUpcomingMovies,
  setTopRatedMovies,
  setSearchResults,
  setSimilarMovies,
  setMovieDetails,
  addFavorite,
  removeFavorite,
} = moviesSlice.actions;

export default moviesSlice.reducer;
