import React from "react";
import { View, FlatList, TouchableOpacity, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import { Artwork } from "../types";
import { RootStackParamList } from "../../App";

import styles from "../styles/artworksListStyles";

type ArtworksListNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ArtworkDetails"
>;

const ImagesList = ({ artworks }: { artworks: Artwork[] }) => {
  const navigation = useNavigation<ArtworksListNavigationProp>();

  return (
    <FlatList
      data={artworks}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3}
      style={styles.itemContainer}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ArtworkDetails", { artwork: item })
          }
        >
          <View style={styles.item}>
            <Image
              source={{
                uri: item.image_url,
              }}
              style={styles.itemImage}
              testID={`image-${item.id}`}
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default ImagesList;
