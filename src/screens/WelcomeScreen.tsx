import React, { FC } from "react";
import { Text, Box, Heading, Button, Image } from "native-base";
import { useWindowDimensions } from "react-native";

interface WelcomeScreenProp {
  navigation: any;
}
const WelcomeScreen: FC<WelcomeScreenProp> = ({ navigation }) => {
  const { width, height, scale, fontScale } = useWindowDimensions();

  return (
    <Box
      bg="white"
      padding={4}
      paddingTop={20}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      h="100%"
    >
      <Image
        source={require("../assets/images/welcome.jpg")}
        alt="welcome"
        h={height - 500}
      />
      <Box>
        <Heading
          color="brand.primary"
          fontFamily="Inter"
          fontSize={fontScale + 25}
          fontWeight="600"
          textAlign="center"
          my={"9%"}
          mx={3}
        >
          Welcome to Dunky Learning Platform
        </Heading>
        <Text fontSize={16} textAlign="center" mb={2} px={3}>
          Kindly choose your role: I am a
        </Text>
      </Box>
      <Box
        h={200}
        mb={60}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        w={width - 50}
      >
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
          onPress={() =>
            navigation.navigate("signupScreen", { user: "student" })
          }
        >
          Student
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
          onPress={() =>
            navigation.navigate("signupScreen", { user: "teacher" })
          }
        >
          Teacher
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
          onPress={() =>
            navigation.navigate("signupScreen", { user: "parent" })
          }
        >
          Parent
        </Button>
      </Box>
    </Box>
  );
};

export default WelcomeScreen;
