import React, { FC, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  FormControl,
  VStack,
  CheckIcon,
  Input,
  Icon,
  Text,
  ScrollView,
  Select,
  IconButton,
  Avatar,
  Heading,
  Pressable,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import CustomMultiSelect from "./../components/multiSelect";
import getMultiSelectedItems from "./../util/getMultiSelectedItem";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { db, auth } from "../util/firebase";
import { useUser } from "./../util/use-user";

const data = [
  {
    id: "dsdsdsd",
    name: "One",
  },
  {
    id: "dsdsdsfd",
    name: "Two",
  },
  {
    id: "dsdsddsd",
    name: "Three",
  },
  {
    id: "dsdsdsrd",
    name: "Four",
  },
  {
    id: "dsdsdesdsd",
    name: "Five",
  },
  {
    id: "dsdsdewsfd",
    name: "Six",
  },
  {
    id: "dsdssdsdsd",
    name: "Sevent",
  },
  {
    id: "dsdsgedsrd",
    name: "Last",
  },
];

interface EditProfileScreenProp {
  navigation: any;
  route: any;
}
const EditProfileScreen: FC<EditProfileScreenProp> = ({ navigation }) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const [modified, modifiedSet] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);
  const [items, setItems] = useState<{ id: string; name: string }[]>(data);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [userData, setUserData] = useState(null) as any;
  const [isLoaded, setIsLoaded] = useState(false);

  const { getItem: getRole } = useAsyncStorage("@role");
  const { mergeItem: mergeUser } = useAsyncStorage("@user");
  const { userName, user } = useUser();
  const fname = userName?.split(" ")[0];
  const lname = userName?.split(" ")[1];

  const onSelectItemsChange = (selectedItem: any[]) => {
    setSelectedItems(selectedItem);
  };

  const onSubmit = () => {
    // console.log(data);
    mergeUser(userData);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      modifiedSet(true);
    }
  }, [isSubmitSuccessful, modified]);

  const [image, setImage] = useState<string>(
    `https://ui-avatars.com/api/?name=${fname}+${lname}`
  );

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  useEffect(() => {
    setValue("school", getMultiSelectedItems(data, selectedItems));
  }, []);

  const getUserData = async () => {
    let role = await getRole();
    const doc = db.collection(`${role}s`).doc(user?.uid).get();
    const data = (await doc).data();

    setUserData(data);
    setIsLoaded(true);
  };

  useEffect(() => {
    getUserData();
    return () => {
      getUserData();
    };
  }, [isLoaded]);
  return (
    <VStack p={5} h="100%" bg="white" pt={10}>
      <VStack alignItems="center">
        <Pressable onPress={pickImage}>
          <Avatar source={{ uri: image }} w="70px" h="70px" />

          <Icon
            pos="relative"
            top={-26}
            right={-46}
            zIndex={4}
            rounded="full"
            size={8}
            as={<Ionicons name="add-circle" size={24} />}
            color="brand.primary"
            bg="white"
          />
        </Pressable>
      </VStack>
      <Heading
        fontFamily="Inter"
        color="brand.primary"
        fontWeight="700"
        fontSize="xl"
      >
        My Profile
      </Heading>
      <ScrollView
        h="95%"
        pb={4}
        mt={6}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >
        <FormControl isInvalid={errors?.name}>
          <VStack m={2}>
            <FormControl.Label _text={{ fontSize: 16, fontWeight: "700" }}>
              Name
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
                  placeholder="Enter your name"
                  //   my={2}
                  placeholderTextColor={"blueGray.400"}
                />
              )}
              name="name"
              defaultValue={user?.displayName}
              rules={{ required: true, minLength: 8 }}
            />
            <FormControl.ErrorMessage>Name required</FormControl.ErrorMessage>
          </VStack>
        </FormControl>
        <FormControl isInvalid={errors?.email}>
          <VStack mx={2} my={2}>
            <FormControl.Label _text={{ fontSize: 16, fontWeight: "700" }}>
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
              defaultValue={user?.email}
              rules={{ required: true, pattern: /\w+\@\w+\.(\w{3}|\w{2})/ }}
            />

            <FormControl.ErrorMessage>Email required</FormControl.ErrorMessage>
          </VStack>
        </FormControl>
        <FormControl isInvalid={errors?.phone}>
          <VStack mx={2} my={2}>
            <FormControl.Label _text={{ fontSize: 16, fontWeight: "700" }}>
              Phone number
            </FormControl.Label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={(val) => onChange(val)}
                  value={value}
                  type="phone"
                  ref={ref}
                  borderColor="brand.bg2"
                  _focus={{ borderColor: "brand.primary" }}
                  variant="underlined"
                  placeholder="phone number"
                  my={2}
                  placeholderTextColor={"blueGray.400"}
                />
              )}
              name="phone"
              defaultValue={user?.phoneNumber}
              rules={{ required: true, pattern: /^(\+234|\0)\d{10}$/ }}
            />

            <FormControl.ErrorMessage>Phone required</FormControl.ErrorMessage>
          </VStack>
        </FormControl>
        {/* <FormControl isInvalid={"password" in errors}>
          <VStack mx={2} my={2}>
            <FormControl.Label _text={{ fontSize: 16, fontWeight: "700" }}>
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
          </VStack>
        </FormControl> */}
        <FormControl isRequired isInvalid={false} maxW={80}>
          <FormControl.Label
            _text={{ fontSize: 16, fontWeight: "700", marginY: 2, ml: 2 }}
          >
            Select School
          </FormControl.Label>
          <Controller
            control={control}
            name="school"
            defaultValue="js"
            render={({ field: { onChange } }) => (
              <CustomMultiSelect
                selectText="Select/Add your school"
                placeholder="Select school"
                selectedItems={selectedItems}
                onChangeInput={(text) => onChange(text)}
                onAddItem={(newItem: any) => setItems(newItem)}
                onSelectedItemsChange={onSelectItemsChange}
                items={items}
              />
            )}
          />
          <FormControl.ErrorMessage>select a school</FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={false} mb={4}>
          <FormControl.Label _text={{ fontSize: 16, fontWeight: "700", ml: 2 }}>
            Select Class
          </FormControl.Label>
          <Controller
            control={control}
            name="class"
            defaultValue="ss1"
            render={({ field: { onChange, ref, value } }) => (
              <Select
                borderColor="brand.bg2"
                variant="underlined"
                selectedValue={value}
                minWidth={140}
                accessibilityLabel="Select Class"
                placeholder="Select Class"
                onValueChange={(itemValue) => onChange(itemValue)}
                wrapperRef={ref}
                _selectedItem={{
                  bg: "brand.primary",
                  endIcon: <CheckIcon size={5} />,
                }}
                mt={1}
              >
                <Select.Item label="Senior Secondary 1" value="ss1" />
                <Select.Item label="Senior Secondary 2" value="ss2" />
                <Select.Item label="Senior Secondary 3" value="ss3" />
                <Select.Item label="Junior Secondary 1" value="jss1" />
                <Select.Item label="Junior Secondary 2" value="jss2" />
                <Select.Item label="Junior Secondary 3" value="jss3" />
              </Select>
            )}
          />
          <FormControl.ErrorMessage>select an item</FormControl.ErrorMessage>
        </FormControl>
      </ScrollView>

      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text
          mt={3}
          color="brand.primary"
          fontSize="lg"
          fontWeight="bold"
          textAlign="center"
          mb={1}
        >
          Save Changes
        </Text>
      </TouchableOpacity>
      <Pressable my={2} onPress={() => navigation.goBack()}>
        <Text color="black" fontSize="lg" textAlign="center">
          {modified ? "Go to Menu" : "Cancel"}
        </Text>
      </Pressable>
    </VStack>
  );
};
export default EditProfileScreen;
