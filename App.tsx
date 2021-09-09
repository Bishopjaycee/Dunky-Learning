import React from "react";
import { View, Dimensions } from "react-native";
import { useFonts } from "expo-font";
import Apploading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
// import NetInfo from "@react-native-community/netinfo";
import { useEffect } from "react";
import { useUser } from "./src/util/use-user";

export default function App(props: any) {
  let [fontsLoaded, error] = useFonts({
    Inter: require("./src/assets/fonts/inter.ttf"),
  });

  const { userToken, getUserRole } = useUser();

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        // Load fonts
        const token = await userToken();

        if (token) {
          SplashScreen.hideAsync();
          props.navigation.navigate("drawer");
        } else {
          SplashScreen.hideAsync();
          props.navigation.navigate("onboardingScreen");
        }
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        SplashScreen.hideAsync();
      }
    }
    getUserRole();
    loadResourcesAndDataAsync();
  }, []);

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
      >
        <Apploading />
      </View>
    );
  } else {
    return null;
  }
}
