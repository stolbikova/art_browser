import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import Bookmarks from "../src/components/Bookmarks";
import { useAppContext } from "../src/contexts/AppContext";
import { useNavigation } from "@react-navigation/native";

// Mock the useAppContext hook
jest.mock("../src/contexts/AppContext");
const mockedUseAppContext = useAppContext as jest.Mock;

// Mock the useNavigation hook
jest.mock("@react-navigation/native");
const mockedUseNavigation = useNavigation as jest.Mock;

const BOOKMARKS = [
  {
    id: 1,
    title: "Mona Lisa",
    image_id: "mock-image-id",
    is_public_domain: true,
    on_view: true,
    artist_display: "Leonardo da Vinci",
    image_url: "http://example.com/mona-lisa.jpg",
  },

  {
    id: 2,
    title: "Starry Night",
    image_id: "mock-image-id-2",
    is_public_domain: true,
    on_view: true,
    artist_display: "Vincent van Gogh",
    image_url: "http://example.com/starry-night.jpg",
  },
];
describe("Bookmarks Component", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    mockedUseNavigation.mockReturnValue({ navigate: mockNavigate });
    mockedUseAppContext.mockReturnValue({
      state: {
        bookmarks: new Map([
          [1, BOOKMARKS[0]],
          [2, BOOKMARKS[1]],
        ]),
      },
    });
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
