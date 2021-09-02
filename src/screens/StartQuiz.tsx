import React, { FC, useEffect } from "react";
import {
  Heading,
  Button,
  Circle,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { Entypo } from "@expo/vector-icons";

interface StartQuizProps {
  navigation: any;
  route: any;
}
const StartQuiz: FC<StartQuizProps> = ({ route, navigation }) => {
  const { title, image } = route.params;

  const toQuiz = () => {
    navigation.navigate("quiz-screen", { subjectTitle: title });
  };
  const goBack = () => navigation.pop();
  return (
    <VStack px={4} bg="white" h={"100%"}>
      <Pressable
        onPress={goBack}
        pos="absolute"
        bg="brand.primary"
        pl={"8%"}
        top={"10%"}
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
      <HStack mt={"28%"} mb={"10%"} justifyContent="center" alignItems="center">
        <Text fontWeight="bold" color="brand.primary">
          Quiz
        </Text>
        <Circle bg="red.600" mx={2} size={3} />
      </HStack>
      <VStack mt={18} alignItems="center">
        <Circle overflow="hidden" bg=" #D9D9F9" p={1} h="200px" w="200px">
          <Image
            source={{ uri: image }}
            alt={title}
            resizeMode="contain"
            h="60%"
            w="66%"
          />
        </Circle>
        <Heading my={"4%"} fontWeight="bold">
          {title}
        </Heading>
        <Text my={"4%"} textAlign="center" p={4}>
          Put your memory to the test, you will need to score a minimum of 60%
          to pass this test. good luck!
        </Text>
        <Text fontWeight="thin" textAlign="center" opacity={0.5}>
          30 questions
        </Text>
        <Button
          mt="10%"
          variant="solid"
          bg="brand.primary"
          color="white"
          mb={4}
          w="90%"
          _pressed={{ backgroundColor: "brand.bg1" }}
          onPress={toQuiz}
        >
          Start Quiz
        </Button>
      </VStack>
    </VStack>
  );
};

export default React.memo(StartQuiz);
