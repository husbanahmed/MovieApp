import React from "react";
import { View, Dimensions, StyleSheet, Platform } from "react-native";
import Carousel from "react-native-snap-carousel";
import { Card, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const TrendingMovies = ({ data }) => {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };

  const MovieCard = ({ item, handleClick }) => {
    const imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;

    return (
      <Card onPress={() => handleClick({ item })} style={styles.card}>
        <Card.Cover source={{ uri: imageUrl }} style={styles.cover} />
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Trending Movies</Title>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        sliderWidth={width}
        itemWidth={width * 0.6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    marginLeft: 10,
    color: "white",
  },
  card: {
    width: width * 0.6,
    height: Platform.OS === "android" ? height * 0.5 : height * 0.4,
    marginHorizontal: 10,
  },
  cover: {
    width: width * 0.6,
    height: Platform.OS === "android" ? height * 0.5 : height * 0.4,
  },
});

export default TrendingMovies;
