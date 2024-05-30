import React from "react";
import { View, Text, Button, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../App";

interface Artwork {
  id: number;
  title: string;
  image_id: string;
  is_public_domain: boolean;
  on_view: boolean;
}

type ArtworkDetailsRouteProp = RouteProp<RootStackParamList, "ArtworkDetails">;

const ArtworkDetails: React.FC = () => {
  const route = useRoute<ArtworkDetailsRouteProp>();
  const { artwork } = route.params;

  const handleBookmark = async () => {
    let bookmarks = await AsyncStorage.getItem("bookmarks");
    bookmarks = bookmarks ? JSON.parse(bookmarks) : [];
    bookmarks.push(artwork);
    await AsyncStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  };

  const handleUnbookmark = async () => {
    let bookmarks = await AsyncStorage.getItem("bookmarks");
    bookmarks = bookmarks ? JSON.parse(bookmarks) : [];
    bookmarks = bookmarks.filter((item: Artwork) => item.id !== artwork.id);
    await AsyncStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  };

  return (
    <View>
      <Image
        source={{
          uri: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`,
        }}
        style={{ width: 300, height: 300 }}
      />
      <Text>{artwork.title}</Text>
      <Button title="Bookmark" onPress={handleBookmark} />
      <Button title="Unbookmark" onPress={handleUnbookmark} />
    </View>
  );
};

export default ArtworkDetails;
