import React from "react";
import { fireEvent, act } from "@testing-library/react-native";

import ArtworksList from "../src/components/ArtworksList";
import { render } from "../src/helpers/test-utils";
import { fetchArtworks } from "../src/services/api";

import { useAppContext } from "../src/contexts/AppContext";

const mockArtworks = [
  {
    id: 1,
    title: "Mona Lisa",
    artist_display: "Leonardo da Vinci",
    image_url: "http://example.com/mona-lisa.jpg",
  },
];

const mockSetState = jest.fn();

describe("ArtworksList Component", () => {
  beforeEach(() => {
    (fetchArtworks as jest.Mock).mockResolvedValue({ data: mockArtworks });
    (useAppContext as jest.Mock).mockReturnValue({
      state: { query: "", page: 1, publicDomain: false, onView: false },
      setState: mockSetState,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders ArtworksList correctly", async () => {
    const { getByPlaceholderText, getByText } = render(<ArtworksList />);

    const searchInput = getByPlaceholderText("Search artworks");
    expect(searchInput).toBeTruthy();

    act(async () => {
      // Simulate a search action
      fireEvent.changeText(searchInput, "Mona Lisa");
      fireEvent(searchInput, "submitEditing");
    });
  });
});
