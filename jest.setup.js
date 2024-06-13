import "@testing-library/jest-native/extend-expect";
import "react-native-gesture-handler/jestSetup";
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

import {
  toBeEmptyElement,
  toHaveTextContent,
} from "@testing-library/jest-native";

expect.extend({ toBeEmptyElement, toHaveTextContent });

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

jest.mock("./src/services/api", () => ({
  fetchArtworks: jest.fn(),
}));

jest.mock("./src/contexts/AppContext", () => {
  const originalModule = jest.requireActual("./src/contexts/AppContext");
  return {
    ...originalModule,
    useAppContext: jest.fn(() => ({
      state: {
        query: "",
        page: 1,
        publicDomain: false,
        onView: false,
        bookmarks: new Map(),
      },
      setState: jest.fn(),
    })),
  };
});

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
