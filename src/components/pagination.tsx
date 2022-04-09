import React from "react";
import { Pagination } from "react-native-snap-carousel";

interface PaginationProp {
  entries: any[];
  activeSlide: number;
}
export default function _Pagination({ entries, activeSlide }: PaginationProp) {
  return (
    <Pagination
      dotsLength={entries.length}
      activeDotIndex={activeSlide}
      //   containerStyle={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
      dotStyle={{
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: "#5956E9",
      }}
      inactiveDotStyle={
        {
          // Define styles for inactive dots here
        }
      }
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
    />
  );
}
