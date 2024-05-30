import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Artwork {
  id: number;
  title: string;
  image_id: string;
  is_public_domain: boolean;
  on_view: boolean;
}

const Bookmarks: React.FC = () => {
  const [bookmarkedArtworks, setBookmarkedArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    const loadBookmarks = async () => {
      let bookmarks = await AsyncStorage.getItem("bookmarks");
      bookmarks = bookmarks ? JSON.parse(bookmarks) : [];
      setBookmarkedArtworks(bookmarks);
    };
    loadBookmarks();
  }, []);

  return (
    <View>
      <FlatList
        data={bookmarkedArtworks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Bookmarks;
