import React from "react";
import { View, Dimensions, ActivityIndicator, LogBox } from "react-native";
import { useFonts } from "expo-font";
// import Apploading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
// import NetInfo from "@react-native-community/netinfo";
import { useEffect } from "react";
import { useUser } from "./src/util/use-user";
import { VStack } from "native-base";

export default function App(props: any) {
  let [fontsLoaded, error] = useFonts({
    Inter: require("./src/assets/fonts/inter.ttf"),
  });

  const { userToken } = useUser();
  LogBox.ignoreLogs(["Setting a timer"]);
  useEffect(() => {
    // if (!fontsLoaded) SplashScreen.preventAutoHideAsync();
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        // Load fonts
        const token = await userToken();
        if (token) {
          SplashScreen.hideAsync();
          props.navigation.navigate("drawer");
        } else if (fontsLoaded && !token) {
          SplashScreen.hideAsync();
          props.navigation.navigate("onboardingScreen");
        }
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  return (
    <VStack justifyContent="center" alignItems="center" mt={20} p={20}>
      <ActivityIndicator size="large" color="#5956E9" />
    </VStack>
  );
  // }
}
