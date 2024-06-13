import React from "react";
import { fireEvent, act, waitFor, render } from "@testing-library/react-native";

import { fetchArtworks } from "../src/services/api";
import useAppStore from "../src/store/useAppStore";
import SearchPanel from "../src/components/SearchPanel";

jest.mock("../src/services/api");
jest.mock("../src/store/useAppStore");

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

describe("SearchPanel Component", () => {
  const mockSetQuery = jest.fn();
  const mockSetPage = jest.fn();

  beforeEach(() => {
    (fetchArtworks as jest.Mock).mockResolvedValue({ data: mockArtworks });

    const useStore = useAppStore;

    useStore.setState({
      query: "",
      page: 1,
      publicDomain: false,
      onView: false,
      setQuery: mockSetQuery,
      setPage: mockSetPage,
      setPublicDomain: jest.fn(),
      setOnView: jest.fn(),
      loadArtworks: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders SearchPanel correctly", async () => {
    const { getByPlaceholderText } = render(<SearchPanel loading={false} />);

    const searchInput = getByPlaceholderText("Search artworks");
    expect(searchInput).toBeTruthy();

    await act(async () => {
      // Simulate a search action
      fireEvent.changeText(searchInput, "Mona Lisa");
      fireEvent(searchInput, "submitEditing");
    });

    await waitFor(() => {
      expect(searchInput.props.value).toBe("Mona Lisa");
    });
  });
});
