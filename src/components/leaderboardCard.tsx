import { HStack, Text, VStack, Avatar, Box } from "native-base";
import React, { FC } from "react";

const LeaderboardCard: FC<any> = () => {
  return (
    <HStack
      borderWidth={1}
      borderColor=" #EAEFF7"
      mt={2}
      borderRadius={5}
      justifyContent="space-between"
      px={2}
      pb={2}
      w="100%"
    >
      <HStack justifyContent="space-around" mt={4}>
        <HStack justifyContent="space-between">
          <Text
            p={1}
            fontSize="sm"
            textAlign="center"
            fontWeight="medium"
            mr={4}
          >
            1
          </Text>
          <Avatar
            source={{ uri: "https://ui-avatars.com/api/?name=emma+clothe" }}
            size={30}
          />
        </HStack>
        <VStack ml={4}>
          <Text fontSize={12} fontWeight="bold">
            Ifeoma Agu
          </Text>
          <Text fontSize={9}>Points: 41,000</Text>
        </VStack>
      </HStack>
      <HStack justifyContent="space-between">
        <VStack alignItems="center">
          <Box
            w={4}
            bg="yellow.400"
            mx={1}
            h={4}
            borderBottomRightRadius={25}
            borderBottomLeftRadius={25}
          ></Box>
          <Text fontSize={10} mt={2}>
            5
          </Text>
        </VStack>
        <VStack alignItems="center">
          <Box
            w={4}
            bg="#C0C0C0"
            mx={1}
            h={4}
            borderBottomRightRadius={25}
            borderBottomLeftRadius={25}
          ></Box>
          <Text fontSize={10} mt={2}>
            5
          </Text>
        </VStack>
        <VStack alignItems="center">
          <Box
            w={4}
            mx={1}
            bg="#935F3F"
            h={4}
            borderBottomRightRadius={25}
            borderBottomLeftRadius={25}
          ></Box>
          <Text fontSize={10} mt={2}>
            5
          </Text>
        </VStack>
      </HStack>
    </HStack>
  );
};

export default LeaderboardCard