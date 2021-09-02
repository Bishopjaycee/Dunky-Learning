import { Box } from "native-base";
import React, { FC } from "react";

interface AboutUsProp {}

const AboutUsScreen: FC<AboutUsProp> = () => {
  return <Box _text={{ marginTop: 40 }}>AboutUs Screen</Box>;
};

export default AboutUsScreen;
