import React, { FC, useState } from "react";
import { ImageBackground, Platform, Alert } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useForm, Controller } from "react-hook-form";
import {
  Text,
  KeyboardAvoidingView,
  Box,
  Heading,
  FormControl,
  Input,
  Icon,
  Stack,
  Button,
  IconButton,
} from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { useUser } from "./../util/use-user";

interface LoginScreenProp {
  navigation: any;
}
const LoginScreen: FC<LoginScreenProp> = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, error, signIn } = useUser();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    try {
      await signIn({ email: data?.email, password: data?.password });
      if (!isLoading) props.navigation.navigate("drawer");
    } catch (err) {
      Alert.alert("Error", error ?? err);
      console.error(err);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      flex={9}
      bg="brand.primary"
      width="100%"
      height="100%"
    >
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <ImageBackground
          source={require("../assets/images/login-bg.png")}
          style={{ width: "100%", height: "100%" }}
        >
          <Box
            position="relative"
            bottom={-235}
            display="flex"
            justifyContent="center"
            alignItems="center"
            px={5}
          >
            <Heading
              fontFamily="Inter"
              fontSize={30}
              fontWeight="700"
              color="white"
              textAlign="center"
            >
              Welcome Back!
            </Heading>
            <Text px={8} mt={5} textAlign="center" color="white" fontSize={16}>
              Kindly provide your login details to continue.
            </Text>
          </Box>
        </ImageBackground>
      </Box>
      <Box
        flex={1}
        borderTopLeftRadius={25}
        borderTopRightRadius={25}
        backgroundColor="white"
        width="100%"
        p={5}
        pt={10}
      >
        <FormControl isRequired isInvalid={errors?.email}>
          <Stack mx={2}>
            <FormControl.Label
              _text={{ fontSize: 16, fontWeight: "700", marginY: 2 }}
            >
              <Icon
                mr={2}
                my={1.5}
                as={
                  <Svg width="21" height="20" viewBox="0 0 21 20" fill="none">
                    <Path
                      d="M16.2678 7.06104L12.0024 10.4953C11.1952 11.1282 10.0636 11.1282 9.25641 10.4953L4.95435 7.06104"
                      stroke="#50555C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.88787 1.5H15.3158C16.6752 1.51525 17.969 2.08993 18.896 3.0902C19.823 4.09048 20.3022 5.42903 20.222 6.79412V13.322C20.3022 14.6871 19.823 16.0256 18.896 17.0259C17.969 18.0262 16.6752 18.6009 15.3158 18.6161H5.88787C2.96796 18.6161 1 16.2407 1 13.322V6.79412C1 3.87545 2.96796 1.5 5.88787 1.5Z"
                      stroke="#50555C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </Svg>
                }
              />
              Email Address
            </FormControl.Label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={(val) => onChange(val)}
                  value={value}
                  type="email"
                  keyboardType="email-address"
                  ref={ref}
                  borderColor="brand.bg2"
                  _focus={{ borderColor: "brand.primary" }}
                  variant="underlined"
                  placeholder="Enter your email"
                  my={2}
                  placeholderTextColor={"blueGray.400"}
                />
              )}
              name="email"
              defaultValue=""
              rules={{ required: true, pattern: /\w+\@\w+\.(\w{3}|\w{2})/ }}
            />
            {/* <FormControl.HelperText>I am a Helper text 😊</FormControl.HelperText> */}

            <FormControl.ErrorMessage>Email required</FormControl.ErrorMessage>
          </Stack>
        </FormControl>
        <FormControl isRequired isInvalid={"password" in errors}>
          <Stack mx={2}>
            <FormControl.Label
              _text={{ fontSize: 16, fontWeight: "700", marginY: 2 }}
            >
              <Icon
                mr={2}
                my={1.5}
                as={
                  <Svg width="26" height="24" viewBox="0 0 26 24" fill="none">
                    <Path
                      d="M17.566 9.44731V7.30031C17.566 4.78731 15.4431 2.74931 12.8254 2.74931C10.2077 2.73831 8.0764 4.76631 8.06494 7.28031V7.30031V9.44731"
                      stroke="#868686"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16.7949 21.2491H8.83556C6.65431 21.2491 4.88556 19.5521 4.88556 17.4571V13.1681C4.88556 11.0731 6.65431 9.3761 8.83556 9.3761H16.7949C18.9762 9.3761 20.7449 11.0731 20.7449 13.1681V17.4571C20.7449 19.5521 18.9762 21.2491 16.7949 21.2491Z"
                      stroke="#868686"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <Path
                      d="M12.8155 14.2023V16.4233"
                      stroke="#868686"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </Svg>
                }
              />
              Password
            </FormControl.Label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={(val) => onChange(val)}
                  value={value}
                  ref={ref}
                  type={showPassword ? "text" : "password"}
                  borderColor="brand.bg2"
                  _focus={{ borderColor: "brand.primary" }}
                  variant="underlined"
                  placeholder="Password"
                  my={2}
                  placeholderTextColor={"blueGray.400"}
                  InputRightElement={
                    <IconButton
                      variant="solid"
                      bg="transparent"
                      _pressed={{ backgroundColor: "transparent" }}
                      icon={
                        showPassword ? (
                          <FontAwesome5 name="eye" size={20} color="#5956E9" />
                        ) : (
                          <FontAwesome5
                            name="eye-slash"
                            size={20}
                            color="#5956E9"
                          />
                        )
                      }
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                />
              )}
              name="password"
              defaultValue=""
              rules={{ required: "Field required", minLength: 5 }}
            />

            <FormControl.ErrorMessage _text={{ color: "red.500" }}>
              {errors.password?.message}
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl>
        <Button
          variant="solid"
          bg="brand.primary"
          my={10}
          _pressed={{ backgroundColor: "brand.bg1" }}
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
          isLoadingText=""
        >
          Login
        </Button>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
