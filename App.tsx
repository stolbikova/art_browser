import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ArtworksList from "./src/components/ArtworksList";
import ArtworkDetails from "./src/components/ArtworkDetails";
import Bookmarks from "./src/components/Bookmarks";
import { AppProvider } from "./src/contexts/AppContext";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

export type RootStackParamList = {
  ArtworksList: undefined;
  ArtworkDetails: { artwork: Artwork };
  Bookmarks: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <AppProvider>
      <NavigationContainer>
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
          <Stack.Screen
            name="Bookmarks"
            component={gestureHandlerRootHOC(Bookmarks)}
            options={{ title: "Bookmarks" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};

export default gestureHandlerRootHOC(App);
