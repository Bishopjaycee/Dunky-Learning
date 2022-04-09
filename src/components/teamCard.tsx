import { Heading, Image, Pressable, Text, Box } from "native-base";
import React from "react";
import Svg, { Path } from "react-native-svg";
import readableNumber from "./../util/readableNumber";

interface TeamCardProps {
  onPress: () => void;
  teamName: string;
  avatar: any;
  dunkPoints: number;
  locked: boolean;
  width: number | string;
  joinable: boolean;
}

export default function TeamCard({
  teamName,
  avatar,
  dunkPoints,
  width,
  locked = false,
  joinable = false,
  onPress,
}: Partial<TeamCardProps>) {
  return (
    <Pressable
      onPress={onPress}
      shadow={3}
      bg="white"
      w={width}
      flex={1}
      h="200px"
      px={4}
      py={6}
      alignSelf="center"
      m={3}
      rounded={5}
      _disabled={{ bg: "gray.100" }}
      disabled={locked}
    >
      <Image
        source={{ uri: avatar }}
        alt="team-name"
        m="auto"
        size="90px"
        style={{ opacity: locked ? 0.3 : 1 }}
      />
      <Heading fontSize={16} textAlign="center" my={1}>
        {teamName}
      </Heading>
      {dunkPoints && (
        <Text fontSize={10} opacity={0.6} textAlign="center" mb={1}>
          {readableNumber(dunkPoints)} Points
        </Text>
      )}
      {joinable && (
        <Box m={"auto"}>
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
            <Text textAlign="center" my={1} color="blue.700">
              Join
            </Text>
          )}
        </Box>
      )}
    </Pressable>
  );
}
