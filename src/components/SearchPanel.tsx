import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Switch,
  Image,
} from "react-native";

import { useAppContext } from "../contexts/AppContext";

import styles from "../styles/artworksListStyles";

const DEFAULT_PAGE = 1;

const SearchPanel = ({ loading }: { loading: boolean }) => {
  const { state, setState } = useAppContext();

  const [query, setQuery] = useState<string>(state.query);

  const handleUpdateState = (type: string, value: any) => {
    setState((prev) => ({
      ...prev,
      [type]: value,
      ...(type !== "page" && { page: DEFAULT_PAGE }),
    }));
  };

  return (
    <View>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search artworks"
          testID="textInput"
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
    </View>
  );
};

export default SearchPanel;
