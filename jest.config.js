module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@expo|expo(nent)?|@expo(nent)?/.*|react-navigation|react-native-gesture-handler|react-native-safe-area-context|@react-native-community|@unimodules|unimodules)",
  ],
  testPathIgnorePatterns: ["/node_modules/", "/android/", "/ios/"],
};
