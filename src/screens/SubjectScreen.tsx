import {
  Box,
  Heading,
  Icon,
  Image,
  Input,
  Text,
  VStack,
  FlatList,
  Pressable,
  HStack,
} from "native-base";
import React, { FC, useEffect, useState } from "react";
import HamburgerAndBell from "../components/hamburgerBell";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native";
import { SubjectModel } from "../models/firebase.model";
import { useGetSubjects } from "../util/subject";
import { useWindowDimensions } from "react-native";

const filterData = (data: SubjectModel[], search: string) => {
  return data.filter((dt) => dt.title.match(search));
};
interface SubjectProp {
  navigation: any;
}

const SubjectScreen: FC<SubjectProp> = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [viewAll, setViewAll] = useState(true);
  const [subjects, setSubjects] = useState<SubjectModel[]>([]);
  const { width } = useWindowDimensions();
  const startQuiz = (title: string, image: string) => {
    title.toLowerCase();
    navigation.navigate("start-quiz", { title: title, image: image });
  };

  async function getSubjects() {
    const subjects = await useGetSubjects();
    setSubjects(subjects as unknown as SubjectModel[]);
  }

  useEffect(() => {
    getSubjects();
    return () => {
      getSubjects();
    };
  }, []);

  return (
    <VStack bg="white" w={width}>
      <Box mx={4} p={3}>
        <HamburgerAndBell navigation={navigation} />
        {viewAll && (
          <Box mt={"6%"}>
            <Text textAlign="left" fontWeight="600" fontFamily="Inter">
              Assess and evaluate yourself and stand a change to be rewarded.
            </Text>
            <Text fontSize={12} my={4} fontWeight="400">
              Select your subject to continue.
            </Text>
          </Box>
        )}
        <Input
          mt={viewAll ? 4 : 8}
          h={12}
          borderRadius={0}
          value={search}
          borderColor="#DFE2EB"
          _focus={{ borderColor: "brand.primary" }}
          onChangeText={setSearch}
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
      </Box>
      <VStack p={3} mt={"-20%"} pb={"5%"} h={"100%"} alignItems="center">
        <HStack
          justifyContent="space-between"
          my={2}
          alignSelf="stretch"
          mx={"5%"}
        >
          <Text fontWeight="bold">Subjects</Text>
          <Pressable onPress={() => setViewAll(!viewAll)}>
            <Text fontWeight="bold" color="brand.primary">
              {viewAll ? "View All" : "Show Less"}
            </Text>
          </Pressable>
        </HStack>

        {subjects.length > 0 ? (
          <FlatList
            mt={6}
            numColumns={2}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            initialNumToRender={4}
            data={search === "" ? subjects : filterData(subjects, search)}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => startQuiz(item.title, item.photoUrl)}
                key={item.title}
              >
                <VStack
                  bg="white"
                  alignItems="center"
                  justifyContent="space-evenly"
                  p={2}
                  mx={2}
                  h={"156px"}
                  w="146px"
                  style={{
                    shadowColor: "black",
                    shadowRadius: 14,
                    shadowOpacity: 0.9,
                    shadowOffset: {
                      width: 5,
                      height: 4,
                    },
                  }}
                  border={0.5}
                  borderRadius={10}
                  borderColor="#ADB2C7"
                  mb={6}
                >
                  <Image
                    source={{ uri: item.photoUrl }}
                    alt={item.title}
                    size={16}
                  />
                  <Heading
                    fontSize={"lg"}
                    my={2}
                    textAlign="center"
                    textTransform="capitalize"
                  >
                    {item.title}
                  </Heading>
                </VStack>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.title}
          />
        ) : (
          <Box p={10} pt={20}>
            <ActivityIndicator size="small" color="#5956E9" />
          </Box>
        )}
      </VStack>
    </VStack>
  );
};

export default React.memo(SubjectScreen);
