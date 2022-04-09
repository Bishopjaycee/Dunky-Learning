import React, { FC, useState } from "react";
import {
  Text,
  VStack,
  Pressable,
  Heading,
  HStack,
  FlatList,
  Button,
} from "native-base";
import { Entypo } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";

interface NotificationsProps {
  navigation: any;
}

const MessageCard = () => (
  <HStack justifyContent="space-between" mt={2} px={4}>
    <Svg width="21" height="20" viewBox="0 0 21 20" fill="none">
      <Path
        d="M16.2678 7.06104L12.0024 10.4953C11.1952 11.1282 10.0636 11.1282 9.25641 10.4953L4.95435 7.06104"
        stroke="#50555C"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.88787 1.5H15.3158C16.6752 1.51525 17.969 2.08993 18.896 3.0902C19.823 4.09048 20.3022 5.42903 20.222 6.79412V13.322C20.3022 14.6871 19.823 16.0256 18.896 17.0259C17.969 18.0262 16.6752 18.6009 15.3158 18.6161H5.88787C2.96796 18.6161 1 16.2407 1 13.322V6.79412C1 3.87545 2.96796 1.5 5.88787 1.5Z"
        stroke="#50555C"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
    <VStack ml={2}>
      <Heading fontSize={18} fontWeight="700" mt={-1}>
        Medal Won
      </Heading>
      <Text fontSize={13} mr={10} textAlign="justify" opacity={0.9}>
        Congratulations Paul, you have successfully completed this week’s
        competition and you have won a gold medal. Keep learning.it up.
      </Text>
      <Text fontSize={10} opacity={0.8} mb={1}>
        2021-05-20 10:46
      </Text>
    </VStack>
  </HStack>
);
const Notifications: FC<NotificationsProps> = ({ navigation }) => {
  const [show, setShow] = useState(false);
  return (
    <VStack bg="white" h="100%" px={2} pt={10} pb={4}>
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
      <Heading textTransform="capitalize" textAlign="center" mt={4}>
        Notifications
      </Heading>
      <Pressable
        pos="relative"
        right={4}
        top={4}
        alignSelf="flex-end"
        onPress={() => setShow(!show)}
      >
        {!show ? EditIcon() : <Text color="primary.600">Done</Text>}
      </Pressable>
      <FlatList
        showsVerticalScrollIndicator={false}
        mt={8}
        maxH={480}
        data={[1, 2, 3, 4, 5, 6, 7]}
        renderItem={({ index }) => <MessageCard key={index} />}
        keyExtractor={(index) => index.toString()}
        extraData={[2, 3, 4, 6, 7]}
      />
      {show && (
        <HStack justifyContent="space-between" mx={6} mt={10} px={2}>
          <Button
            _pressed={{ bg: "primary.600", _text: { color: "white" } }}
            variant="outline"
            w="150px"
            h="30px"
            borderColor="primary.600"
            _text={{ color: "primary.600", fontSize: 14 }}
          >
            Mark all as read
          </Button>
          <Button
            variant="solid"
            bg="primary.600"
            w="120px"
            h="30px"
            _pressed={{
              bg: "white",
              borderWidth: 1,
              borderColor: "primary.600",
              _text: { color: "primary.600" },
            }}
            _text={{ color: "white", fontSize: 14 }}
          >
            Clear All
          </Button>
        </HStack>
      )}
    </VStack>
  );
};

export default Notifications;

function EditIcon() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M11.4922 2.78906H7.75324C4.67824 2.78906 2.75024 4.96606 2.75024 8.04806V16.3621C2.75024 19.4441 4.66924 21.6211 7.75324 21.6211H16.5772C19.6622 21.6211 21.5812 19.4441 21.5812 16.3621V12.3341"
        stroke="#5956E9"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.82763 10.921L16.3006 3.44799C17.2316 2.51799 18.7406 2.51799 19.6716 3.44799L20.8886 4.66499C21.8196 5.59599 21.8196 7.10599 20.8886 8.03599L13.3796 15.545C12.9726 15.952 12.4206 16.181 11.8446 16.181H8.09863L8.19263 12.401C8.20663 11.845 8.43363 11.315 8.82763 10.921Z"
        stroke="#5956E9"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M15.165 4.60254L19.731 9.16854"
        stroke="#5956E9"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
