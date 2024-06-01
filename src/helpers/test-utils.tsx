import React, { ReactNode } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { render, RenderOptions } from "@testing-library/react-native";
import { AppProvider } from "../contexts/AppContext";

interface AllProvidersProps {
  children: ReactNode;
}

const AllProviders: React.FC<AllProvidersProps> = ({ children }) => (
  <AppProvider>
    <NavigationContainer>{children}</NavigationContainer>
  </AppProvider>
);

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react-native";
export { customRender as render };
