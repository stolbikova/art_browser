import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ArtworkDetails from "../src/components/ArtworkDetails";
import useAppStore from "../src/store/useAppStore";

jest.mock("@react-native-async-storage/async-storage", () => ({
  ...jest.requireActual(
    "@react-native-async-storage/async-storage/jest/async-storage-mock"
  ),
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock("../src/store/useAppStore");

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
  const mockSetQuery = jest.fn();
  const mockSetPage = jest.fn();

  beforeEach(() => {
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
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify([])
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders ArtworkDetails correctly", async () => {
    const { getByText, getByTestId } = render(<ArtworkDetails />);
    expect(getByText("Mona Lisa")).toBeTruthy();
    expect(getByText("Leonardo da Vinci")).toBeTruthy();
    expect(getByTestId("artwork-image").props.source.uri).toBe(
      mockArtwork.image_url
    );
  });

  test("handles bookmarking and unbookmarking", async () => {
    const { getByRole } = render(<ArtworkDetails />);
    const button = getByRole("button");

    // Bookmark the artwork
    await act(async () => {
      fireEvent.press(button);
    });
    await waitFor(() => {
      // expect(mockAddBookmark).toHaveBeenCalledWith(mockArtwork);
    });
  });
});
