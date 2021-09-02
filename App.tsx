import React from "react";
import { View, Dimensions, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Apploading from "expo-app-loading";
import StackNavigation from "./src/navigation/stackNavigation";
import NetInfo from "@react-native-community/netinfo";
import { useEffect } from "react";

export default function App() {
  LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
  let [fontsLoaded, error] = useFonts({
    Inter: require("./src/assets/fonts/inter.ttf"),
  });
  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });

    // Unsubscribe
    return () => unsubscribe();
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
    return (
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    );
  }
}
