import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import MovieScreen from "../screens/MovieScreen";
import SearchScreen from "../screens/SearchScreen";
import { Provider } from "react-redux";
import store from "../src/store";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MovieApp"
            options={{ headerShown: false }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="Movie"
            options={{ headerShown: false }}
            component={MovieScreen}
          />
          <Stack.Screen
            name="Search"
            options={{ headerShown: false }}
            component={SearchScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
