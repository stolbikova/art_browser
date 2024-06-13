import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";

import ArtworksList from "./src/components/ArtworksList";
import ArtworkDetails from "./src/components/ArtworkDetails";
import Bookmarks from "./src/components/Bookmarks";
import { Artwork } from "./src/types";

export type RootStackParamList = {
  ArtworksList: undefined;
  ArtworkDetails: { artwork: Artwork };
  Bookmarks: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const ArtworksStack = () => (
  <Stack.Navigator initialRouteName="ArtworksList">
    <Stack.Screen
      name="ArtworksList"
      component={gestureHandlerRootHOC(ArtworksList)}
      options={{ title: "Artworks" }}
    />
    <Stack.Screen
      name="ArtworkDetails"
      component={gestureHandlerRootHOC(ArtworkDetails)}
      options={{ title: "Artwork Details" }}
    />
  </Stack.Navigator>
);

const App = () => {
  return (
    // <AppProvider>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Bookmarks") {
              iconName = focused ? "bookmark" : "bookmark-outline";
            }

            if (iconName)
              return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          options={{
            headerShown: false,
          }}
          component={ArtworksStack}
        />
        <Tab.Screen
          name="Bookmarks"
          component={gestureHandlerRootHOC(Bookmarks)}
          options={{ title: "Bookmarks" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    // </AppProvider>
  );
};

export default gestureHandlerRootHOC(App);
