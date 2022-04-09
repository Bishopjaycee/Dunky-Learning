import React, { FC } from "react";
import { Text, VStack } from "native-base";


interface GeneralSettingProps {
  navigation: any;
}

const GeneralSetting: FC<GeneralSettingProps> = () => {
  return (
    <VStack>
      <Text textAlign="center" mt={10}>
        General Setting
      </Text>
    </VStack>
  );
};

export default GeneralSetting;
