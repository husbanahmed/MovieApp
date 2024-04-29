import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, IconButton, Card } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import MovieList from "../components/MovieList";
import { useDispatch, useSelector } from "react-redux";
import { fetchSimilarMovies, fetchMovieDetails } from "../utils/api";
import {
  setSimilarMovies,
  setMovieDetails,
  addFavorite,
  removeFavorite,
} from "../reducers/movieSlice";

const { width, height } = Dimensions.get("window");

export default function MovieScreen() {
  const route = useRoute();
  const item = route.params?.item;
  const [isFavorite, setIsFavorite] = React.useState(false);
  const dispatch = useDispatch();
  const similarMovies = useSelector((state) => state.movies.similarMovies);
  const movieDetails = useSelector((state) => state.movies.movieDetails);
  const favorites = useSelector((state) => state.movies.favorites);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      if (!item || !item.id) {
        console.log("Item or item.id is undefined");
        return;
      }

      const isAlreadyFavorite = favorites.some((fav) => fav.id === item.id);
      setIsFavorite(isAlreadyFavorite);

      try {
        const similarData = await fetchSimilarMovies(item.id);
        dispatch(setSimilarMovies(similarData));

        const details = await fetchMovieDetails(item.id);
        dispatch(setMovieDetails(details));
      } catch (error) {
        console.error("Fetching movie details failed", error);
      }
    };

    fetchData();
  }, [item, dispatch, favorites]);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      dispatch(addFavorite(item));
    } else {
      dispatch(removeFavorite(item));
    }
  };

  if (!item) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Card style={styles.card}>
            {item.poster_path && (
              <Card.Cover
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.cover}
                resizeMode="cover"
              />
            )}
            <View style={styles.buttonsContainer}>
              <Appbar.BackAction
                onPress={() => navigation.goBack()}
                color="white"
              />
              <IconButton
                onPress={handleFavoriteToggle}
                icon={isFavorite ? "heart" : "heart-outline"}
                iconColor={isFavorite ? "red" : "gray"}
                size={40}
              />
            </View>
          </Card>
          <View style={styles.detailsContainer}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.detailText}>
              Genres:{" "}
              {movieDetails.genres?.map((genre) => genre.name).join(", ") ||
                "N/A"}
            </Text>
            <Text style={styles.detailText}>
              Run Time:{" "}
              {movieDetails.runtime
                ? `${Math.floor(movieDetails.runtime / 60)}h ${
                    movieDetails.runtime % 60
                  }m`
                : "N/A"}{" "}
              minutes
            </Text>
            <Text style={styles.overviewText}>{item.overview}</Text>
          </View>
        </View>
        {similarMovies.length > 0 && (
          <MovieList
            title={"Similar Movies"}
            hideSeeAll={true}
            data={similarMovies}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#007043",
  },
  card: {
    position: "center",
    width: width,
    height: Platform.OS === "android" ? height * 0.75 : height * 0.6,
  },
  cover: {
    width: width,
    height: Platform.OS === "android" ? height * 0.75 : height * 0.6,
  },
  buttonsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  detailsContainer: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  detailText: {
    color: "white",
    fontSize: 18,
    paddingVertical: 5,
  },
  overviewText: {
    color: "white",
    paddingHorizontal: 20,
    fontSize: 20,
    textAlign: "justify",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#007043",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  titleText: {
    bottom: 10,
    textAlign: "center",
    color: "white",
    fontSize: 30,
  },
});
