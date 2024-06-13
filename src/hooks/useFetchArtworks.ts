import { useEffect } from "react";
import useAppStore from "../store/useAppStore";

const useFetchArtworks = () => {
  const {
    query,
    page,
    publicDomain,
    onView,
    artworks,
    loading,
    setQuery,
    setPage,
    setPublicDomain,
    setOnView,
    loadArtworks,
  } = useAppStore();

  useEffect(() => {
    loadArtworks();
  }, [query, page, publicDomain, onView]);

  const handleUpdateState = (type: string, value: any) => {
    switch (type) {
      case "query":
        setQuery(value);
        setPage(1);
        break;
      case "page":
        setPage(value);
        break;
      case "publicDomain":
        setPublicDomain(value);
        setPage(1);
        break;
      case "onView":
        setOnView(value);
        setPage(1);
        break;
    }
  };

  return {
    artworks,
    loading,
    handleUpdateState,
    query,
    page,
    publicDomain,
    onView,
  };
};

export default useFetchArtworks;
