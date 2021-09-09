import {
  VStack,
  FlatList,
  Heading,
  Text,
  Factory,
  HStack,
  Pressable,
  FormControl,
  Button,
  Icon,
  Input,
} from "native-base";
import React, { FC, useState, useEffect } from "react";
import StepIndicator from "react-native-step-indicator";
import SubjectCard from "./../components/subjectCard";
import { useForm, Controller } from "react-hook-form";
import { FontAwesome5 } from "@expo/vector-icons";
import { SubjectModel } from "../models/firebase.model";
import { ActivityIndicator } from "react-native";
import { useUser } from "./../util/use-user";
import { useGetSubjects } from "../util/subject";

interface CompetitionSetupScreenProps {
  route: any;
  navigation: any;
}
const CompetitionSetupScreen: FC<CompetitionSetupScreenProps> = ({
  navigation,
}) => {
  const { userName } = useUser();
  const [currentPosition, currentPositionSet] = useState(0);
  const [selectedItem, selectedItemSet] = useState<string[]>(["English"]);
  const [subjects, setSubjects] = useState<SubjectModel[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const FactoryStepIndicator = Factory(StepIndicator);

  const tap = (title: string, checked: boolean) => {
    //adds course to the selected item array
    if (!checked) {
      selectedItemSet((prev) => {
        if (!prev.includes(title) && prev.length <= 4) {
          return [...prev, title];
        } else {
          return prev;
        }
      });
    }

    //removes checked course in the selected item array
    if (checked) {
      let items = selectedItem.slice(0);
      let index = items.indexOf(title);
      items.splice(index, 1);
      selectedItemSet(items);
    }
  };

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = (data: any) => {
    if (currentPosition < 2) {
      currentPositionSet(currentPosition + 1);
    } else {
      null;
    }
  };

  //Load the subject from the database
  async function getSubjects() {
    const subjects = await useGetSubjects();
    setSubjects(subjects as unknown as SubjectModel[]);
    setIsLoaded(true);
  }
  useEffect(() => {
    getSubjects();
    return () => {
      getSubjects();
    };
  }, []);

  if (subjects.length <= 0 && isLoaded) {
    return (
      <VStack w="full" h="full" justifyContent="center" alignItems="center">
        <Text textAlign="center">No subject loaded</Text>
      </VStack>
    );
  }

  return (
    <VStack bg="white" h="100%" pt={8}>
      <Heading mt={10} fontSize="xl" mx={4} ml={12} fontWeight="800">
        Welcome {userName?.split(" ")[0]},
      </Heading>
      <Text mx={6} ml={12} my={4} fontSize="md" fontFamily="Inter">
        Setting up your game space
      </Text>
      <FactoryStepIndicator
        customStyles={customStyles}
        currentPosition={currentPosition}
        stepCount={3}
        onPress={(pos) => currentPositionSet(pos)}
      />
      {currentPosition == 0 && (
        <VStack>
          <HStack justifyContent="space-around" mx={4}>
            <Text mt={4} fontSize="xs" textAlign="center">
              Select English and three other subject
            </Text>
            {selectedItem.length > 3 && (
              <Pressable
                onPress={() => {
                  currentPositionSet(currentPosition + 1);
                }}
                mr={2}
              >
                <Text
                  color="brand.primary"
                  mt={3}
                  fontSize="md"
                  fontWeight="bold"
                >
                  Next
                </Text>
              </Pressable>
            )}
          </HStack>
          {isLoaded ? (
            <FlatList
              mt={4}
              pb={2}
              h={520}
              mx={1}
              data={subjects}
              numColumns={3}
              horizontal={false}
              renderItem={({ item, index }) => (
                <SubjectCard
                  key={index}
                  items={selectedItem}
                  onTap={tap}
                  title={item.title}
                  image={{ uri: item.photoUrl }}
                />
              )}
              keyExtractor={(item) => item.title}
            />
          ) : (
            <VStack justifyContent="center" alignItems="center" mt={20} p={20}>
              <ActivityIndicator size="large" color="#5956E9" />
            </VStack>
          )}
        </VStack>
      )}
      {currentPosition == 1 && (
        <VStack p={8}>
          <FormControl isInvalid={errors?.username}>
            <VStack m={2}>
              <FormControl.Label
                _text={{ fontSize: 16, fontWeight: "700", marginY: 0 }}
              >
                <Icon
                  mr={2}
                  size={6}
                  as={<FontAwesome5 name="user-alt" color="black" />}
                />
                Creat game name
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
                    my={2}
                    placeholderTextColor={"blueGray.400"}
                  />
                )}
                name="username"
                defaultValue=""
                rules={{ required: true, minLength: 4 }}
              />
              <FormControl.ErrorMessage>Name required</FormControl.ErrorMessage>
            </VStack>
          </FormControl>
          <Button
            variant="solid"
            bg={isValid ? "brand.primary" : "brand.bg2"}
            my={10}
            _pressed={{ backgroundColor: "brand.bg1" }}
            onPress={handleSubmit(onSubmit)}
          >
            Next
          </Button>
        </VStack>
      )}
      {currentPosition == 2 && (
        <VStack p={6}>
          <Text m={2} fontSize="xs">
            Lets see how you shoot shots
          </Text>
          <FormControl isInvalid={errors?.question}>
            <VStack m={2}>
              <FormControl.Label
                _text={{ fontSize: 16, fontWeight: "700", marginY: 0 }}
              >
                What is the largest river in the world?
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
                    placeholder="Answer"
                    my={2}
                    placeholderTextColor={"blueGray.400"}
                  />
                )}
                name="question"
                defaultValue=""
                rules={{ required: true, minLength: 3 }}
              />
              <FormControl.ErrorMessage>
                Answer required
              </FormControl.ErrorMessage>
            </VStack>
            <Pressable onPress={() => navigation.navigate("team-setup")}>
              <Text
                fontSize="md"
                fontWeight="bold"
                color="brand.primary"
                textAlign="right"
                mr={4}
              >
                Skip
              </Text>
            </Pressable>
          </FormControl>
          <Button
            variant="solid"
            bg={isValid ? "brand.primary" : "brand.bg2"}
            my={10}
            _pressed={{ backgroundColor: "brand.bg1" }}
            onPress={handleSubmit(onSubmit)}
          >
            Dunk
          </Button>
        </VStack>
      )}
    </VStack>
  );
};

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#5956E9",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#5956E9",
  stepStrokeUnFinishedColor: "#D9E3F5",
  separatorFinishedColor: "#5956E9",
  separatorUnFinishedColor: "#D9E3F5",
  stepIndicatorFinishedColor: "#5956E9",
  stepIndicatorUnFinishedColor: "#D9E3F5",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#5956E9",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: "#5956E9",
};
export default CompetitionSetupScreen;
