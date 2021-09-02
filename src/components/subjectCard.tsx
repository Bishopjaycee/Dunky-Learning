import React, { useState } from "react";
import {
  VStack,
  CheckCircleIcon,
  Image,
  Heading,
  Pressable,
} from "native-base";
import { useEffect } from "react";

interface Props {
  onTap: (title: string, checked: boolean) => void;
  title: string;
  image: any;
  items: string[];
}

export default function SubjectCard({ onTap, title, image, items }: Props) {
  const [checked, checkedSet] = useState(false);
  const disable = items.length >= 4 && items.indexOf(title) == -1;
  const showCheckICon = checked && items.length <= 4;

  return (
    <Pressable
      disabled={disable}
      onPress={() => checkedSet(!checked)}
      onPressIn={() => onTap(title, checked)}
      m={2}
    >
      <VStack
        shadow={2}
        borderColor={checked && items.length <= 4 ? "brand.primary" : "white"}
        borderWidth={1}
        borderRadius={5}
        bg={"white"}
        w="100px"
        h="130px"
        justifyContent="space-around"
        alignItems="center"
      >
        {showCheckICon && (
          <CheckCircleIcon
            size={5}
            color="green.700"
            pos="absolute"
            zIndex={60}
            top={0}
            right={0}
            m={2}
          />
        )}
        <Image source={image} size="60px" alt="english" mt={3} />
        <Heading
          fontSize="sm"
          textAlign="center"
          my={2}
          textTransform="capitalize"
        >
          {title}
        </Heading>
      </VStack>
    </Pressable>
  );
}
