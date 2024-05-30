import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, TouchableOpacity } from "react-native";
import { fetchArtworks } from "../services/api";
import { useAppContext } from "../contexts/AppContext";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { StackNavigationProp } from "@react-navigation/stack";

interface Artwork {
  id: number;
  title: string;
  image_id: string;
  is_public_domain: boolean;
  on_view: boolean;
}

type ArtworksListNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ArtworkDetails"
>;

const ArtworksList: React.FC = () => {
  const { state, setState } = useAppContext();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<ArtworksListNavigationProp>();

  useEffect(() => {
    const loadArtworks = async () => {
      setLoading(true);
      const data = await fetchArtworks(
        state.query,
        state.page,
        state.publicDomain,
        state.onView
      );
      setArtworks(data.data);
      setLoading(false);
    };
    loadArtworks();
  }, [state.query, state.page, state.publicDomain, state.onView]);

  const handleNextPage = () => {
    setState((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  const handlePreviousPage = () => {
    if (state.page > 1) {
      setState((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={artworks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ArtworkDetails", { artwork: item })
              }
            >
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <View>
        <Button
          title="Previous"
          onPress={handlePreviousPage}
          disabled={state.page === 1}
        />
        <Button title="Next" onPress={handleNextPage} />
      </View>
    </View>
  );
};

export default ArtworksList;
