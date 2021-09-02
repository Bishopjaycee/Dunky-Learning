import React, { useEffect, useRef, useState } from "react";
import { Box, Heading, Image, Text, Button } from "native-base";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import { useForm, Controller } from "react-hook-form";
import { Alert, Dimensions } from "react-native";
import firebase from "firebase/app";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { useUser } from "./../util/use-user";

function phoneNumberString(phone: string) {
  if (/^0/.test(phone)) {
    return phone.replace(/^0/, "+234");
  } else {
    return phone;
  }
}

async function sendVerificationCode(phoneNumber: string, verifier: any) {
  const phoneProvider = new firebase.auth.PhoneAuthProvider();
  const data = await phoneProvider.verifyPhoneNumber(phoneNumber, verifier);
  return data;
}
interface OTPProps {
  navigation: any;
  route: { params: any };
}
function OTPVerificationScreen(props: OTPProps) {
  const { phone } = props.route.params;
  // const phone = "07069149761";
  const [len, setLen] = useState(0);
  const recaptchaVerifier = useRef(null);
  const [verificationId, setVerificationId] = useState("");

  const { handleSubmit, control, setValue } = useForm();
  const { isLoading, addPhoneCredentials, error } = useUser();

  function sendOTP() {
    sendVerificationCode(
      phoneNumberString(phone),
      recaptchaVerifier.current
    ).then(setVerificationId);
    setValue("otp", "");
    setLen(0);
  }

  useEffect(() => {
    sendOTP();
    return () => {
      sendOTP();
    };
  }, []);

  const onSubmit = async (data: any) => {
    try {
      await addPhoneCredentials({ phone, verificationId, otp: data?.otp });
      if (!isLoading && !error) props.navigation.navigate("successScreen");
    } catch (error) {
      Alert.alert(error);
      console.error(error);
    }
  };

  return (
    <>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.app().options}
      />
      <Box
        w="100%"
        py={20}
        bg="white"
        display="flex"
        flexDir="column"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box
          alignSelf="center"
          border="2px solid transparent"
          my={5}
          h={40}
          w={40}
          p={3}
        >
          <Image
            source={require("../assets/images/splash.png")}
            alt="logo"
            height={40}
            mb={4}
          />
        </Box>

        <Heading alignSelf="center" color="brand.primary" mt={4}>
          OTP VERIFICATION
        </Heading>
        <Text mx={8} my={3} px={2} textAlign="center">
          Enter the OTP sent to <Text fontWeight="bold">{phone}</Text> to verify
          your account.
        </Text>
        <Box alignSelf="center">
          <Controller
            name="otp"
            defaultValue=""
            control={control}
            render={({ field: { onChange, ref, value, onBlur } }) => (
              <SmoothPinCodeInput
                password
                mask="*"
                onBlur={onBlur}
                ref={ref}
                cellSize={36}
                codeLength={6}
                value={value}
                inputProps={{
                  textContentType: "oneTimeCode",

                  keyboardType: "numeric",
                }}
                onTextChange={(otp) => {
                  setLen(otp.length);
                  onChange(otp);
                }}
              />
            )}
          />
        </Box>
        <Text
          alignSelf="center"
          fontSize="xs"
          textAlign="center"
          w={Dimensions.get("screen").width - 20}
          mx={4}
          my={5}
        >
          Didn't receive OTP?{"  "}
          <Text
            color="brand.primary"
            fontWeight="bold"
            fontSize="md"
            mx={5}
            onPress={sendOTP}
          >
            Resend Code
          </Text>
        </Text>
        <Button
          alignSelf="center"
          disabled={len === 0 && len < 5}
          variant="solid"
          w="80%"
          bg={len !== 0 && len >= 5 ? "brand.primary" : "brand.bg2"}
          color="white"
          mb={7}
          mt={40}
          mx={5}
          _pressed={{ backgroundColor: "brand.bg1" }}
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
        >
          Verify
        </Button>
      </Box>
    </>
  );
}

export default OTPVerificationScreen;
