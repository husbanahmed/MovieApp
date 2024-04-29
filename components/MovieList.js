import React from "react";
import {
  ScrollView,
  Dimensions,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Title, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MovieList = ({ title, data }) => {
  const navigation = useNavigation();

  const getImageUrl = (path) => `${BASE_IMAGE_URL}${path}`;

  return (
    <SafeAreaView>
      <View>
        <Title style={styles.title}>{title}</Title>
      </View>

      <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: 15 }}>
        {data.map((item, index) => {
          const imageUrl = getImageUrl(item.poster_path);
          const displayedTitle =
            item.title && item.title.length > 14
              ? `${item.title.slice(0, 14)}...`
              : item.title;
          return (
            <View key={index} style={{ marginRight: 8, alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => navigation.push("Movie", { item })}
              >
                <Card style={styles.card}>
                  <Card.Cover source={{ uri: imageUrl }} style={styles.cover} />
                </Card>
                <Title
                  style={{
                    color: "white",
                    marginTop: 10,
                    textAlign: "center",
                  }}
                  numberOfLines={1}
                >
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
  title: {
    color: "white",
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  card: {
    elevation: 2,
    width: width * 0.37,
  },
  cover: {
    width: width * 0.37,
    height: 250,
  },
});

export default MovieList;
