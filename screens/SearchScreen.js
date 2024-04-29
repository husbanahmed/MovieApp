import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Card, Searchbar, TouchableRipple } from "react-native-paper";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchMovies } from "../utils/api";
import { setSearchResults } from "../reducers/movieSlice";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [localResults, setLocalResults] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const results = useSelector((state) => state.movies.searchResults);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      if (localResults.length === 0 && searchQuery === "") {
        setSearchQuery("");
        setPage(1);
        dispatch(setSearchResults([]));
      }
    }
  }, [isFocused, localResults.length, searchQuery, dispatch]);

  useEffect(() => {
    if (searchQuery.length > 2) {
      dispatch(fetchSearchMovies(searchQuery, page));
    } else if (searchQuery.length === 0) {
      setLocalResults([]);
    }
  }, [searchQuery, page, dispatch]);

  useEffect(() => {
    if (results) {
      if (page === 1) {
        setLocalResults(results);
      } else {
        const newResults = results.filter(
          (newResult) =>
            !localResults.some((existing) => existing.id === newResult.id)
        );
        setLocalResults((prev) => [...prev, ...newResults]);
      }
    }
  }, [results, page]);

  const handleClearPress = () => {
    setSearchQuery("");
    setLocalResults([]);
    dispatch(setSearchResults([]));
    setPage(1);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.searchBarContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          onTouchCancel={handleClearPress}
          style={styles.searchBar}
        />
      </View>
      <Text style={styles.resultsText}>Results ({localResults.length})</Text>
      {localResults.length === 0 ? (
        <Text style={{ textAlign: "center", color: "white", marginTop: 20 }}>
          No Results Found
        </Text>
      ) : (
        <ScrollView contentContainerStyle={styles.cardsContainer}>
          {localResults.map((movie, index) => (
            <View key={index} style={styles.cardWrapper}>
              <TouchableRipple
                onPress={() => navigation.push("Movie", { item: movie })}
                style={styles.touchableRipple}
              >
                <Card style={styles.card}>
                  <Card.Cover
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    }}
                    resizeMode="cover"
                    style={styles.cardCover}
                  />
                </Card>
              </TouchableRipple>
              <Text style={styles.cardTitle}>{movie.title}</Text>
            </View>
          ))}
          <TouchableOpacity
            style={styles.loadMoreButton}
            onPress={() => setPage((prev) => prev + 1)}
          >
            <Text style={styles.loadMoreButtonText}>Load More</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    padding: 10,
  },
  searchBar: {
    elevation: 2,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingBottom: 20,
  },
  cardWrapper: {
    width: "45%",
    marginBottom: 20,
  },
  card: {
    marginBottom: 8,
  },
  cardCover: {
    height: 280,
  },
  cardTitle: {
    color: "white",
    textAlign: "center",
  },
  loadMoreButton: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  loadMoreButtonText: {
    color: "#007043",
    fontWeight: "bold",
  },
  //
  resultsText: {
    color: "white",
    padding: 10,
  },
  safeArea: {
    backgroundColor: "#007043",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  touchableRipple: {
    width: "100%",
  },
});
