import React, { FC, useState } from "react";
import {
  Heading,
  Image,
  Text,
  VStack,
  FormControl,
  Input,
  Button,
  KeyboardAvoidingView,
  Box,
  ScrollView,
} from "native-base";
import HamburgerAndBell from "../components/hamburgerBell";

import { Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useUser } from "./../util/use-user";

interface ParentTrackProps {
  navigation: any;
}

const ParentTrack: FC<ParentTrackProps> = ({ navigation }) => {
  const { user, isLoading } = useUser();

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const submit = (data: any) => {
    console.log(data);
    navigation.navigate("weekly-progress");
  };

  const val: string = watch("kidID");

  if (isLoading)
    return (
      <Text textAlign="center" my={20}>
        Loading...
      </Text>
    );
  return (
    <KeyboardAvoidingView
      flex={1}
      bg="white"
      pb={0}
      keyboardVerticalOffset={10}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <ScrollView h={400} flex={1}>
        <VStack h="100%" px={4} alignItems="center">
          <HamburgerAndBell navigation={navigation} />
          <Heading textAlign="center" mt={1} color="primary.600">
            Welcome {user?.displayName?.split(" ")[0]}
          </Heading>
          <Text my={4}>Take part in your child’s learning</Text>
          <Box p={4}>
            <Image
              source={require("../assets/images/back_to_school.png")}
              w="290px"
              h="210px"
              alt="parent-kid"
            />
          </Box>

          <FormControl isInvalid={errors?.kidID} mt={4}>
            <VStack mx={7} alignItems="center">
              <FormControl.Label
                _text={{ fontSize: 12, textAlign: "center", ml: 4 }}
              >
                Enter Student’s User ID to see progress
              </FormControl.Label>
              <Controller
                control={control}
                name="kidID"
                defaultValue=""
                rules={{
                  required: true,
                  pattern: /^[A-Za-z]{2}\/[a-zA-Z]{2}\/\d{4}\/\d{2,}/,
                }}
                render={({ field: { onChange, ref, value } }) => (
                  <>
                    <Input
                      onChangeText={onChange}
                      value={value}
                      ref={ref}
                      w="100%"
                      _focus={{ borderColor: "brand.primary" }}
                      p={1}
                      placeholder="AF/GD/1234/01"
                    />
                  </>
                )}
              />
              <FormControl.ErrorMessage my={1}>
                Kid ID required. Example: FG/PA/1234/01
                {errors.kidID?.type}
              </FormControl.ErrorMessage>
            </VStack>
          </FormControl>

          <Button
            alignSelf="center"
            variant="solid"
            bg={
              val != undefined && val.length > 12
                ? "brand.primary"
                : "brand.bg2"
            }
            _text={{ color: "white" }}
            w="275px"
            my={10}
            _pressed={{ backgroundColor: "brand.bg1" }}
            onPress={handleSubmit(submit)}
          >
            See Progress
          </Button>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ParentTrack;
