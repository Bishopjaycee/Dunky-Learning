import React, { FC, useState } from "react";
import {
  Pressable,
  Text,
  Heading,
  VStack,
  Input,
  Icon,
  ScrollView,
  Avatar,
  HStack,
  FlatList,
} from "native-base";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ListStudentProps {
  navigation: any;
  route: { params: any };
}

const ListStudent: FC<ListStudentProps> = ({ navigation, route }) => {
  const arr = new Array(10);
  const [value, setValue] = useState("");
  const [studentList, setStudentList] = useState([
    "dsew",
    "ewew3",
    "wer5",
    "6ff",
    "73wee",
    "lhf",
    "9gfhf",
    "2thd",
    "fhfd3",
    "fhd3",
    "2jtr",
    "rs 6",
    "sgd7",
    "8ueee",
    "2dfd3",
    "23fgdh2",
    "5ukf",
  ]);
  const { students } = route.params;
  return (
    <VStack bg="white" pt={10} px={8} h="100%">
      <Pressable
        onPress={() => navigation.goBack()}
        pos="absolute"
        bg="brand.primary"
        pl={8}
        top={10}
        p={2}
        zIndex={2}
        roundedBottomRight="xl"
        roundedTopRight="xl"
      >
        <Entypo
          name="chevron-with-circle-left"
          size={24}
          color="white"
          style={{ marginLeft: 8 }}
        />
      </Pressable>
      <Heading textAlign="center" mt={10} fontSize={24}>
        {students}
      </Heading>
      <Input
        mt={6}
        mb={1}
        h={12}
        pt={2}
        borderRadius={2}
        value={value}
        borderColor="#DFE2EB"
        _focus={{ borderColor: "brand.primary" }}
        onChangeText={setValue}
        placeholder="Search"
        InputLeftElement={
          <Icon
            as={<Ionicons name="ios-search-outline" size={14} />}
            ml={2}
            h={8}
            color="#DFE2EB"
          />
        }
      />
      <Text mt={1} alignSelf="flex-end" mb={6} fontSize={11}>
        {studentList.length} students
      </Text>

      <FlatList
        h={500}
        showsVerticalScrollIndicator={false}
        data={
          value == ""
            ? studentList
            : studentList.filter((item) => item.match(value))
        }
        keyExtractor={(index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {}}
            key={index * Math.random() * 10000}
          >
            <HStack
              px={2}
              py={2}
              mb={4}
              borderRadius={4}
              borderWidth={1}
              borderColor="#EAEFF6"
              alignItems="flex-start"
            >
              <Avatar
                source={require("../assets/images/chemistry.png")}
                size="md"
              />
              <VStack ml={4}>
                <Heading fontWeight="700" fontSize={14}>
                  Paul Agu
                </Heading>
                <Text fontSize={10} opacity={0.7}>
                  FG/ER/5533/93
                </Text>
                <Text fontSize={9} opacity={0.7} mr={2} color="green.600">
                  Active {item}
                </Text>
              </VStack>
            </HStack>
          </TouchableOpacity>
        )}
      />

      {studentList.length <= 0 && (
        <Text textAlign="center" my={20}>
          No student found
        </Text>
      )}
    </VStack>
  );
};

export default ListStudent;
