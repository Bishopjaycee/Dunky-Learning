import React, { useEffect } from "react";
import { Box, Heading, Text, Button } from "native-base";
const LottieView = require("lottie-react-native");
export default function SuccessScreen(props: any) {
  let animation: any = null;
  useEffect(() => {
    animation?.play(0, 360);
    
  },[]);

  return (
    <Box
      p={10}
      d="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      pt={20}
    >
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

      <Heading my={5}>You are good to go!</Heading>
      <Text textAlign="center">
        Your phone has been successfully verified, click next to continue.
      </Text>
      <Button
        variant="solid"
        bg={"brand.primary"}
        color="white"
        mb={4}
        mt={40}
        mx={5}
        w="100%"
        _pressed={{ backgroundColor: "brand.bg1" }}
        onPress={() => props.navigation.navigate("successScreen2")}
      >
        Next
      </Button>
    </Box>
  );
}
