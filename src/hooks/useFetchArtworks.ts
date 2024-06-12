import { useState, useEffect } from "react";
import { Artwork } from "../types";
import { fetchArtworks } from "../services/api";
import { useAppContext } from "../contexts/AppContext";

const DEFAULT_PAGE = 1;

const useFetchArtworks = () => {
  const { state, setState } = useAppContext();

  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadArtworks(state.query, state.publicDomain, state.onView);
  }, [state.query, state.page, state.publicDomain, state.onView]);

  const loadArtworks = async (
    searchQuery: string,
    publicDomain?: boolean,
    onView?: boolean
  ) => {
    setLoading(true);
    const data = await fetchArtworks(
      searchQuery,
      state.page,
      publicDomain,
      onView
    );
    setArtworks(data.data as Artwork[]);
    setLoading(false);
  };

  const handleUpdateState = (type: string, value: any) => {
    setState((prev) => ({
      ...prev,
      [type]: value,
      ...(type !== "page" && { page: DEFAULT_PAGE }),
    }));
  };

  return { artworks, loading, handleUpdateState, state };
};

export default useFetchArtworks;
