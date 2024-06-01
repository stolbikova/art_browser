import React from "react";
import { fireEvent, act } from "@testing-library/react-native";

import Bookmarks from "../src/components/Bookmarks";

import { render } from "../src/helpers/test-utils";

test("renders Bookmarks correctly", () => {
  const { getByText } = render(<Bookmarks />);
});
