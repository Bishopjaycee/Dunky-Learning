import React, { useState, useEffect } from "react";
import { Box, Center, Text, PresenceTransition } from "native-base";
import { ActivityIndicator } from "react-native";
import firebase from "firebase/app";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export default function WaitingScreen(props: any) {
  const [user, setUser] = useState(null) as any;
  const { getItem } = useAsyncStorage("@user");
  const [show, setShow] = useState(false);

  async function getUser() {
    let storedUser = await getItem();
    storedUser = JSON.parse(storedUser as string);
    let user = firebase.auth().currentUser;
    setUser(storedUser ?? (user as any));
  }
  useEffect(() => {
    setInterval(() => {
      setShow(!show);
    }, 5000);
  });
  useEffect(() => {
    getUser();
    if (user) {
      props.navigation.navigate("Home");
    }
  });
  return (
    <Box w="100%" h="100%" p={10}>
      <Center pos="relative" top={300}>
        <ActivityIndicator size="large" color="#5956E9" />
        {show && (
          <PresenceTransition
            visible={show}
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: 250,
              },
            }}
          >
            <Text mt={10} textAlign="center" opacity={0.5} fontSize="xs">
              Setting things up ...
            </Text>
          </PresenceTransition>
        )}
      </Center>
    </Box>
  );
}
