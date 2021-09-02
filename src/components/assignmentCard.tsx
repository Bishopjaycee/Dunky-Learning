import React from "react";
import { VStack, Image, Text } from "native-base";

interface Props {
  source?: any;
  title: string;
  status?: "completed" | "pending" | "new";
}
export default function AssignmentCard({
  source = require("../assets/images/pdf.png"),
  title,
  status,
}: Props) {
  return (
    <VStack
      w="90px"
      h="100px"
      borderWidth={1}
      borderRadius={10}
      borderColor="gray.300"
      justifyContent="center"
      alignItems="center"
      px={2}
      py={4}
      my={2}
      mx={1}
    >
      <Image source={source} alt="upload assignment" w="40px" h="40px" />
      <Text fontSize={10} textAlign="center" my={1}>
        {title}
      </Text>
      {status == "completed" && (
        <Text fontSize={7} opacity={0.6} textAlign="center" mb={1}>
          submitted {"2/06/2021"}
        </Text>
      )}
      {status == "new" && (
        <Image
          source={require("../assets/images/cloud-computing-2.png")}
          alt="download"
          w="20px"
          h="20px"
        />
      )}
    </VStack>
  );
}
