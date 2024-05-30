import axios from "axios";

const API_URL = "https://api.artic.edu/api/v1/artworks";

interface Artwork {
  id: number;
  title: string;
  image_id: string;
  is_public_domain: boolean;
  on_view: boolean;
}

interface ApiResponse {
  data: Artwork[];
  pagination: {
    total: number,
    limit: number,
    offset: number,
    total_pages: number,
    current_page: number,
    next_url: string,
  };
}

export const fetchArtworks = async (
  query: string,
  page: number,
  publicDomain?: boolean,
  onView?: boolean
): Promise<ApiResponse> => {
  const response =
    (await axios.get) <
    ApiResponse >
    (`${API_URL}`,
    {
      params: {
        q: query,
        page,
        is_public_domain: publicDomain,
        on_view: onView,
      },
    });
  return response.data;
};
