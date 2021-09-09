import {
  VStack,
  Box,
  Avatar,
  Heading,
  Text,
  HStack,
  Pressable,
  Icon,
  Circle,
  Spinner,
} from "native-base";
import React, { FC, useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useUser } from "./../util/use-user";
import { db } from "../util/firebase";

interface OptionProps {
  icon: any;
  text: string;
  path: string;
}

const options: OptionProps[] = [
  {
    icon: "edit",
    text: "Edit Profile",
    path: "edit",
  },
  {
    icon: "settings",
    text: "General",
    path: "general",
  },
  {
    icon: "bell",
    text: "Notifications",
    path: "notifications",
  },
  {
    icon: "shield",
    text: "Security",
    path: "security",
  },
  {
    icon: "share-2",
    text: "Invite Friends",
    path: "invitation",
  },
  {
    icon: "alert-triangle",
    text: "Report an Issue",
    path: "report",
  },
];

interface SettingProp {
  navigation: any;
}

const SettingScreen: FC<SettingProp> = ({ navigation }) => {
  // const [reg, setReg] = useState("");
  const [loading, setLoading] = useState(true);
  const { userReg, userRole, userName, getUserRole, userId } = useUser();

  // async function getData() {
  //   const doc = await db.collection(`${userRole}s`).doc(userId).get();
  //   setReg(doc.data()?.regNo);
  // }

  // useEffect(() => {
  //   getUserRole();
  //   getData().then(() => {
  //     setLoading(false);
  //   });
  //   return () => {
  //     getData();
  //   };
  // }, []);

  useEffect(() => {
    const unsubscribed = navigation.addListener("onPress", (e: any) => {
      e.preventDefault();
    });
    return () => unsubscribed;
  }, [navigation]);

  return (
    <VStack alignItems="center" h="100%" bg="rgba(249, 249, 251, 0.8)">
      <Box bg="white" h="10%" w="100%" p={2} />
      <VStack alignItems="center" mb={4} mt={-5}>
        <Avatar
          source={require("../assets/images/trophy.png")}
          pos="relative"
          size="lg"
          top={8}
          zIndex={2}
        />
        <Box bg="brand.bg1" w={300} borderRadius={20} pt={10} px={8} pb={6}>
          <Heading textAlign="center" fontSize={20} mb={4}>
            {userName}
          </Heading>
          <Text textAlign="center" fontSize={12}>
            Account Type:{" "}
            <Text color="green.600" textTransform="capitalize">
              {userRole}
            </Text>
          </Text>
          {userRole == "student" && (
            <>
              {!loading ? (
                <Text textAlign="center" mb={4}>
                  User ID: {userReg}
                </Text>
              ) : (
                <Spinner
                  size="sm"
                  accessibilityLabel="Loading your reg number"
                  color="primary.600"
                />
              )}
            </>
          )}
        </Box>
      </VStack>
      <Box mt={2} w="100%">
        {options.map((item: OptionProps, index: number) => (
          <Pressable
            onPress={() => {
              navigation.navigate("settingScreen", { screen: item.path });
            }}
            h="50px"
            mx={6}
            mt={1}
            mb={3}
            key={index}
          >
            <HStack
              justifyContent="space-between"
              alignItems="center"
              py={1}
              bg="white"
              px={3}
              shadow={5}
              rounded={10}
            >
              <HStack py={2} mx={2} justifyContent="space-evenly">
                <Circle bg="brand.bg1" rounded="full" w="30px" h="30px">
                  <Feather name={item.icon} size={20} color="#5956E9" />
                </Circle>
                <Text mx={2} my={1} fontFamily="Inter" fontWeight="500">
                  {item.text}
                </Text>
              </HStack>

              <Icon
                as={<Feather name="chevron-right" size={24} color="black" />}
              />
            </HStack>
          </Pressable>
        ))}
      </Box>
    </VStack>
  );
};

export default SettingScreen;
