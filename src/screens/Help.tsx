import { Box } from "native-base";
import React, { FC } from "react";

interface HelpProp {}

const HelpScreen: FC<HelpProp> = () => {
  return <Box _text={{ marginTop: 40 }}>Help Screen</Box>;
};

export default HelpScreen;
