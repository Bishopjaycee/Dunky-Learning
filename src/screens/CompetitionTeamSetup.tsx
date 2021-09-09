import React, { FC } from "react";
import {
  Box,
  VStack,
  Text,
  Image,
  Heading,
  HStack,
  Pressable,
} from "native-base";
import NavigateBack from "../components/navigateBack";
import Svg, { Path } from "react-native-svg";
import { TouchableOpacity } from "react-native";

interface CompetitionTeamSetupProps {
  navigation: any;
}
const CompetitionTeamSetup: FC<CompetitionTeamSetupProps> = ({
  navigation,
}) => {
  return (
    // TODO
    <VStack h="100%" bg="white" w="100%" py={20} alignItems="flex-start">
      <NavigateBack navigation={navigation} />
      <Text textAlign="center" px={10} my={6}>
        Are you ready for a mind blowing learning experience?
      </Text>
      <Box>
        <Text px={8}>Check out the trending teams </Text>
        <Box
          shadow={2}
          bg="white"
          w={"40%"}
          h="50%"
          px={4}
          py={6}
          alignSelf="center"
          m={3}
          rounded={5}
        >
          <Image
            source={require("../assets/images/app-icon.png")}
            alt="team-name"
            m="auto"
            size="90px"
          />
          <Heading fontSize={16} textAlign="center">
            Team Omega
          </Heading>
          <Text fontSize={10} opacity={0.6} textAlign="center">
            80,000 Points
          </Text>
        </Box>
      </Box>
      <Box w="100%" mt={-10}>
        <Text px={8} my={3}>
          Championship Category
        </Text>
        <HStack justifyContent="center" px={4}>
          <CategoryCard
            competition="Inter School"
            image={require("../assets/images/intra-school.png")}
          />
          <CategoryCard
            competition="Inter School"
            image={require("../assets/images/inter-school.png")}
            locked={true}
          />

          <CategoryCard
            competition="Inter School"
            image={require("../assets/images/regional.png")}
            locked={true}
          />
        </HStack>
      </Box>
    </VStack>
  );
};

export default CompetitionTeamSetup;

interface CategoryCard {
  navigation: any;
  competition: string;
  image: any;
  locked: boolean;
}

function CategoryCard({
  competition,
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
      rounded={ 5 }
      _disabled={{bg:"gray.100"}}
      disabled={locked}
    >
      <Image source={image} alt="team-name" size="60px" m="auto" />
      <Heading fontSize={12} textAlign="center" my={2}>
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
