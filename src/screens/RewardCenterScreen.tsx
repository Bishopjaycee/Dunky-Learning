import React, { FC } from "react";
import {
  VStack,
  Text,
  Pressable,
  Heading,
  Image,
  Button,
  HStack,
  FormControl,
  Input,
  KeyboardAvoidingView,
} from "native-base";
import { Entypo } from "@expo/vector-icons";
import { Platform } from "react-native";

interface RewardCenterProps {
  navigation: any;
}
const RewardCenter: FC<RewardCenterProps> = ({ navigation }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      h="100%"
      width="100%"
    >
      <VStack pt={20} bg="white" pos="absolute">
        <Pressable
          onPress={() => navigation.goBack()}
          pos="absolute"
          bg="brand.primary"
          pl={8}
          top={20}
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
        <Heading textAlign="center">Reward Centre</Heading>
        <Image
          alignSelf="center"
          mt={6}
          source={require("../assets/images/reward.png")}
          alt="reward"
          size="200px"
        />
        <Text fontSize={14} mt="4" textAlign="center" px={6}>
          Exchange your dunky points for instant airtime for calls and for
          mobile data
        </Text>
        <HStack
          justifyContent="space-between"
          px={4}
          py={2}
          w={300}
          alignSelf="center"
          shadow={2}
          bg="white"
          mt={2}
        >
          <Text fontWeight="700">Dunk Balance</Text>
          <Text fontWeight="700">50,000</Text>
        </HStack>
        <Text fontSize="sm" opacity={0.6} textAlign="center" my={4}>
          10,000 Dunks = ₦500
        </Text>

        <FormControl isInvalid={false}>
          <VStack mx={7}>
            <FormControl.Label>Dunk Amount</FormControl.Label>
            <Input
              _focus={{ borderColor: "brand.primary" }}
              p={1}
              placeholder=""
              mb={2}
              _light={{
                placeholderTextColor: "blueGray.400",
              }}
              _dark={{
                placeholderTextColor: "blueGray.50",
              }}
            />

            <FormControl.ErrorMessage my={1}>
              I'll only appear when FormControl have isInvalid props.
            </FormControl.ErrorMessage>
          </VStack>
        </FormControl>
        <FormControl isInvalid={false}>
          <VStack mx={7}>
            <FormControl.Label>Phone Number</FormControl.Label>
            <Input
              _focus={{ borderColor: "brand.primary" }}
              p={1}
              placeholder=""
              
            />

            <FormControl.ErrorMessage my={1}>
              I'll only appear when FormControl have isInvalid props.
            </FormControl.ErrorMessage>
          </VStack>
        </FormControl>

        <Button
          variant="solid"
          bg="brand.primary"
          color="white"
          mt={4}
          mx={7}
          _pressed={{ backgroundColor: "brand.bg1" }}
          onPress={() => navigation.navigate("confirm-reward")}
        >
          Claim reward
        </Button>
      </VStack>
    </KeyboardAvoidingView>
  );
};

export default RewardCenter;
