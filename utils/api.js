import { setSearchResults } from "../reducers/movieSlice";
import API_KEY from "../config";

const apiKey = API_KEY;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

export const fetchTrendingMovies = async () => {
  try {
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(
      "There was a problem with the fetch trenfdingmovies operation:",
      error
    );
    return [];
  }
};

export const fetchUpcomingMovies = async () => {
  try {
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`;
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(
      "There was a problem with the fetch upcoming operation:",
      error
    );
    return [];
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(
      "There was a problem with the fetch top rated operation:",
      error
    );
    return [];
  }
};

export const fetchSimilarMovies = async (movieId) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}&language=en-US&page=1`;
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(
      "There was a problem with the fetch similar movies operation:",
      error
    );
    return [];
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "There was a problem with the fetch movie details operation:",
      error
    );
    return [];
  }
};

export const fetchSearchMovies =
  (query, page = 1) =>
  async (dispatch, getState) => {
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&include_adult=false&language=en-US&page=${page}`;
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.results && Array.isArray(data.results)) {
        if (page > 1) {
          const existingResults = getState().movies.searchResults;
          dispatch(setSearchResults([...existingResults, ...data.results]));
        } else {
          dispatch(setSearchResults(data.results));
        }
      } else {
        dispatch(setSearchResults([]));
      }
    } catch (error) {
      console.error(
        "There was a problem with the fetch search movies operation:",
        error
      );
      dispatch(setSearchResults([]));
    }
  };
