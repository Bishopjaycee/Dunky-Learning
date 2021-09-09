import React from "react";
import { Pressable } from "native-base";
import { Entypo } from "@expo/vector-icons";

type NavProp = {
  navigation: any;
};
export default function NavigateBack({ navigation }: NavProp) {
  return (
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
  );
}
