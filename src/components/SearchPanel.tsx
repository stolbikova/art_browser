// src/components/SearchPanel.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Switch,
  Image,
} from "react-native";

import useAppStore from "../store/useAppStore";

import styles from "../styles/artworksListStyles";

const DEFAULT_PAGE = 1;

const SearchPanel = ({ loading }: { loading: boolean }) => {
  const {
    query: storeQuery,
    publicDomain,
    onView,
    setQuery,
    setPage,
    setPublicDomain,
    setOnView,
  } = useAppStore();

  const [query, setLocalQuery] = useState<string>(storeQuery);

  const handleUpdateState = (type: string, value: any) => {
    switch (type) {
      case "query":
        setQuery(value);
        setPage(DEFAULT_PAGE);
        break;
      case "publicDomain":
        setPublicDomain(value);
        setPage(DEFAULT_PAGE);
        break;
      case "onView":
        setOnView(value);
        setPage(DEFAULT_PAGE);
        break;
    }
  };

  return (
    <View>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search artworks"
          testID="textInput"
          value={query}
          onChangeText={setLocalQuery}
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
            value={publicDomain}
            onValueChange={(value) => handleUpdateState("publicDomain", value)}
          />
        </View>
        <View>
          <Text style={styles.filterLabel}>On View</Text>
          <Switch
            value={onView}
            onValueChange={(value) => handleUpdateState("onView", value)}
          />
        </View>
      </View>
    </View>
  );
};

export default SearchPanel;
