import "@testing-library/jest-native/extend-expect";
import "react-native-gesture-handler/jestSetup";
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
// import { act } from "@testing-library/react-native";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

jest.mock("./src/services/api", () => ({
  fetchArtworks: jest.fn(),
}));

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: jest.fn(),
    useRoute: jest.fn().mockReturnValue({
      params: {
        artwork: {
          id: 1,
          title: "Mona Lisa",
          image_id: "mock-image-id",
          is_public_domain: true,
          on_view: true,
          artist_display: "Leonardo da Vinci",
          image_url: "http://example.com/mona-lisa.jpg",
        },
      },
    }),
  };
});

jest.mock("./src/store/useAppStore", () => {
  const create = require("zustand").create;

  const mockStore = {
    query: "",
    page: 1,
    publicDomain: false,
    onView: false,
    artworks: [],
    bookmarks: new Map(),
    loading: false,
    setQuery: jest.fn(),
    setPage: jest.fn(),
    setPublicDomain: jest.fn(),
    setOnView: jest.fn(),
    addBookmark: jest.fn(),
    removeBookmark: jest.fn(),
    initializeBookmarks: jest.fn(),
    loadArtworks: jest.fn(),
  };

  const useStore = create(() => mockStore);

  useStore.setState = (state) => {
    // act(() => {
    Object.assign(mockStore, state);
    // });
  };

  return {
    __esModule: true,
    default: useStore,
  };
});
