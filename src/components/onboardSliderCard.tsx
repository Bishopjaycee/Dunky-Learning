import React, { FC } from "react";
import { StyleSheet, Dimensions, Image } from "react-native";
import { VStack, Text, Box } from "native-base";

interface OnboardingCardProp {
  source: any;
  title: string;
  text: string;
  imageStyle?: any;
}
const OnboardingSliderCard: FC<OnboardingCardProp> = ({
  title,
  text,
  source,
  imageStyle,
}) => {
  return (
    <VStack
      justifyContent="center"
      mt={10}
      alignItems="center"
      mx={2}
      w={Dimensions.get("screen").width - 68}
      overflow="hidden"
    >
      <Box
        borderRadius={10000}
        backgroundColor="#D9D9F9"
        width={280}
        height={280}
        pos="relative"
        overflow="hidden"
      >
        <Image source={source} style={imageStyle ?? styles.img} />
      </Box>
      <Text fontFamily="Inter" fontSize={20} fontWeight="bold" my={25}>
        {title}
      </Text>
      <Text fontSize={16} textAlign="center" px={8}>
        {text}
      </Text>
    </VStack>
  );
};
const styles = StyleSheet.create({
  img: {
    width: 250,
    height: 250,
    position: "relative",
    top: -10,
    right: 0,
    resizeMode: "center",
    left: 30,
  },
});
export default OnboardingSliderCard;
