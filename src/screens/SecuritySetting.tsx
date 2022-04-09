import React, { FC } from "react";
import { Text, VStack } from "native-base";

interface SecuritySettingProps {}

const SecuritySetting: FC<SecuritySettingProps> = () => {
  return (
    <VStack>
      <Text textAlign="center" mt={10}>
        Security Setting
      </Text>
    </VStack>
  );
};

export default SecuritySetting;
