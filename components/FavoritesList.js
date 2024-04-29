import React from "react";
import {
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { Card, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const FavoritesBar = ({ favorites }) => {
  const navigation = useNavigation();

  const getImageUrl = (path) => `${BASE_IMAGE_URL}${path}`;

  if (favorites.length === 0) {
    return (
      <SafeAreaView>
        <Title style={styles.title}>Favorites List</Title>
        <Text style={styles.noFavoritesText}>There are no favorites yet.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Title style={styles.title}>Favorites List</Title>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {favorites.map((movie) => {
          const imageUrl = getImageUrl(movie.poster_path);
          const displayedTitle =
            movie.title.length > 14
              ? `${movie.title.slice(0, 14)}...`
              : movie.title;

          return (
            <View
              key={movie.id}
              style={{ marginRight: 8, alignItems: "center" }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Movie", { item: movie })}
              >
                <Card style={styles.card}>
                  <Card.Cover source={{ uri: imageUrl }} style={styles.cover} />
                </Card>
                <Title style={styles.titleStyle} numberOfLines={1}>
                  {displayedTitle}
                </Title>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 2,
    width: width * 0.37,
  },
  cover: {
    width: width * 0.37,
    height: 250,
  },
  title: {
    color: "white",
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  titleStyle: {
    color: "white",
    marginTop: 10,
    textAlign: "center",
  },
  noFavoritesText: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30,
  },
});

export default FavoritesBar;
