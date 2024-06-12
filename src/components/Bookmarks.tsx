import React from "react";
import { View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { useAppContext } from "../contexts/AppContext";
import { RootStackParamList } from "../../App";
import ImagesList from "./ImagesList";

import styles from "../styles/bookmarksStyles";

type ArtworksListNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ArtworkDetails"
>;

const Bookmarks = () => {
  const { state } = useAppContext();

  return (
    <View style={styles.container}>
      <ImagesList artworks={Array.from(state.bookmarks.values())} />
    </View>
  );
};

export default Bookmarks;
