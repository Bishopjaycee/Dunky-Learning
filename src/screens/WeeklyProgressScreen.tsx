import React, { FC, useEffect, useState } from "react";
import {
  VStack,
  Text,
  Pressable,
  Box,
  Heading,
  HStack,
  Button,
  ScrollView,
  PresenceTransition,
} from "native-base";
import { Entypo } from "@expo/vector-icons";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Easing } from "react-native-reanimated";
import ProgressCard from "../components/wkProgressCard";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";

interface LeardershipBoardProps {
  navigation: any;
}
const WeeklyProgress: FC<LeardershipBoardProps> = ({ navigation }) => {
  const [switcher, setSwitcher] = useState("completed");
  const [role, setRole] = useState("");
  const [isLoaded, setIsloaded] = useState(false);
  const { getItem } = useAsyncStorage("@role");

  async function getRole() {
    try {
      let role = await getItem();
      setRole(role as string);
      setIsloaded(true);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getRole();
  }, [role]);

  return isLoaded ? (
    <VStack bg="white" h="100%" px={2} pt={10} pb={4}>
      <Pressable
        onPress={() => navigation.goBack()}
        pos="absolute"
        bg="brand.primary"
        pl={8}
        top={10}
        p={2}
        zIndex={2}
        roundedBottomRight="xl"
        roundedTopRight="xl"
      >
        <Entypo
          name="chevron-with-circle-left"
          size={24}
          color="white"
          style={{ marginLeft: 8 }}
        />
      </Pressable>
      <Heading textTransform="capitalize" textAlign="center" mt={4}>
        WEEKLY Progress
      </Heading>
      <VStack
        justifyContent="center"
        alignItems="center"
        borderRadius={10}
        borderWidth={1}
        p={4}
        mx={5}
        my={6}
        borderColor="gray.300"
      >
        <Text mb={4}>Total Done</Text>
        <AnimatedCircularProgress
          size={100}
          width={20}
          fill={46}
          easing={Easing.out(Easing.ease)}
          tintColor="#5956E9"
          backgroundColor="#D9D9F9"
          arcSweepAngle={270}
        >
          {(fill) => (
            <>
              <Text fontSize={12}>{fill}%</Text>
              <Text fontSize={["8px"]} opacity={0.7}>
                Done
              </Text>
            </>
          )}
        </AnimatedCircularProgress>
        <HStack mt={4}>
          <Box w={4} h={4} bg="brand.primary" borderRadius={5} mx={1} />
          <Box w={4} h={4} bg="brand.bg1" borderRadius={5} mx={1} />
        </HStack>
      </VStack>
      <HStack
        bg="#F4F4F4"
        justifyContent="space-around"
        borderWidth={1}
        borderRadius={5}
        borderColor="gray.200"
        mx={5}
        px={2}
      >
        <PresenceTransition
          visible={true}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,

            transition: {
              duration: 850,
            },
          }}
        >
          <Button
            _pressed={{ bg: "white", color: "brand.primary", shadow: 2 }}
            shadow={switcher == "completed" ? 2 : -1}
            my={2}
            h="10px"
            w="130px"
            p={5}
            onPress={() => setSwitcher("completed")}
            bg={switcher == "completed" ? "white" : "#F4F4F4"}
            _text={{
              textAlign: "center",
              color: switcher == "completed" ? "brand.primary" : "black",
            }}
          >
            Completed
          </Button>
        </PresenceTransition>
        <PresenceTransition
          visible={true}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 550,
            },
          }}
        >
          <Button
            shadow={switcher == "quiz-result" ? 2 : -1}
            bg={switcher == "quiz-result" ? "white" : "#F4F4F4"}
            _pressed={{ bg: "white", color: "brand.primary", shadow: 2 }}
            my={2}
            h="10px"
            w="140px"
            p={5}
            onPress={() => setSwitcher("quiz-result")}
            _text={{
              textAlign: "center",
              color: switcher == "quiz-result" ? "brand.primary" : "black",
            }}
          >
            Quiz Results
          </Button>
        </PresenceTransition>
      </HStack>
      <VStack h={role == "parent" ? "240px" : "300px"}>
        <ScrollView
          h="300px"
          mx={5}
          mt={6}
          showsVerticalScrollIndicator={false}
          bg="white"
        >
          {switcher == "completed" ? (
            <>
              <ProgressCard />
              <ProgressCard />
              <ProgressCard />
              <ProgressCard />
              <ProgressCard />
              <ProgressCard />
            </>
          ) : (
            <>
              <ProgressCard />
              <ProgressCard />
              <ProgressCard />
              <ProgressCard />
            </>
          )}
        </ScrollView>
      </VStack>
      {role == "parent" && switcher == "completed" && (
        <Button
          variant="solid"
          bg="brand.primary"
          color="white"
          w="306px"
          mt={10}
          alignSelf="center"
          _pressed={{ backgroundColor: "brand.bg1" }}
          onPress={() => navigation.navigate("quiz-report")}
        >
          Make a Remark
        </Button>
      )}
    </VStack>
  ) : (
    <VStack justifyContent="center" alignItems="center" mt={20} p={20}>
      <ActivityIndicator size="large" color="#5956E9" />
    </VStack>
  );
};

export default WeeklyProgress;
