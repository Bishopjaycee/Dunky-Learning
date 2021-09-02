import React, { FC } from "react";
import {
  VStack,
  Text,
  Pressable,
  Heading,
  ScrollView,
  Box,
  Avatar,
  HStack,
} from "native-base";
import { Entypo } from "@expo/vector-icons";
import Top3Card from "../components/top3card";
import LeaderboardCard from "../components/leaderboardCard";

interface LeardershipBoardProps {
  navigation: any;
}
const LeadershipBoard: FC<LeardershipBoardProps> = ({ navigation }) => {
  return (
    <>
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
      <VStack alignItems="center" h="100%" bg="white" px={6}>
        <Heading my={10}>Leaderboard</Heading>
        <Text textAlign="center" mb={2}>
          “Winning isn't everything, it's the only thing.” -Vince Lombardi.
        </Text>
        <HStack justifyContent="space-between" mb={10}>
          <Top3Card rank={2} />
          <Top3Card rank={1} />
          <Top3Card rank={3} />
        </HStack>

        <ScrollView
          pos="relative"
          h="80px"
          mt={"40px"}
          w="100%"
          px={2}
          pb={6}
          showsVerticalScrollIndicator={false}
          safeAreaBottom
        >
          <LeaderboardCard />
          <LeaderboardCard />
          <LeaderboardCard />
          <LeaderboardCard />
          <LeaderboardCard />
          <LeaderboardCard />
          <LeaderboardCard />
          <LeaderboardCard />
          <LeaderboardCard />
          <LeaderboardCard />
          <LeaderboardCard />
          <LeaderboardCard />
          <LeaderboardCard />
          <LeaderboardCard />
          <LeaderboardCard />
          <LeaderboardCard />
          <LeaderboardCard />
          <LeaderboardCard />
        </ScrollView>
      </VStack>
    </>
  );
};

export default LeadershipBoard;
