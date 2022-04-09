import React, { FC, useState, useEffect } from "react";
import {
  VStack,
  Pressable,
  Heading,
  HStack,
  Button,
  ScrollView,
  PresenceTransition,
  Text,
  Box,
} from "native-base";
import { Entypo } from "@expo/vector-icons";
import AssignmentCard from "../components/assignmentCard";
import Svg, { Circle } from "react-native-svg";

interface TeacherAssignmentProps {
  navigation: any;
}
const TeacherAssignment: FC<TeacherAssignmentProps> = ({ navigation }) => {
  const [switcher, setSwitcher] = useState("assignment");
  const [radRange, setRadRange] = useState(0);
  const [submittedAssignment, setsubmittedAssignment] = useState([
    1, 2, 5, 66,
  ]) as any;
  const [allAssignments, setAllAssignment] = useState([2, 3]) as any;

  function calRange() {
    let percentage =
      (allAssignments.length / submittedAssignment.length) * 31.3;
    setRadRange(percentage);
  }

  useEffect(() => {
    calRange();
  }, [radRange, submittedAssignment.length, allAssignments.length]);

  return (
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
        My Assignments
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
        {/* 32 = 100%  0= 0%*/}
        <Text mb={4}>Student’s Summary</Text>
        {Radar(radRange)}
        <HStack mt={4} justifyContent="space-between">
          <Box w={4} h={4} bg="brand.primary" borderRadius={5} mx={1}></Box>
          <Text fontSize={11} textAlign="left">
            Assignments
          </Text>
          <Box w={4} h={4} bg="brand.bg1" borderRadius={5} mx={1} ml={2}></Box>
          <Text fontSize={11} textAlign="left">
            Submissions
          </Text>
        </HStack>
      </VStack>
      <HStack
        bg="#F4F4F4"
        justifyContent="space-between"
        borderWidth={1}
        borderRadius={5}
        borderColor="gray.200"
        mx={5}
        px={4}
      >
        <PresenceTransition
          visible={true}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 250,
            },
          }}
        >
          <Button
            _pressed={{ bg: "white", color: "brand.primary", shadow: 2 }}
            shadow={switcher == "assignment" ? 2 : -1}
            my={2}
            h="10px"
            w="120px"
            py={5}
            px={2}
            onPress={() => setSwitcher("assignment")}
            bg={switcher == "assignment" ? "white" : "#F4F4F4"}
            _text={{
              textAlign: "center",
              color: switcher == "assignment" ? "brand.primary" : "black",
              fontSize: 12,
            }}
          >
            All Assignments
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
              duration: 250,
            },
          }}
        >
          <Button
            shadow={switcher == "submission" ? 2 : -1}
            bg={switcher == "submission" ? "white" : "#F4F4F4"}
            _pressed={{ bg: "white", color: "brand.primary", shadow: 2 }}
            _focus={{ bg: "white" }}
            my={2}
            h="10px"
            w="120px"
            p={5}
            onPress={() => setSwitcher("submission")}
            _text={{
              textAlign: "center",
              color: switcher == "submission" ? "brand.primary" : "black",
              fontSize: 12,
            }}
          >
            Submission
          </Button>
        </PresenceTransition>
      </HStack>
      <ScrollView
        h="300px"
        px={4}
        mt={6}
        showsVerticalScrollIndicator={false}
        bg="white"
      >
        {switcher == "assignment" ? (
          <HStack flexWrap="wrap">
            <Pressable onPress={() => navigation.pop()}>
              <AssignmentCard
                source={require("../assets/images/cloud-computing-1.png")}
                title="Upload Assignment"
              />
            </Pressable>
            <AssignmentCard title="Mathematics" />
            <AssignmentCard title="English" />
            <AssignmentCard title="Biology" />
          </HStack>
        ) : (
          <HStack flexWrap="wrap">
            <AssignmentCard title="Mathematics" status="completed" />
            <AssignmentCard title="English" status="completed" />
          </HStack>
        )}
      </ScrollView>
    </VStack>
  );
};

export default TeacherAssignment;

function Radar(val = 8.99) {
  return (
    <Svg height="120" width="120" viewBox="0 0 20 20">
      <Circle
        r="10"
        cx="10"
        cy="10"
        fill="#D9D9F9"
        // stroke="grey"
        // strokeWidth={0.4}
      />
      <Circle
        r="5"
        cx="10"
        cy="10"
        fill="transparent"
        stroke="#5956E9"
        strokeWidth="10"
        strokeDasharray={`${val} 30.4`}
        transform="rotate(-90) translate(-20)"
      />
    </Svg>
  );
}
