import "@testing-library/jest-native/extend-expect";
import "react-native-gesture-handler/jestSetup";
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

// Mock react-navigation's useRoute
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
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
