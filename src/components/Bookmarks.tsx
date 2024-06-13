import React, { useEffect } from "react";
import { View } from "react-native";

import useAppStore from "../store/useAppStore";
import ImagesList from "./ImagesList";

import styles from "../styles/bookmarksStyles";

const Bookmarks = () => {
  const { bookmarks, initializeBookmarks } = useAppStore();

  useEffect(() => {
    initializeBookmarks();
  }, []);

  return (
    <View style={styles.container}>
      <ImagesList artworks={Array.from(bookmarks.values())} />
    </View>
  );
};

export default Bookmarks;
