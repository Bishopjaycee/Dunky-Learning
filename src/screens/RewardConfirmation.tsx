import { VStack, Text, Button, Heading, Box } from "native-base";
import React, { useEffect, useRef } from "react";
const LottieView = require("lottie-react-native");

interface Props {
  navigation: any;
}
function RewardConfirmation(props: Props) {
  let animation: any = null;
  useEffect(() => {
    animation?.play(0, 360);
  }, []);

  return (
    <VStack justifyContent="center" alignItems="center" bg="white" h="100%">
      <Box w="200px" h="200px">
        <LottieView
          ref={(ref: any) => (animation = ref)}
          style={{
            width: 650,
            flex: 1,
            height: 150,
            backgroundColor: "transparent",
          }}
          resizeMode="cover"
          source={require("../assets/lottie/check-animation.json")}
          autoPlay
          loop={false}
        />
      </Box>
      <Heading my={4}>Successful</Heading>
      <Text px={4} textAlign="center">
        Congratulations, you have successfully been rewarded with ₦2500 worth of
        airtime.
      </Text>
      <Button
        variant="solid"
        bg="brand.primary"
        color="white"
        mt={6}
        mx={7}
        _pressed={{ backgroundColor: "brand.bg1" }}
        onPress={() => props.navigation.navigate("Home")}
      >
        Go to Home
      </Button>
    </VStack>
  );
}

export default RewardConfirmation;
