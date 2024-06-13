import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import Bookmarks from "../src/components/Bookmarks";
import useAppStore from "../src/store/useAppStore";
import { useNavigation } from "@react-navigation/native";

// Mock the useNavigation hook
jest.mock("@react-navigation/native");
const mockedUseNavigation = useNavigation as jest.Mock;

const BOOKMARKS = [
  {
    id: 1,
    title: "Mona Lisa",
    image_id: "mock-image-id",
    is_public_domain: true,
    is_on_view: true,
    artist_display: "Leonardo da Vinci",
    image_url: "http://example.com/mona-lisa.jpg",
  },
  {
    id: 2,
    title: "Starry Night",
    image_id: "mock-image-id-2",
    is_public_domain: true,
    is_on_view: true,
    artist_display: "Vincent van Gogh",
    image_url: "http://example.com/starry-night.jpg",
  },
];

describe("Bookmarks Component", () => {
  const mockNavigate = jest.fn();
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
      bookmarks: new Map(BOOKMARKS.map((item) => [item.id, item])),
    });

    mockedUseNavigation.mockReturnValue({ navigate: mockNavigate });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders bookmarked artworks correctly", async () => {
    const { getByTestId } = render(<Bookmarks />);
    expect(getByTestId("image-1")).toBeTruthy();
    expect(getByTestId("image-2")).toBeTruthy();
  });

  test("navigates to ArtworkDetails on item press", async () => {
    const { getByTestId } = render(<Bookmarks />);
    act(() => {
      fireEvent.press(getByTestId("image-1"));
    });
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("ArtworkDetails", {
        artwork: BOOKMARKS[0],
      });
    });
  });
});
