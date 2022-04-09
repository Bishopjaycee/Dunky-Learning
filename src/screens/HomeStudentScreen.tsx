import React, { FC, useState, useEffect } from "react";
import {
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  Center,
  Input,
  SimpleGrid,
  Text,
  VStack,
} from "native-base";
import HamburgerAndBell from "../components/hamburgerBell";
import { Ionicons } from "@expo/vector-icons";
import {
  Dimensions,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { QuestionModel } from "../models/firebase.model";
import { useUser } from "./../util/use-user";
import { db } from "../util/firebase";

type Data = {
  img: any;
  header: string;
  text: string;
  path: string;
};
const data: Data[] = [
  {
    img: require("../assets/images/wkprogress.png"),
    header: "Weekly Progress",
    text: "View your weekly learning progress level",
    path: "progress",
  },
  {
    img: require("../assets/images/leaderboard.png"),
    header: "Leaderboard",
    text: "View and follow positions of the best students",
    path: "leadership-board",
  },
  {
    img: require("../assets/images/rewardcenter.png"),
    header: "Reward Centre",
    text: "Exchange your Dunks for mobile airtime",
    path: "reward-center",
  },
  {
    img: require("../assets/images/assignment.png"),
    header: "My Assignments",
    text: "Get access to your school assignment",
    path: "assignment",
  },
];

interface HomeProp {
  navigation: any;
  route: any;
}

const HomeScreen: FC<HomeProp> = ({ navigation }) => {
  const [value, setValue] = useState("");
  const { height } = useWindowDimensions();
  const { userId, userName, isLoading, dunkPoint } = useUser();

  return !isLoading ? (
    <VStack bg="white" px={8} h={height}>
      <HamburgerAndBell navigation={navigation} />
      <Box mt={4}>
        <Heading fontSize={18} my={4}>
          {`Hello ${userName?.split(" ")[0] ?? ""},`}
        </Heading>
        <Text textAlign="left">
          Welcome to Dunky Learning. What’s on your mind today?
        </Text>
      </Box>
      <Input
        mt={4}
        h={12}
        borderRadius={0}
        value={value}
        borderColor="#DFE2EB"
        _focus={{ borderColor: "brand.primary" }}
        onChangeText={setValue}
        placeholder="Search"
        InputLeftElement={
          <Icon
            as={<Ionicons name="ios-search-outline" size={16} />}
            ml={2}
            h={8}
            color="#DFE2EB"
          />
        }
      />
      <HStack
        borderWidth={1}
        shadow={0.7}
        borderColor="#DFE2EB"
        p={2}
        justifyContent="space-between"
        mt={6}
      >
        <Text fontWeight="bold">Dunk Balance</Text>
        {dunkPoint > 0 ? (
          <Text>{dunkPoint}</Text>
        ) : (
          <ActivityIndicator color="#5956E9" size="small" />
        )}
      </HStack>
      <SimpleGrid columns={2} space={5} my={4}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(item.path)}
          >
            <VStack
              alignItems="center"
              justifyContent="space-evenly"
              p={4}
              h={140}
              w="140px"
              style={{
                shadowColor: "#000",
                shadowRadius: 14,
                shadowOpacity: 0.9,
                shadowOffset: {
                  width: 5,
                  height: 4,
                },
              }}
              border={1}
              borderRadius={15}
              borderColor="#DFD2D9"
            >
              <Image source={item.img} alt={item.header} size={16} my={2} />
              <Heading fontSize={12} my={4}>
                {item.header}
              </Heading>
              <Text fontSize={9} textAlign="center" my={1}>
                {item.text}
              </Text>
            </VStack>
          </TouchableOpacity>
        ))}
      </SimpleGrid>
    </VStack>
  ) : (
    <Box pb={40}>
      <Center mt={320}>
        <ActivityIndicator color="#5956E9" size="large" />
        <Text my={4} opacity={0.4}>
          Loading your data ...
        </Text>
      </Center>
    </Box>
  );
};

export default HomeScreen;
