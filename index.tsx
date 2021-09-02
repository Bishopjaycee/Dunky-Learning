import React, { useEffect } from "react";
// import { useNetInfo } from "@react-native-community/netinfo";
import { extendTheme, NativeBaseProvider } from "native-base";
import { registerRootComponent } from "expo";
import App from "./App";
import { enableScreens } from "react-native-screens";

const newColorTheme = {
  brand: {
    error: "#ff2442",
    success: "#00CD8B",
    text: "#20303C",
    primary: "#5956E9",
    bg2: "rgba(134, 134, 134, 0.5)",
    bg1: "#D9D9F9",
  },
  primary: { 600: "#5956E9" },
};

const fontConfig = {
  Inter: {
    100: {
      normal: "Inter",
    },
  },
};

// Make sure values below matches any of the keys in `fontConfig`
const fonts = {
  heading: "Inter",
  body: "Inter",
  mono: "Inter",
};

const theme = extendTheme({
  colors: newColorTheme,
  fontConfig: fontConfig,
  fonts: fonts,
});
enableScreens();

export default function Index() {
  return (
    <NativeBaseProvider theme={theme}>
      <App />
    </NativeBaseProvider>
  );
}

registerRootComponent(Index);
