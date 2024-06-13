import React from "react";
import { View, Text, Button, Image } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

import { RootStackParamList } from "../../App";
import useAppStore from "../store/useAppStore";

import styles from "../styles/artworkDetailsStyles";

type ArtworkDetailsRouteProp = RouteProp<RootStackParamList, "ArtworkDetails">;

const ArtworkDetails = () => {
  const route = useRoute<ArtworkDetailsRouteProp>();
  const { artwork } = route.params;
  const { bookmarks, addBookmark, removeBookmark } = useAppStore();

  const handleBookmarkToggle = () => {
    if (bookmarks.has(artwork.id)) {
      removeBookmark(artwork.id);
    } else {
      addBookmark(artwork);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: artwork.image_url,
        }}
        style={styles.image}
        resizeMode="cover"
        testID="artwork-image"
      />

      <Text style={styles.artist}>{artwork.artist_display}</Text>
      <Text>{artwork.title}</Text>
      <View style={styles.buttonWrap}>
        <Button
          title={bookmarks.has(artwork.id) ? "Unbookmark" : "Bookmark"}
          onPress={handleBookmarkToggle}
        />
      </View>
    </View>
  );
};

export default ArtworkDetails;
