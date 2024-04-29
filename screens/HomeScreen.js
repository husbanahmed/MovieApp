import React, { useEffect } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { Appbar } from "react-native-paper";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";
import {
  setTrendingMovies,
  setUpcomingMovies,
  setTopRatedMovies,
} from "../reducers/movieSlice";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import FavoritesBar from "../components/FavoritesList";

function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const trending = useSelector((state) => state.movies.trendingMovies);
  const upcoming = useSelector((state) => state.movies.upcomingMovies);
  const topRated = useSelector((state) => state.movies.topRatedMovies);
  const favorites = useSelector((state) => state.movies.favorites);

  useEffect(() => {
    fetchTrendingMovies()
      .then((data) => dispatch(setTrendingMovies(data)))
      .catch((error) =>
        console.error("Error fetching trending movies:", error)
      );

    fetchUpcomingMovies()
      .then((data) => dispatch(setUpcomingMovies(data)))
      .catch((error) =>
        console.error("Error fetching upcoming movies:", error)
      );

    fetchTopRatedMovies()
      .then((data) => dispatch(setTopRatedMovies(data)))
      .catch((error) =>
        console.error("Error fetching top-rated movies:", error)
      );
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBarHeader}>
        <Appbar.Content
          title="MovieApp"
          titleStyle={styles.titleStyle}
          style={styles.appBarContent}
        />
        <Appbar.Action
          color="#FFFFFF"
          icon="magnify"
          onPress={() => navigation.navigate("Search")}
        />
      </Appbar.Header>
      <ScrollView showsVerticalScrollIndicator={true}>
        <TrendingMovies data={trending} />
        <MovieList title="Upcoming" data={upcoming} />
        <MovieList title="Top Rated" data={topRated} />
        <FavoritesBar favorites={favorites} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#007043",
  },
  appBarHeader: {
    backgroundColor: "#00321E",
  },
  appBarContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  titleStyle: {
    color: "#FFFFFF",
    paddingLeft: Platform.OS === "android" ? 30 : 0,
  },
});

export default HomeScreen;
