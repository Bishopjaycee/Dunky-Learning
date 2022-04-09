import React, { useEffect, useState } from "react";
import { VStack, Text, Heading, FlatList, Box, Icon } from "native-base";
import NavigateBack from "../components/navigateBack";
import TeamCard from "../components/teamCard";
import { Ionicons } from "@expo/vector-icons";
import useGame from "./../util/use-game";
import { ActivityIndicator } from "react-native";

interface TeamSelectionProps {
  navigation: any;
  route: any;
}
export default function TeamSelection({
  navigation,
  route,
}: TeamSelectionProps) {
  const { competitionType } = route.params;
  const [isLoaded, setIsLoaded] = useState(false);
  const [teams, setTeams] = useState([]) as any;
  const { fetchTeams } = useGame();

  useEffect(() => {
    fetchTeams().then((teams) => {
      setTeams(teams as any);
      setIsLoaded(true);
    });
  }, [isLoaded]);

  const onTap = (team: any, avatar: any) => {
    navigation.navigate("team-details", { team, teamAv: avatar });
  };

  const _renderItem = ({ item, index }: any) => {
    return (
      <TeamCard
        key={index}
        onPress={() => onTap(item, item.teamPhotoUrl)}
        width={10}
        joinable={true}
        teamName={item.name}
        dunkPoints={item.dunkPoints}
        avatar={item.teamPhotoUrl}
        locked={item.limit >= 4}
      />
    );
  };

  // if (isLoaded) {
  //   return (
  //     <VStack justifyContent="center" alignItems="center" mt={20} p={20}>
  //       <ActivityIndicator size="large" color="#5956E9" />
  //     </VStack>
  //   );
  // }

  return (
    <VStack h="100%" bg="white" pt={8}>
      <NavigateBack navigation={navigation} />
      <Heading textAlign="center" mt={10} fontSize={20}>
        {competitionType}
      </Heading>
      <Box alignSelf="flex-end" px={4}>
        <Icon
          m="auto"
          as={<Ionicons name="add-circle-outline" />}
          size={"32px"}
          color="black"
          onPress={() => navigation.navigate("create-team")}
        />

        <Text fontSize={8} my={1} textAlign="center">
          Create a team
        </Text>
      </Box>

      {teams.length <= 0 ? (
        <Text my={8} px={8}>
          Use the button above to create a team
        </Text>
      ) : (
        <VStack mt={4} py={6} h={620} px={4}>
          <Text px={4} mb={3}>
            Join a team
          </Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={teams}
            renderItem={_renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </VStack>
      )}
    </VStack>
  );
}
