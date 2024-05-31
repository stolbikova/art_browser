import React from "react";
import { View, Text, Button, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp, useRoute } from "@react-navigation/native";

import { RootStackParamList } from "../../App";
import { useAppContext } from "../contexts/AppContext";

import styles from "../styles/artworkDetailsStyles";

type ArtworkDetailsRouteProp = RouteProp<RootStackParamList, "ArtworkDetails">;

const ArtworkDetails = () => {
  const route = useRoute<ArtworkDetailsRouteProp>();
  const { artwork } = route.params;
  const { state, setState } = useAppContext();

  const handleBookmarkToggle = async () => {
    const newBookmarks = new Map(state.bookmarks);

    if (!newBookmarks.has(artwork.id)) {
      newBookmarks.set(artwork.id, artwork);
    } else {
      newBookmarks.delete(artwork.id);
    }

    await AsyncStorage.setItem(
      "bookmarks",
      JSON.stringify(Array.from(newBookmarks.values()))
    );
    setState((prev) => ({ ...prev, bookmarks: newBookmarks }));
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: artwork.image_url,
        }}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.artist}>{artwork.artist_display}</Text>
      <Text>{artwork.title}</Text>
      <View style={styles.buttonWrap}>
        <Button
          title={state.bookmarks.has(artwork.id) ? "Unbookmark" : "Bookmark"}
          onPress={handleBookmarkToggle}
        />
      </View>
    </View>
  );
};

export default ArtworkDetails;
