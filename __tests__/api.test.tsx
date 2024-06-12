import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const { fetchArtworks } = jest.requireActual("../src/services/api");
import { Artwork } from "../src/types";

const mockArtwork: Artwork = {
  id: 1,
  title: "Mona Lisa",
  image_id: "mock-image-id",
  is_public_domain: true,
  is_on_view: true,
  artist_display: "Leonardo da Vinci",
};

const mockResponse = {
  data: [mockArtwork],
  pagination: {
    total: 1,
    limit: 10,
    offset: 0,
    total_pages: 1,
    current_page: 1,
    next_url: null,
  },
};

const API_URL = "https://api.artic.edu/api/v1/artworks/search";
const IMAGE_URL =
  "https://www.artic.edu/iiif/2/mock-image-id/full/843,/0/default.jpg";

describe("fetchArtworks", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it("fetches and maps artworks correctly", async () => {
    mock.onGet(API_URL).reply(200, mockResponse);

    const result = await fetchArtworks("Mona Lisa", 1, true, true);

    expect(result.data).toHaveLength(1);
    expect(result.data[0]).toMatchObject({
      ...mockArtwork,
      image_url: IMAGE_URL,
    });
  });

  it("filters artworks correctly by onView", async () => {
    const responseWithDifferentOnView = {
      data: [
        { ...mockArtwork, is_on_view: true },
        { ...mockArtwork, id: 2, is_on_view: false },
      ],
      pagination: {
        total: 2,
        limit: 10,
        offset: 0,
        total_pages: 1,
        current_page: 1,
        next_url: null,
      },
    };
    mock.onGet(API_URL).reply(200, responseWithDifferentOnView);

    const result = await fetchArtworks("Mona Lisa", 1, true, true);

    expect(result.data).toHaveLength(1);
    expect(result.data[0]).toMatchObject({
      ...mockArtwork,
      image_url: IMAGE_URL,
    });
  });

  it("handles errors correctly", async () => {
    mock.onGet(API_URL).reply(500);

    await expect(fetchArtworks("Mona Lisa", 1, true, true)).rejects.toThrow(
      "Request failed with status code 500"
    );
  });
});
