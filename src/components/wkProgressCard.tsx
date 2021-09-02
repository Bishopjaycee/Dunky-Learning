import React from "react";
import { HStack, Circle, Image, VStack, Progress, Text } from "native-base";
export default function ProgressCard() {
  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      borderWidth={1}
      borderRadius={5}
      borderColor="gray.200"
      px={3}
      py={2}
      my={2}
      shadow={1}
    >
      <Circle overflow="hidden" bg="brand.bg1" p={1} w="40px" h="40px">
        <Image
          source={require("../assets/images/chemistry.png")}
          alt="chemistry"
          size="30px"
        />
      </Circle>

      <VStack justifyContent="space-between" alignItems="center">
        <Text textAlign="center" mb={1}>
          Chemistry
        </Text>
        <Progress w={150} value={100} colorScheme="green" h={2} />
      </VStack>
      <Text textAlign="center">100%</Text>
    </HStack>
  );
}
