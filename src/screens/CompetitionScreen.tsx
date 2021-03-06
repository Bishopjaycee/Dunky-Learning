import {
  Heading,
  Image,
  Text,
  VStack,
  Button,
  Box,
  Pressable,
} from "native-base";
import React, { FC, useState, useEffect } from "react";
import { useUser } from "./../util/use-user";

interface CompetitionProp {
  navigation: any;
}

const CompetitionScreen: FC<CompetitionProp> = ({ navigation }) => {
  const [_modal, setModal] = useState(false);
  const { dunkPoint } = useUser();
  const modalOpenClose = () => {
    if (_modal) {
      setModal(false);
    }
  };
  return (
    <Box>
      {_modal && (
        <VStack
          bg="white"
          shadow={1}
          zIndex={20}
          pos="absolute"
          top={310}
          m={4}
          p={2}
        >
          {dunkPoint >= 5000 ? (
            <>
              <Text fontSize="sm" textAlign="center" p={4} fontFamily="Inter">
                Congratulation, you have successfully Unlockd the Dunky
                Championship. click next to continue
              </Text>
              <Button
                variant="solid"
                color="white"
                bg="brand.primary"
                my={4}
                mx={6}
                _pressed={{
                  backgroundColor: "brand.bg1",
                  color: "brand.primary",
                }}
                _text={{ color: "white" }}
                onPress={() => navigation.navigate("setup")}
              >
                Next
              </Button>
            </>
          ) : (
            <>
              <Text fontSize="sm" textAlign="center" p={4} fontFamily="Inter">
                Oops! Your not eligible for this championship! Take some quiz to
                earn more dunk points.
              </Text>
              <Button
                variant="solid"
                color="white"
                bg="brand.primary"
                my={4}
                mx={6}
                _pressed={{
                  backgroundColor: "brand.bg1",
                  color: "brand.primary",
                }}
                _text={{ color: "white" }}
                onPress={() => navigation.navigate("subjectScreen")}
              >
                Take quiz
              </Button>
            </>
          )}
        </VStack>
      )}
      <Pressable onPress={() => modalOpenClose()}>
        <VStack
          pt={4}
          px={2}
          h="100%"
          justifyContent="center"
          alignItems="center"
          bg={_modal ? "brand.bg2" : "white"}
          opacity={_modal ? 0.6 : 1}
        >
          <Heading
            mt={15}
            mb={10}
            fontSize={20}
            textTransform="uppercase"
            textAlign="center"
            fontFamily="Inter"
          >
            WELCOME TO THE DUNKY Championship
          </Heading>
          <Text fontSize={16} my={4} textAlign="center" fontFamily="Inter">
            Will you take part and guide your team to glory?
          </Text>
          <Image
            source={require("../assets/images/trophy.png")}
            alt="trophy"
            size={40}
            my={8}
          />

          <Button
            disabled={_modal}
            variant="solid"
            color="white"
            bg={_modal ? "brand.bg2" : "brand.primary"}
            my={4}
            mx={4}
            w="80%"
            _pressed={{ backgroundColor: "brand.bg1", color: "brand.primary" }}
            _text={{ color: "white" }}
            onPress={() => setModal(true)}
          >
            Entry is 5,000 Dunks
          </Button>
        </VStack>
      </Pressable>
    </Box>
  );
};

export default CompetitionScreen;
