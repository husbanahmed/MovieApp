import { combineReducers } from "@reduxjs/toolkit";
import moviesReducer from "./movieSlice";

const rootReducer = combineReducers({
  movies: moviesReducer,
  // Add more reducers here as needed
});

export default rootReducer;
