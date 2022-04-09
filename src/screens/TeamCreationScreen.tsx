import React, { FC } from "react";
import {
  Button,
  FormControl,
  Icon,
  Input,
  Text,
  VStack,
  Heading,
  Box,
  Pressable,
  Avatar,
} from "native-base";
import NavigateBack from "../components/navigateBack";
import { useUser } from "../util/use-user";
import { useImagePicker } from "../util/use-image-picker";
import { useForm, Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import useGame from "./../util/use-game";

interface TeamCreationProps {
  navigation: any;
}
const TeamCreationScreen: FC<TeamCreationProps> = ({ navigation }) => {
  const { userImg } = useUser();
  const { createTeam } = useGame();
  const { pickImage, image, DBImag } = useImagePicker("");
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const nameWatch = watch("name");

  const onSubmit = (data: any) => {
    data.photoURL = image;

    createTeam(data).then(() => {
      navigation.navigate("team-details", {
        teamName: data.name,
        teamAv: image,
      });
    });
    console.log(DBImag);
  };

  return (
    <VStack pt={8} px={4}>
      <NavigateBack navigation={navigation} />
      <Heading mt={8} textAlign="center" fontSize={20}>
        Create Team
      </Heading>
      <FormControl isInvalid={errors?.name} mt={20}>
        <VStack m={2}>
          <FormControl.Label _text={{ fontSize: 16, fontWeight: "700" }}>
            Team Name
          </FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={(val) => onChange(val)}
                value={value}
                ref={ref}
                borderColor="brand.bg2"
                _focus={{ borderColor: "brand.primary" }}
                variant="underlined"
                placeholder="Enter team name"
                //   my={2}
                placeholderTextColor={"blueGray.400"}
              />
            )}
            name="name"
            defaultValue={""}
            rules={{ required: true, minLength: 4 }}
          />
          <FormControl.ErrorMessage>Name required</FormControl.ErrorMessage>
        </VStack>
      </FormControl>
      <Box mt={6} mx={3}>
        <Text>Add Team Avatar</Text>
        <Pressable
          onPress={() => pickImage(nameWatch)}
          w="60px"
          h="60px"
          m={2}
          bg="gray.100"
          borderRadius="full"
          borderColor="gray.300"
          borderWidth={1}
        >
          {image ? (
            <Avatar source={{ uri: image }} size="55px" m="auto" />
          ) : (
            <Icon
              m="auto"
              as={<Ionicons name="add-circle-outline" />}
              size={"30px"}
              color="primary.600"
              fill="black"
            />
          )}
        </Pressable>
      </Box>
      <Button
        variant="solid"
        bg={
          image != "" && nameWatch?.length > 4 ? "brand.primary" : "brand.bg2"
        }
        my={8}
        _pressed={{ backgroundColor: "brand.bg1" }}
        onPress={handleSubmit(onSubmit)}
      >
        Create Team
      </Button>
    </VStack>
  );
};

export default TeamCreationScreen;
