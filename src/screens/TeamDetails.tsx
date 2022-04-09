import React, { FC } from "react";
import {
  Text,
  VStack,
  Heading,
  Box,
  Image,
  HStack,
  Avatar,
  Button,
} from "native-base";
import NavigateBack from "./../components/navigateBack";
import readableNumber from "./../util/readableNumber";

interface TeamDetailsProps {
  navigation: any;
  route: any;
}
const TeamDetailsScreen: FC<TeamDetailsProps> = ({ navigation, route }) => {
  const { team, teamAv } = route.params;
  return (
    <VStack pt={8} px={4} bg="white" h="100%">
      <NavigateBack navigation={navigation} />
      <Heading textAlign="center" my={10}>
        Team Details
      </Heading>
      <VStack
        justifyContent="center"
        alignItems="center"
        p={4}
        bg="white"
        shadow={2}
        rounded={5}
        m={3}
        borderColor="gray.300"
        borderWidth={1}
      >
        <Image
          source={typeof teamAv == "number" ? teamAv : { uri: teamAv }}
          alt="team"
          size="90px"
          resizeMode="contain"
        />
        <Text my={1}>{team?.name}</Text>
        <Text>{team?.limit}/4</Text>
      </VStack>
      <VStack px={4} mt={3}>
        <HStack justifyContent="space-between" px={2}>
          <Text fontWeight="700">Username</Text>
          <Text fontWeight="700">Dunk Points</Text>
        </HStack>
        {team?.players?.map(
          ({ playerName, playerPoints, playerPhoto }: any) => (
            <Players
              username={playerName}
              dunkPoints={playerPoints}
              photoURL={playerPhoto}
            />
          )
        )}
      </VStack>
      <Button
        variant="solid"
        bg={"brand.primary"}
        my={8}
        _pressed={{ backgroundColor: "brand.bg1" }}
        onPress={() =>
          navigation.navigate("quiz-screen", { subjectTitle: "chemistry" })
        }
      >
        Start Quiz
      </Button>
    </VStack>
  );
};

export default TeamDetailsScreen;
interface PlayerProps {
  photoURL: string;
  username: string;
  dunkPoints: number;
}
function Players({ photoURL, username, dunkPoints }: PlayerProps) {
  return (
    <HStack justifyContent="space-between" px={2} my={2}>
      <HStack alignItems="flex-start">
        <Avatar source={{ uri: photoURL }} size="40px" />
        <Text m={2}>{username}</Text>
      </HStack>
      <Text m={2}>{readableNumber(dunkPoints)}</Text>
    </HStack>
  );
}
