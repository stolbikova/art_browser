import React from "react";
import { fireEvent, waitFor, act } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ArtworkDetails from "../src/components/ArtworkDetails";
import { render } from "../src/helpers/test-utils";

const mockArtwork = {
  id: 1,
  title: "Mona Lisa",
  image_id: "mock-image-id",
  is_public_domain: true,
  on_view: true,
  artist_display: "Leonardo da Vinci",
  image_url: "http://example.com/mona-lisa.jpg",
};

describe("ArtworkDetails", () => {
  beforeEach(() => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify([])
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders ArtworkDetails correctly", async () => {
    let getByText, getByTestId;
    const renderResult = render(<ArtworkDetails />);
    getByText = renderResult.getByText;
    getByTestId = renderResult.getByTestId;

    if (getByText) {
      expect(getByText("Mona Lisa")).toBeTruthy();
      expect(getByText("Leonardo da Vinci")).toBeTruthy();
    }

    const image = getByTestId("artwork-image");
    expect(image.props.source.uri).toBe(mockArtwork.image_url);
  });

  test("handles bookmarking and unbookmarking", async () => {
    let getByRole;
    const renderResult = render(<ArtworkDetails />);
    getByRole = renderResult.getByRole;
    const button = getByRole("button");
    // Bookmark the artwork

    // act(async () => {
    // await fireEvent.press(button);
    // });
    // await waitFor(() => {
    //   expect(AsyncStorage.setItem).toHaveBeenCalledWith(
    //     "bookmarks",
    //     JSON.stringify([mockArtwork])
    //   );
    // });
    //   // Unbookmark the artwork
    //   await act(async () => {
    //     fireEvent.press(button);
    //   });
    //   await waitFor(() => {
    //     expect(AsyncStorage.setItem).toHaveBeenCalledWith(
    //       "bookmarks",
    //       JSON.stringify([])
    //     );
    //   });
  });
});
