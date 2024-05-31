import { StyleSheet } from "react-native";

import { SIZES } from "./common";

const artworkDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.MEDIUM,
  },
  artist: {
    color: "#808080",
    marginBottom: SIZES.MEDIUM,
  },
  image: {
    width: "100%",
    marginBottom: SIZES.MEDIUM,
    aspectRatio: 1,
  },
  buttonWrap: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: SIZES.MEDIUM,
    borderColor: "#808080",
  },
});

export default artworkDetailsStyles;
