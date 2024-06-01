import { StyleSheet } from "react-native";

import { SIZES } from "./common";

const bookmarksStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.MEDIUM,
  },
  itemImage: { width: 100, height: 100, margin: SIZES.SMALL },
  itemContainer: {
    width: "100%",
  },
});

export default bookmarksStyles;
