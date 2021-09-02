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
import { TouchableOpacity } from "react-native-gesture-handler";
import { useUser } from "./../util/use-user";

type Data = {
  img: any;
  header: string;
  text: string;
  path: string;
};
const data: Data[] = [
  {
    img: require("../assets/images/add.png"),
    header: "Create Assignment",
    text: "",
    path: "create-assignment",
  },
  {
    img: require("../assets/images/assignment.png"),
    header: "Assignments",
    text: "All assignments in one place.",
    path: "teacher-assignment",
  },
  {
    img: require("../assets/images/microphone.png"),
    header: "Announcement",
    text: "All assignments in one place.",
    path: "teacher-announcement",
  },
  {
    img: require("../assets/images/result.png"),
    header: "Result",
    text: "Students Results in one place.",
    path: "students-result",
  },
];

interface HomeProp {
  navigation: any;
  route: any;
}

const TeacherHomeScreen: FC<HomeProp> = ({ navigation }) => {
  const [value, setValue] = useState("");
  const { isLoading, userName } = useUser();

  if (isLoading) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <VStack bg="white" _text={{ marginTop: 40 }} px={8} h="100%">
        <HamburgerAndBell navigation={navigation} />
        <Box mt={4}>
          <Heading fontSize={18} my={4}>
            {`Hello ${userName?.split(" ")[0]},`}
          </Heading>
          <Text textAlign="left">
            Welcome Dunky Learning. What do you want to do today?
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

        <SimpleGrid columns={2} space={5} mt={10}>
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
                <Image
                  source={item.img}
                  alt={item.header}
                  w={item.header == "Result" ? "80px" : 16}
                  h={item.header == "Result" ? "70px" : 16}
                  resizeMode="center"
                  my={2}
                />
                <Heading fontSize={12} my={4} fontWeight="900">
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
    );
  }
};

export default TeacherHomeScreen;
