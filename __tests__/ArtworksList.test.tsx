import React from "react";
import { fireEvent, act } from "@testing-library/react-native";

import ArtworksList from "../src/components/ArtworksList";
import { render } from "../src/helpers/test-utils";

test("renders ArtworksList correctly", async () => {
  const { getByPlaceholderText } = render(<ArtworksList />);

  const searchInput = getByPlaceholderText("Search artworks");
  expect(searchInput).toBeTruthy();

  //   await act(async () => {
  //     // Simulate a search action
  //     fireEvent.changeText(searchInput, "Mona Lisa");
  //     fireEvent(searchInput, "submitEditing");
  //   });

  // Check if the list updates (depends on your mock data)
  // Example: expect(getByText('Mona Lisa')).toBeTruthy();
});
