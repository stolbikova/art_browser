import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
  TextInput,
  Switch,
  Image,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import { Artwork } from "../types";
import { fetchArtworks } from "../services/api";
import { useAppContext } from "../contexts/AppContext";
import { RootStackParamList } from "../../App";

import styles from "../styles/artworksListStyles";

type ArtworksListNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ArtworkDetails"
>;

const DEFAULT_PAGE = 1;

const ArtworksList = () => {
  const { state, setState } = useAppContext();

  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>(state.query);

  const navigation = useNavigation<ArtworksListNavigationProp>();

  useEffect(() => {
    loadArtworks(state.query, state.publicDomain, state.onView);
  }, [state.query, state.page, state.publicDomain, state.onView]);

  const loadArtworks = async (
    searchQuery: string,
    publicDomain?: boolean,
    onView?: boolean
  ) => {
    setLoading(true);
    const data = await fetchArtworks(
      searchQuery,
      state.page,
      publicDomain,
      onView
    );
    setArtworks(data.data as Artwork[]);
    setLoading(false);
  };

  const handleUpdateState = (type: string, value: any) => {
    setState((prev) => ({
      ...prev,
      [type]: value,
      ...(type !== "page" && { page: DEFAULT_PAGE }),
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search artworks"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => handleUpdateState("query", query)}
        />
        <TouchableOpacity onPress={() => handleUpdateState("query", query)}>
          <Image
            source={require("../../assets/search.png")}
            style={[styles.icon, loading && styles.disabled]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.filters}>
        <View>
          <Text style={styles.filterLabel}>Public Domain</Text>
          <Switch
            value={state.publicDomain}
            onValueChange={(value) => handleUpdateState("publicDomain", value)}
          />
        </View>
        <View>
          <Text style={styles.filterLabel}>On View</Text>
          <Switch
            value={state.onView}
            onValueChange={(value) => handleUpdateState("onView", value)}
          />
        </View>
      </View>
      {/*  */}
      {loading ? (
        <View style={styles.loader}>
          <Text>Loading...</Text>
        </View>
      ) : (
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
                />
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      <View>
        <Button
          title="Previous"
          onPress={() => handleUpdateState("page", state.page - 1)}
          disabled={state.page === 1 || loading}
        />
        <Button
          title="Next"
          onPress={() => handleUpdateState("page", state.page + 1)}
          disabled={loading}
        />
      </View>
    </View>
  );
};

export default ArtworksList;
