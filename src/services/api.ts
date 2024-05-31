import axios from "axios";

import { Artwork } from "../types";

const API_URL = "https://api.artic.edu/api/v1/artworks/search";
const FIELDS =
  "id,title,artist_display,date_display,main_reference_number,image_id,is_on_view";
const IIIF_URL = "https://www.artic.edu/iiif/2/";

interface ApiResponse {
  data: Artwork[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
    next_url: string;
  };
}

export const fetchArtworks = async (
  query: string,
  page: number,
  publicDomain?: boolean,
  onView?: boolean
): Promise<ApiResponse> => {
  try {
    const params: any = {
      q: query,
      page,
      fields: FIELDS,
    };

    if (publicDomain !== undefined) {
      params["query[term][is_public_domain]"] = publicDomain;
    }

    const response = await axios.get<ApiResponse>(API_URL, { params });

    // Mapping the data to include the image_url
    const mappedResponse: ApiResponse = {
      ...response.data,
      data: response.data.data
        // filter it on client because there is an error while quering by is on view field
        .filter((item) => item.is_on_view === onView)
        .map((item) => ({
          ...item,
          image_url: `${IIIF_URL}${item.image_id}/full/843,/0/default.jpg`,
        })),
    };

    return mappedResponse;
  } catch (error) {
    console.error("Error fetching artworks:", error);
    throw error;
  }
};
