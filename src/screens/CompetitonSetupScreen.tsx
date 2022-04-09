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
  Image,
  Box,
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
import Svg, { Path } from "react-native-svg";
import useGame from "../util/use-game";

interface CompetitionSetupScreenProps {
  route: any;
  navigation: any;
}
const CompetitionSetupScreen: FC<CompetitionSetupScreenProps> = ({
  navigation,
}) => {
  const { userName } = useUser();
  const { addGameDetails } = useGame();

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

      addGameDetails({
        subjects: selectedItem,
        gameName: data.name,
      });
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
                name="name"
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
        <VStack>
          <Text my={6} px={6} fontSize="sm" textAlign="center">
            Are you ready for a mind blowing learning experience?
          </Text>
          <Box w="100%" mt={20}>
            <Text px={8} my={3}>
              Championship Category
            </Text>
            <HStack justifyContent="center" px={4}>
              <CategoryCard
                navigation={navigation}
                competition="Intra School"
                image={require("../assets/images/intra-school.png")}
              />
              <CategoryCard
                navigation={navigation}
                competition="Inter School"
                image={require("../assets/images/inter-school.png")}
                locked={true}
              />

              <CategoryCard
                navigation={navigation}
                competition="Inter School"
                image={require("../assets/images/regional.png")}
                locked={true}
              />
            </HStack>
          </Box>
          {/* <Box px={4} mt={8}>
            <Button
              variant="solid"
              bg={isValid ? "brand.primary" : "brand.bg2"}
              my={4}
              _pressed={{ backgroundColor: "brand.bg1" }}
              onPress={handleSubmit(onSubmit)}
            >
              Dunk
            </Button>
            <Button
              variant="solid"
              bg={isValid ? "brand.primary" : "brand.bg2"}
              my={2}
              _pressed={{ backgroundColor: "brand.bg1" }}
              onPress={handleSubmit(onSubmit)}
            >
              Dunk
            </Button>
          </Box> */}
        </VStack>
      )}
    </VStack>
  );
};

export default CompetitionSetupScreen;
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

interface CategoryCard {
  navigation: any;
  competition: string;
  image: any;
  locked: boolean;
}

function CategoryCard({
  competition,
  navigation,
  image,
  locked = false,
}: Partial<CategoryCard>) {
  return (
    <Pressable
      d="flex"
      alignItems="center"
      shadow={2}
      bg="white"
      w={"30%"}
      px={4}
      py={6}
      alignSelf="center"
      m={2}
      onPress={() =>
        navigation.navigate("select-team", { competitionType: competition })
      }
      rounded={5}
      _disabled={{ bg: "gray.100" }}
      disabled={locked}
    >
      <Image source={image} alt="team-name" size="60px" m="auto" />
      <Heading fontSize={11} textAlign="center" my={2}>
        {competition}
      </Heading>
      {locked ? (
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
      ) : (
        <Box size={6} />
      )}
    </Pressable>
  );
}
