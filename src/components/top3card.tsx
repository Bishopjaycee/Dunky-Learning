import React, { FC, useEffect, useState } from "react";
import {
  Avatar,
  Circle,
  Heading,
  VStack,
  Box,
  Text,
  HStack,
} from "native-base";

interface TopsProps {
  rank: number;
}
const Top3Card: FC<TopsProps> = ({ rank }) => {
  return (
    <VStack
      alignItems="center"
      h={20}
      mx={rank == 1 ? 4 : 2}
      mt={rank != 1 ? 7 : 0}
    >
      <Circle
        zIndex={4}
        position="relative"
        top={rank == 1 ? 7 : 5}
        right={rank == 1 ? -22 : -18}
        w={rank == 1 ? "25px" : "20px"}
        h={rank == 1 ? "25px" : "20px"}
        bg={
          rank == 2
            ? "#C0C0C0"
            : rank == 3
            ? "#935F3F"
            : rank == 1
            ? "yellow.400"
            : "transparent"
        }
      >
        <Text textAlign="center" color="white" fontSize={rank == 1 ? 12 : 8}>
          {rank}
        </Text>
      </Circle>
      <Avatar
        source={{ uri: "https://ui-avatars.com/api/?name=emma+clothe" }}
        w={rank == 1 ? "60px" : "40px"}
        h={rank == 1 ? "60px" : "40px"}
      />
      <Heading fontSize={rank == 1 ? 20 : 14}>John Doe</Heading>
      <Text my={1} color="gray.400" fontSize={rank == 1 ? 14 : 10}>
        Points: 45,000
      </Text>
      <HStack justifyContent="space-between">
        <VStack alignItems="center">
          <Box
            w={rank == 1 ? 6 : 4}
            bg="yellow.400"
            mx={1}
            h={rank == 1 ? 6 : 4}
            borderBottomRightRadius={25}
            borderBottomLeftRadius={25}
          ></Box>
          <Text>5</Text>
        </VStack>
        <VStack alignItems="center">
          <Box
            w={rank == 1 ? 6 : 4}
            bg="#C0C0C0"
            mx={1}
            h={rank == 1 ? 6 : 4}
            borderBottomRightRadius={25}
            borderBottomLeftRadius={25}
          ></Box>
          <Text>5</Text>
        </VStack>
        <VStack alignItems="center">
          <Box
            w={rank == 1 ? 6 : 4}
            mx={1}
            bg="#935F3F"
            h={rank == 1 ? 6 : 4}
            borderBottomRightRadius={25}
            borderBottomLeftRadius={25}
          ></Box>
          <Text>5</Text>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default Top3Card;
