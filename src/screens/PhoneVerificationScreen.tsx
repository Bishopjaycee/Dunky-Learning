import React, { FC, useState } from "react";

import {
  Box,
  Heading,
  Text,
  FormControl,
  Input,
  Stack,
  Icon,
  Button,
} from "native-base";
import { useForm, Controller } from "react-hook-form";
import { FontAwesome5 } from "@expo/vector-icons";

type Props = { navigation: any };
const PhoneVerificationScreen: FC<Props> = ({ navigation }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [len, setLen] = useState(0);

  const onSubmit = (data: any) => {
    navigation.navigate("otpVerificationScreen", { phone: data?.phone });
  };

  return (
    <Box w="100%" h="100%" bg="white" pt={25}>
      <Heading color="brand.primary" mt={20} mx={6} mb={5}>
        Phone Verification
      </Heading>
      <Text px={6} textAlign="justify" mb={8}>
        We will send a confirmation code to your phone number to verify your
        account
      </Text>
      <FormControl isRequired isInvalid={"phone" in errors}>
        <Stack mx={2}>
          <FormControl.Label
            _text={{ fontSize: 20, fontWeight: "500", marginY: 2 }}
          >
            <Icon
              ml={5}
              mr={4}
              my={1}
              h={8}
              as={<FontAwesome5 name="phone-alt" size={3} color="black" />}
            />
            Enter Phone Number
          </FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                mx={5}
                onBlur={onBlur}
                onChangeText={(val) => {
                  setLen(val.length);
                  onChange(val);
                }}
                value={value}
                type="phone"
                ref={ref}
                borderColor="brand.bg2"
                _focus={{ borderColor: "brand.primary" }}
                variant="underlined"
                placeholder="Phone number"
                my={2}
                keyboardType="phone-pad"
                placeholderTextColor={"blueGray.400"}
              />
            )}
            name="phone"
            defaultValue=""
            rules={{ required: true, pattern: /^(0|\+234)\d{10}/ }}
          />

          <FormControl.ErrorMessage mx={4}>
            Phone number required
          </FormControl.ErrorMessage>
        </Stack>
      </FormControl>
      <Button
        disabled={len === 0 && len < 11}
        variant="solid"
        bg={
          (len !== 0 && len >= 11) || len === 14 ? "brand.primary" : "brand.bg2"
        }
        color="white"
        mb={7}
        mt={40}
        mx={5}
        _pressed={{ backgroundColor: "brand.bg1" }}
        onPress={handleSubmit(onSubmit)}
      >
        Send code
      </Button>
    </Box>
  );
};

export default PhoneVerificationScreen;
