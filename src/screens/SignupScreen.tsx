import React, { FC, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import { useForm, Controller } from "react-hook-form";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import {
  Box,
  FormControl,
  Stack,
  CheckIcon,
  Input,
  Icon,
  Button,
  ScrollView,
  Select,
  IconButton,
} from "native-base";
import CustomMultiSelect from "./../components/multiSelect";
import getMultiSelectedItems from "./../util/getMultiSelectedItem";
import { Alert, useWindowDimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
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

interface SignupScreenProp {
  navigation: any;
  route: any;
}
const SignupScreen: FC<SignupScreenProp> = ({ route, navigation }) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const [items, setItems] = useState<{ id: string; name: string }[]>(data);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  let { user } = route.params;

  const onSelectItemsChange = (selectedItem: any[]) => {
    setSelectedItems(selectedItem);
  };
  const { signUp, isLoading, error } = useUser();

  // const { height, width } = useWindowDimensions();

  const onSubmit = async (data: any) => {
    await signUp(data);
    if (error) {
      Alert.alert("Error", error);
    }

    if (!isLoading) {
      navigation.navigate("phoneVerificationScreen");
    }
  };

  useEffect(() => {
    setValue("role", user);
    setValue("school", getMultiSelectedItems(items, selectedItems));
  }, [selectedItems, items]);

  return (
    <Box p={5} h="100%" bg="white" pt={3}>
      <ScrollView
        h="75%"
        pb={4}
        mt={"20%"}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <FormControl isRequired isInvalid={errors?.name}>
          <Stack m={2}>
            <FormControl.Label
              _text={{
                fontSize: 16,
                fontWeight: "700",
                marginY: 2,
                textTransform: "capitalize",
              }}
            >
              <Icon
                mr={2}
                my={1.5}
                as={
                  <Svg width="20" height="19" viewBox="0 0 20 19" fill="none">
                    <Path
                      d="M5.27429 4.5C5.27429 6.981 7.37742 9 9.96179 9C12.5462 9 14.6493 6.981 14.6493 4.5C14.6493 2.019 12.5462 0 9.96179 0C7.37742 0 5.27429 2.019 5.27429 4.5ZM18.2951 19H19.3368V18C19.3368 14.141 16.0649 11 12.0451 11H7.87846C3.85763 11 0.586792 14.141 0.586792 18V19H18.2951Z"
                      fill="#868686"
                    />
                  </Svg>
                }
              />
              {`${user}'s full name`}
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
                  placeholder="First name last name "
                  my={2}
                  placeholderTextColor={"blueGray.400"}
                />
              )}
              name="name"
              defaultValue=""
              rules={{ required: true, minLength: 5 }}
            />
            <FormControl.ErrorMessage>Name required</FormControl.ErrorMessage>
          </Stack>
        </FormControl>
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
              rules={{ required: "Password required", minLength: 5 }}
            />

            <FormControl.ErrorMessage>
              {errors.password?.message}
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl>
        {user == "teacher" || user == "student" ? (
          <FormControl isRequired isInvalid={"school" in errors}>
            <FormControl.Label
              _text={{ fontSize: 16, fontWeight: "700", marginY: 2, ml: 2 }}
            >
              Select School
            </FormControl.Label>
            <Controller
              control={control}
              name="school"
              defaultValue=""
              rules={{ required: "school required" }}
              render={({ field: { onChange } }) => (
                <CustomMultiSelect
                  selectText="Select/Add your school"
                  placeholder="Select school"
                  selectedItems={selectedItems}
                  onChangeInput={(val) => onChange(val)}
                  onAddItem={(newItem: any) => setItems(newItem)}
                  onSelectedItemsChange={onSelectItemsChange}
                  items={items}
                />
              )}
            />
            <FormControl.ErrorMessage>select a school</FormControl.ErrorMessage>
          </FormControl>
        ) : (
          <FormControl isRequired isInvalid={"school" in errors} mb={4}>
            <FormControl.Label
              _text={{ fontSize: 16, fontWeight: "700", marginY: 2, ml: 2 }}
            >
              Your child's school
            </FormControl.Label>
            <Controller
              control={control}
              name="school"
              defaultValue="ss1"
              rules={{ required: "school required" }}
              render={({ field: { onChange, ref, value } }) => (
                <Select
                  borderColor="brand.bg2"
                  variant="underlined"
                  selectedValue={value}
                  minWidth={140}
                  accessibilityLabel="Select school"
                  placeholder="Select school"
                  onValueChange={(itemValue) => onChange(itemValue)}
                  wrapperRef={ref}
                  _selectedItem={{
                    bg: "brand.primary",
                    endIcon: <CheckIcon size={5} />,
                  }}
                  mt={1}
                >
                  <Select.Item label="School 1" value="ss1" />
                  <Select.Item label="School 2" value="ss2" />
                  <Select.Item label="School 3" value="ss3" />
                </Select>
              )}
            />
            <FormControl.ErrorMessage>select a school</FormControl.ErrorMessage>
          </FormControl>
        )}
        <FormControl isRequired isInvalid={"subjectArea" in errors}>
          <FormControl.Label
            _text={{ fontSize: 16, fontWeight: "700", marginY: 2, ml: 2 }}
          >
            Subject Area
          </FormControl.Label>
          <Controller
            control={control}
            name="subjectArea"
            defaultValue="sciences"
            rules={{ required: "subject required" }}
            render={({ field: { onChange, ref, value } }) => (
              <Select
                borderColor="brand.bg2"
                variant="underlined"
                selectedValue={value}
                minWidth={140}
                accessibilityLabel="Select Subject Area"
                placeholder="Select Subject Area"
                onValueChange={(itemValue) => onChange(itemValue)}
                wrapperRef={ref}
                _selectedItem={{
                  bg: "brand.primary",
                  endIcon: <CheckIcon size={5} />,
                }}
                mt={1}
              >
                <Select.Item label="Sciences" value="sciences" />
                <Select.Item label="Arts" value="arts" />
              </Select>
            )}
          />
          <FormControl.ErrorMessage>select an item</FormControl.ErrorMessage>
        </FormControl>
        {(user == "teacher" || user == "student") && (
          <FormControl isRequired isInvalid={"class" in errors} mb={4}>
            <FormControl.Label
              _text={{ fontSize: 16, fontWeight: "700", marginY: 2, ml: 2 }}
            >
              {user == "teacher" ? "Class you teach" : "Select Class"}
            </FormControl.Label>
            <Controller
              control={control}
              name="class"
              defaultValue="ss1"
              rules={{ required: "class required" }}
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
                  {user == "teacher" ? (
                    <Select.Item label="All Senior" value="all" />
                  ) : (
                    <></>
                  )}
                </Select>
              )}
            />
            <FormControl.ErrorMessage>select an item</FormControl.ErrorMessage>
          </FormControl>
        )}
      </ScrollView>
      <Button
        variant="solid"
        bg="brand.primary"
        my={10}
        _pressed={{ backgroundColor: "brand.bg1" }}
        onPress={handleSubmit(onSubmit)}
        isLoading={isSubmitting}
        isLoadingText="Signing up..."
      >
        Signup
      </Button>
    </Box>
  );
};

export default SignupScreen;
