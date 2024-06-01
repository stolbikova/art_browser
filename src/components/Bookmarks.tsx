import React from "react";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { StackNavigationProp } from "@react-navigation/stack";

import { useAppContext } from "../contexts/AppContext";
import { RootStackParamList } from "../../App";

import styles from "../styles/bookmarksStyles";

type ArtworksListNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ArtworkDetails"
>;

const Bookmarks = () => {
  const { state } = useAppContext();

  const navigation = useNavigation<ArtworksListNavigationProp>();
  return (
    <View style={styles.container}>
      <FlatList
        data={Array.from(state.bookmarks.values())}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        style={styles.itemContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ArtworkDetails", { artwork: item })
            }
          >
            <View>
              <Image
                source={{
                  uri: item.image_url,
                }}
                style={styles.itemImage}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Bookmarks;
