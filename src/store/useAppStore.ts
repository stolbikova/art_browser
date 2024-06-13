import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Artwork } from "../types";
import { fetchArtworks } from "../services/api";

interface AppState {
  query: string;
  page: number;
  publicDomain: boolean;
  onView: boolean;
  artworks: Artwork[];
  bookmarks: Map<number, Artwork>;
  loading: boolean;
  setQuery: (query: string) => void;
  setPage: (page: number) => void;
  setPublicDomain: (publicDomain: boolean) => void;
  setOnView: (onView: boolean) => void;
  addBookmark: (artwork: Artwork) => void;
  removeBookmark: (id: number) => void;
  initializeBookmarks: () => void;
  loadArtworks: () => void;
}

const useAppStore = create<AppState>((set, get) => ({
  query: "",
  page: 1,
  publicDomain: false,
  onView: false,
  artworks: [],
  bookmarks: new Map(),
  loading: false,

  setQuery: (query) => set({ query }),
  setPage: (page) => set({ page }),
  setPublicDomain: (publicDomain) => set({ publicDomain }),
  setOnView: (onView) => set({ onView }),

  addBookmark: (artwork) =>
    set((state) => {
      const newBookmarks = new Map(state.bookmarks);
      newBookmarks.set(artwork.id, artwork);
      AsyncStorage.setItem(
        "bookmarks",
        JSON.stringify(Array.from(newBookmarks.values()))
      );
      return { bookmarks: newBookmarks };
    }),

  removeBookmark: (id) =>
    set((state) => {
      const newBookmarks = new Map(state.bookmarks);
      newBookmarks.delete(id);
      AsyncStorage.setItem(
        "bookmarks",
        JSON.stringify(Array.from(newBookmarks.values()))
      );
      return { bookmarks: newBookmarks };
    }),

  initializeBookmarks: async () => {
    const bookmarks = await AsyncStorage.getItem("bookmarks");
    const bookmarksMap = new Map<number, Artwork>();
    if (bookmarks) {
      JSON.parse(bookmarks).forEach((item: Artwork) => {
        bookmarksMap.set(item.id, item);
      });
    }
    set({ bookmarks: bookmarksMap });
  },

  loadArtworks: async () => {
    const { query, page, publicDomain, onView } = get();
    set({ loading: true });
    try {
      const data = await fetchArtworks(query, page, publicDomain, onView);
      set({ artworks: data.data, loading: false });
    } catch (error) {
      console.error("Error fetching artworks:", error);
      set({ loading: false });
    }
  },
}));

export default useAppStore;
