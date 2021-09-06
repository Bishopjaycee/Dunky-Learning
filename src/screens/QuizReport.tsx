import React, { FC, useEffect, useState } from "react";
import { VStack, Text, Circle, HStack, Button, Image, Icon } from "native-base";
import { Feather, Foundation } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import { useUser } from "./../util/use-user";

interface QuizReportProps {
  navigation: any;
  route: any;
}

const QuizReport: FC<QuizReportProps> = ({ navigation, route }) => {
  const { correct, wrong, dunkEarned } = route.params;

  const { userRole } = useUser();

  console.log(correct, wrong, dunkEarned, "from report");
  return userRole ? (
    <VStack alignItems="center" py={4} bg="white" px={10} pb={8} h="100%">
      <Text fontWeight="bold" mt={8} fontSize={26}>
        Quiz Report
      </Text>
      <Circle overflow="hidden" bg=" #D9D9F9" p={2} h="200px" w="200px" mt={6}>
        <Image
          source={require("../assets/images/chemistry.png")}
          alt={"title"}
          rounded="lg"
          h="100px"
          w="100px"
        />
      </Circle>
      <Text fontWeight="bold" fontSize={24} my={2}>
        Chemistry
        <Feather name="check" size={24} color="green" />
      </Text>
      <Text fontWeight="bold" fontSize={18} my={4}>
        <Icon as={<Foundation name="star" />} size={6} color="yellow.500" />
        {"  "}
        98%
      </Text>
      <VStack w="100%" mb={4} pl={1}>
        <HStack justifyContent="space-between" my={1}>
          <Text fontSize={14} opacity={0.7}>
            Remark
          </Text>
          <Text textAlign="left" w="100px" fontWeight="bold" color="yellow.500">
            Excellent
          </Text>
        </HStack>
        <HStack justifyContent="space-between" my={1}>
          <Text fontSize={14} opacity={0.7}>
            Correct Answers
          </Text>
          <Text textAlign="left" w="100px" fontWeight="bold">
            29
          </Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text fontSize={14} opacity={0.7}>
            Wrong Answers
          </Text>
          <Text textAlign="left" my={1} w="100px" fontWeight="bold">
            1
          </Text>
        </HStack>
        <HStack justifyContent="space-between" my={1}>
          <Text fontSize={14} opacity={0.7}>
            Dunks Earned
          </Text>
          <Text textAlign="left" w="100px" fontWeight="bold">
            1000
          </Text>
        </HStack>
      </VStack>
      <VStack
        justifyContent="space-between"
        alignItems="flex-end"
        w="100%"
        ml={2}
        mb={10}
      >
        {userRole == "student" && (
          <>
            <Button
              variant="solid"
              bg="brand.primary"
              color="white"
              mb={4}
              w="100%"
              _pressed={{ backgroundColor: "brand.bg1" }}
              onPress={() => navigation.navigate("index")}
            >
              Take Another Quiz
            </Button>
            <Button
              variant="outline"
              borderColor="brand.primary"
              borderWidth={2}
              color="white"
              bg="white"
              mb={4}
              w="100%"
              _pressed={{ backgroundColor: "brand.bg1" }}
              _text={{ color: "brand.primary" }}
              onPress={() => navigation.navigate("homeScreen")}
            >
              Back to Home
            </Button>
          </>
        )}
        {userRole == "parent" && (
          <Button
            variant="solid"
            bg="brand.primary"
            color="white"
            w="306px"
            mt={10}
            alignSelf="center"
            _pressed={{ backgroundColor: "brand.bg1" }}
            onPress={() => navigation.navigate("make-remark")}
          >
            Make a Remark
          </Button>
        )}
      </VStack>
    </VStack>
  ) : (
    <VStack justifyContent="center" alignItems="center" mt={20} p={20}>
      <ActivityIndicator size="large" color="#5956E9" />
    </VStack>
  );
};
export default QuizReport;
