import React, { FC } from "react";
import { Box } from "native-base";
interface CompetitionTeamSetupProps {}
const CompetitionTeamSetup: FC<CompetitionTeamSetupProps> = (props) => {
  return (
    <Box _text={{ textAlign: "center", marginY: 30 }}>
      Competition team setup
    </Box>
  );
};

export default CompetitionTeamSetup;
