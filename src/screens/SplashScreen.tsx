import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, Dimensions } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function SplashScreen({ navigation }: any) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [token, setToken] = useState("");
  const { getItem } = useAsyncStorage("@token");

  async function getToken() {
    let token = await getItem();
    setToken(token != null ? token : "");
    setIsLoaded(true);
  }

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        if (token) {
          navigation.navigate("drawer");
        } else {
          navigation.navigate("onboardingScreen");
        }
      }, 8000);
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.splash}>
        <Image
          source={require("../assets/images/splash.png")}
          style={{
            width: 40,
            height: 150,
            padding: 60,
          }}
        />
      </View>
      <View>
        <Text style={styles.text}>Produced by Epinux - NG</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "#5956E9",
    flex: -1,
    padding: 20,
    fontFamily: "Inter",
    fontSize: 14,
  },
  splash: {
    marginTop: 40,
    position: "relative",
    top: 220,
  },
});
