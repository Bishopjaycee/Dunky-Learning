import React, { FC } from "react";
import { Text, VStack } from "native-base";

interface InviteFriendProps {}

const InviteFriend: FC<InviteFriendProps> = () => {
  return (
    <VStack>
      <Text textAlign="center" mt={10}>
        Invite Friend
      </Text>
    </VStack>
  );
};

export default InviteFriend;
