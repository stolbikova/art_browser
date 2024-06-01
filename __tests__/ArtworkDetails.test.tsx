import React from "react";
import { fireEvent, act } from "@testing-library/react-native";
import ArtworkDetails from "../src/components/ArtworkDetails";
import { render } from "../src/helpers/test-utils";

describe("ArtworkDetails", () => {
  test("renders ArtworkDetails correctly", async () => {
    const { getByText, getByRole } = render(<ArtworkDetails />);
    expect(getByText("Mona Lisa")).toBeTruthy();
    expect(getByText("Leonardo da Vinci")).toBeTruthy();
    // const button = getByRole("button");
    act(async () => {
      //   fireEvent.press(button);
      // Add any additional state changes or async operations here
      // Add assertions for bookmarking logic
    });
  });
});
