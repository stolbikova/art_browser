import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useNavigation } from "@react-navigation/native";

import ImagesList from "../src/components/ImagesList";
import { Artwork } from "../src/types";

jest.mock("@react-navigation/native");
const mockedUseNavigation = useNavigation as jest.Mock;

describe("ImagesList Component", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    mockedUseNavigation.mockReturnValue({ navigate: mockNavigate });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockArtworks: Artwork[] = [
    {
      id: 1,
      title: "Mona Lisa",
      image_id: "mock-image-id-1",
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

  test("renders artworks correctly", () => {
    const { getByTestId } = render(<ImagesList artworks={mockArtworks} />);

    mockArtworks.forEach((artwork) => {
      expect(getByTestId(`image-${artwork.id}`)).toBeTruthy();
    });
  });

  test("navigates to ArtworkDetails on image press", () => {
    const { getByTestId } = render(<ImagesList artworks={mockArtworks} />);

    fireEvent.press(getByTestId("image-1"));

    expect(mockNavigate).toHaveBeenCalledWith("ArtworkDetails", {
      artwork: mockArtworks[0],
    });
  });
});
