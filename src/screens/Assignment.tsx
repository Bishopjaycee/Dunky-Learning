import React, { FC, useState } from "react";
import {
  VStack,
  Pressable,
  Heading,
  HStack,
  Button,
  ScrollView,
  Image,
} from "native-base";
import { Entypo } from "@expo/vector-icons";

import AssignmentCard from "../components/assignmentCard";

interface AssignmentProps {
  navigation: any;
}
const Assignment: FC<AssignmentProps> = ({ navigation }) => {
  const [switcher, setSwitcher] = useState("completed");
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
      <VStack p={4} mx={10} my={6} justifyContent="center" alignItems="center">
        <Image
          source={require("../assets/images/homework.png")}
          alt="assignment"
          w="200px"
          h="200px"
        />
      </VStack>
      <HStack
        bg="#F4F4F4"
        justifyContent="space-between"
        borderWidth={1}
        borderRadius={5}
        borderColor="gray.200"
        mx={5}
        px={2}
      >
        <Button
          _pressed={{ bg: "white", color: "brand.primary", shadow: 2 }}
          shadow={switcher == "completed" ? 2 : -1}
          my={2}
          h="10px"
          w="90px"
          py={5}
          px={2}
          onPress={() => setSwitcher("completed")}
          bg={switcher == "completed" ? "white" : "#F4F4F4"}
          _text={{
            textAlign: "center",
            color: switcher == "completed" ? "brand.primary" : "black",
            fontSize: 12,
          }}
        >
          Completed
        </Button>
        <Button
          shadow={switcher == "pending" ? 2 : -1}
          bg={switcher == "pending" ? "white" : "#F4F4F4"}
          _pressed={{ bg: "white", color: "brand.primary", shadow: 2 }}
          my={2}
          h="10px"
          w="90px"
          p={5}
          onPress={() => setSwitcher("pending")}
          _text={{
            textAlign: "center",
            color: switcher == "pending" ? "brand.primary" : "black",
            fontSize: 12,
          }}
        >
          Pending
        </Button>
        <Button
          shadow={switcher == "new" ? 2 : -1}
          bg={switcher == "new" ? "white" : "#F4F4F4"}
          _pressed={{ bg: "white", color: "brand.primary", shadow: 2 }}
          my={2}
          h="10px"
          w="90px"
          p={5}
          onPress={() => setSwitcher("new")}
          _text={{
            textAlign: "center",
            color: switcher == "new" ? "brand.primary" : "black",
            fontSize: 12,
          }}
        >
          New
        </Button>
      </HStack>
      <ScrollView
        h="300px"
        mx={5}
        mt={6}
        showsVerticalScrollIndicator={false}
        bg="white"
      >
        {switcher == "completed" ? (
          <HStack flexWrap="wrap">
            <Pressable onPress={() => navigation.pop()}>
              <AssignmentCard
                source={require("../assets/images/cloud-computing-1.png")}
                title="Upload Assignment"
              />
            </Pressable>
            <AssignmentCard title="Mathematics" status="completed" />
            <AssignmentCard title="English" status="completed" />
            <AssignmentCard title="Biology" status="completed" />
          </HStack>
        ) : switcher == "pending" ? (
          <HStack flexWrap="wrap">
            <AssignmentCard title="Mathematics" status="pending" />
            <AssignmentCard title="English" status="pending" />
          </HStack>
        ) : (
          <HStack flexWrap="wrap">
            <AssignmentCard title="English" status="new" />
            <AssignmentCard title="Biology" status="new" />
          </HStack>
        )}
      </ScrollView>
    </VStack>
  );
};

export default Assignment;
