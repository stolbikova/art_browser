import { StyleSheet } from "react-native";

import { SIZES } from "./common";

const artworksListStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.MEDIUM,
  },
  item: {
    flex: 1,
    margin: SIZES.MEDIUM,
  },
  itemText: { overflow: "hidden" },
  itemImage: { width: 100, height: 100 },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: SIZES.MEDIUM,
    paddingHorizontal: 10,
    width: "90%",
  },
  filters: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: SIZES.MEDIUM,
  },
  filterLabel: {
    fontSize: 16,
  },
  artist: {
    color: "#808080",
  },
  icon: {
    width: 25,
    height: 25,
    marginLeft: SIZES.SMALL,
    marginBottom: SIZES.MEDIUM,
  },
  disabled: {
    opacity: 0.5,
  },
  searchBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default artworksListStyles;
