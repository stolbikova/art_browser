import React from "react";
import { View, Text, Button } from "react-native";

import useFetchArtworks from "../hooks/useFetchArtworks";
import ImagesList from "./ImagesList";
import SearchPanel from "./SearchPanel";

import styles from "../styles/artworksListStyles";

const ArtworksList = () => {
  const { artworks, loading, handleUpdateState, page } = useFetchArtworks();

  return (
    <View style={styles.container}>
      <SearchPanel loading={loading} />
      {loading ? (
        <View style={styles.loader}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <ImagesList artworks={artworks} />
      )}
      <View>
        <Button
          title="Previous"
          onPress={() => handleUpdateState("page", page - 1)}
          disabled={page === 1 || loading}
        />
        <Button
          title="Next"
          onPress={() => handleUpdateState("page", page + 1)}
          disabled={loading}
        />
      </View>
    </View>
  );
};

export default ArtworksList;
