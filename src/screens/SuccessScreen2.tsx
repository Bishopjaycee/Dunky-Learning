import React, { useEffect, useState } from "react";
import { Box, Heading, Text, Button, Image, VStack, Center } from "native-base";
import { db } from "../util/firebase";
import { ActivityIndicator } from "react-native";
import { useUser } from "./../util/use-user";

export default function SuccessScreen2(props: any) {
  const [reg, setReg] = useState("");
  const [loading, setLoading] = useState(true);
  const { userId, userRole, userName, getUserRole, isLoading, userReg } =
    useUser();

  async function getData() {
    const doc = await db.collection(`${userRole}s`).doc(userId).get();
    setReg(doc.data()?.regNo);
    setLoading(false);
  }

  useEffect(() => {
    getUserRole();
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      getData();
    }
    return () => {
      getData();
    };
  }, [loading]);

  return !loading ? (
    <Box
      p={5}
      d="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      pt={20}
    >
      <VStack w="100%" alignItems="center" justifyContent="center">
        {userRole == "student" ? (
          <Image
            source={require("../assets/images/balloon.png")}
            alt="balloon"
            size={80}
          />
        ) : (
          <Image
            source={require("../assets/images/teacherSuccess.png")}
            alt="teachers"
            ml={8}
            w="330px"
            h="250px"
          />
        )}
      </VStack>
      <Heading my={10} color="brand.primary" fontWeight="bold">
        {`Hey, ${userName?.split(" ")[0] ?? ""}!`}
      </Heading>
      {userRole == "student" ? (
        <>
          <Text textAlign="center">
            Welcome to Dunky, your profile has been successfully created!
          </Text>
          <Text textAlign="center">
            User ID:{" "}
            <Text color="brand.primary" fontWeight="bold">
              {userReg || reg}
            </Text>
          </Text>
        </>
      ) : (
        <Text textAlign="center">
          Get started connecting and creating assignments for your students.
        </Text>
      )}
      <Button
        variant="solid"
        bg={"brand.primary"}
        color="white"
        mb={7}
        mt={20}
        mx={5}
        w="100%"
        _pressed={{ backgroundColor: "brand.bg1" }}
        onPress={() => props.navigation.navigate("drawer")}
      >
        Finish Up
      </Button>
    </Box>
  ) : (
    <Box pb={40}>
      <Center mt={320}>
        <ActivityIndicator color="#5956E9" size="large" />
        <Text my={4} opacity={0.4}>
          calculating ...
        </Text>
      </Center>
    </Box>
  );
}
