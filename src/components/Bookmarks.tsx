import React from "react";
import { View } from "react-native";

import { useAppContext } from "../contexts/AppContext";
import ImagesList from "./ImagesList";

import styles from "../styles/bookmarksStyles";

const Bookmarks = () => {
  const { state } = useAppContext();

  return (
    <View style={styles.container}>
      <ImagesList artworks={Array.from(state.bookmarks.values())} />
    </View>
  );
};

export default Bookmarks;
