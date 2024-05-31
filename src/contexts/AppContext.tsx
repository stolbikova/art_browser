import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Artwork } from "../types";

interface AppState {
  query: string;
  page: number;
  publicDomain: boolean;
  onView: boolean;

  bookmarks: Map<number, Artwork>;
}

interface AppContextProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

const defaultState: AppState = {
  query: "",
  page: 1,
  publicDomain: false,
  onView: false,
  bookmarks: new Map(),
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(defaultState);

  useEffect(() => {
    AsyncStorage.getItem("bookmarks").then((bookmarks) => {
      bookmarks = bookmarks ? JSON.parse(bookmarks) : [];
      if (Array.isArray(bookmarks)) {
        const bookmarksMap = new Map(
          bookmarks.map((item: Artwork) => [item.id, item])
        );
        setState((prev) => ({
          ...prev,
          bookmarks: bookmarksMap,
        }));
      }
    });
  });

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
