import React, { FC, useState } from "react";
import { Dimensions } from "react-native";
import OnboardingSliderCard from "../components/onboardSliderCard";
import { Box, Button, VStack } from "native-base";
import Carousel from "react-native-snap-carousel";

interface DataModel {
  id: number;
  image: string;
  title: string;
  text: string;
  imageStyle?: any;
}
const data: Array<DataModel> = [
  {
    id: 0,
    image: require("../assets/images/onboarding-11.png"),
    title: "A fun way to learn",
    text: "Master your entire curriculum in a very interesting and fun-filled way.",
    imageStyle: {
      width: 250,
      height: 250,
      position: "relative",
      top: -10,
      right: 0,
      resizeMode: "center",
      left: 30,
    },
  },
  {
    id: 1,
    image: require("../assets/images/onboarding-22.png"),
    title: "Compete and get rewarded ",
    text: "Get instant rewards for every success made while learning.",
    imageStyle: {
      width: 250,
      height: 250,
      position: "relative",
      top: 15,
      bottom: -5,
      right: 0,
      resizeMode: "center",
      left: 30,
    },
  },
  {
    id: 2,
    image: require("../assets/images/onboarding-3.png"),
    title: "Keep a tab on your kids",
    text: "With Dunky, keeping a tab on your kids progress is easy.",
    imageStyle: {
      width: 250,
      height: 250,
      position: "relative",
      top: 15,
      bottom: -5,
      resizeMode: "center",
      left: 20,
    },
  },
];
interface OnboardingScreenProp {
  navigation: any;
}

const ItemRenderer: FC<{ item: any; index?: number }> = ({ item }) => {
  return (
    <OnboardingSliderCard
      source={item.image}
      title={item.title}
      text={item.text}
      imageStyle={item.imageStyle}
      key={item.id}
    />
  );
};

const OnboardingScreen: FC<OnboardingScreenProp> = ({ navigation }) => {
  const [_carIndex, setCarIndex] = useState(0);
  const bullets = [];

  for (let i = 0; i < data.length; i++) {
    bullets.push(
      <Box
        key={i}
        bg="brand.primary"
        h={2}
        w={7}
        mx={1}
        opacity={_carIndex === i ? 1 : 0.2}
      />
    );
  }

  return (
    <VStack
      bg="white"
      justifyContent="space-between"
      p={5}
      h={Dimensions.get("screen").height}
      overflow="hidden"
      safeArea
    >
      <Box>
        <Carousel
          initialScrollIndex={0}
          data={data}
          sliderWidth={300}
          itemWidth={400}
          renderItem={ItemRenderer}
          autoplay
          autoplayDelay={500}
          onSnapToItem={(index) => {
            setCarIndex(index);
          }}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="row"
        alignItems="flex-start"
        p={5}
        my={6}
      >
        {bullets}
      </Box>
      <Box
        d="flex"
        flexDir="column"
        justifyContent="space-between"
        alignItems="flex-end"
        w={Dimensions.get("screen").width - 60}
        ml={2}
        mb={10}
        // border="2px solid red"
      >
        <Button
          variant="solid"
          bg="brand.primary"
          color="white"
          mb={4}
          w="100%"
          _pressed={{ backgroundColor: "brand.bg1" }}
          onPress={() => navigation.navigate("welcomeScreen")}
        >
          Get Started
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
          onPress={() => navigation.navigate("loginScreen")}
        >
          Login
        </Button>
      </Box>
    </VStack>
  );
};

export default OnboardingScreen;
