import { Box, HStack, Pressable, Text, VStack } from "native-base";
import React, { FC } from "react";
import Svg, { Text as SVGText, Circle, Path } from "react-native-svg";

interface Props {
  navigation: any;
}
const HamburgerAndBell: FC<Props> = ({ navigation }) => {
  return (
    <HStack mt={20} h="10%" w="100%" justifyContent="space-between" p={2}>
      <Pressable onPress={() => navigation.toggleDrawer()}>
        <Svg width="35" height="27" viewBox="0 0 25 17" fill="none">
          <Path
            d="M1.59863 8.33333H13.5001M1.59863 1H23.5986M1.59863 15.6667H23.5986"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </Svg>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("notifications")}
        mt={-2}
        pos="relative"
        top={-1}
      >
        <Svg width="44" height="48" viewBox="0 0 34 38" fill="none">
          <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.50083 17.7871V17.5681C3.53295 16.9202 3.7406 16.2925 4.10236 15.7496C4.7045 15.0975 5.1167 14.2983 5.29571 13.436C5.29571 12.7695 5.29571 12.0935 5.35393 11.427C5.65469 8.21842 8.82728 6 11.9611 6H12.0387C15.1725 6 18.345 8.21842 18.6555 11.427C18.7137 12.0935 18.6555 12.7695 18.704 13.436C18.8854 14.3003 19.2972 15.1019 19.8974 15.7591C20.2618 16.2972 20.4698 16.9227 20.4989 17.5681V17.7776C20.5206 18.648 20.2208 19.4968 19.6548 20.1674C18.907 20.9515 17.8921 21.4393 16.8024 21.5384C13.607 21.8812 10.383 21.8812 7.18762 21.5384C6.09914 21.435 5.08576 20.9479 4.33521 20.1674C3.778 19.4963 3.48224 18.6526 3.50083 17.7871Z"
            stroke="#A9B1C9"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M9.55493 24.8518C10.0542 25.4785 10.7874 25.884 11.5922 25.9788C12.3971 26.0735 13.2072 25.8495 13.8433 25.3564C14.0389 25.2106 14.2149 25.041 14.3672 24.8518"
            stroke="#A9B1C9"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Svg>
            <Circle
              cx="17"
              cy="9"
              r="6.5"
              fill="#E83842"
              stroke="white"
            ></Circle>

            <SVGText
              text-anchor="middle"
              x="50%"
              y="50%"
              dy="-.5081em"
              dx="-3.97"
              // dx=".042em"
              font-family="Inter"
              font-size=".2px"
              fill="white"
              strokeWidth="2px"
            >
              4
            </SVGText>
          </Svg>
        </Svg>
      </Pressable>
    </HStack>
  );
};

export default HamburgerAndBell;
