import React from "react";
import {
  fireEvent,
  act,
  waitFor,
  render,
  screen,
} from "@testing-library/react-native";

import { fetchArtworks } from "../src/services/api";
import { useAppContext } from "../src/contexts/AppContext";
import SearchPanel from "../src/components/SearchPanel";

const mockArtworks = [
  {
    id: 1,
    title: "Mona Lisa",
    artist_display: "Leonardo da Vinci",
    image_url: "http://example.com/mona-lisa.jpg",
    is_public_domain: false,
    is_on_view: false,
    image_id: "",
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
    const { getByPlaceholderText } = render(<SearchPanel loading={false} />);

    const searchInput = getByPlaceholderText("Search artworks");
    expect(searchInput).toBeTruthy();

    await act(() => {
      // Simulate a search action
      fireEvent.changeText(searchInput, "Mona Lisa");
      fireEvent(searchInput, "submitEditing");
    });

    await waitFor(() => {
      expect(searchInput.props.value).toBe("Mona Lisa");
    });
  });
});
