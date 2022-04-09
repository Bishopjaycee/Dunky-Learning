import React, { FC } from "react";
import { Text, VStack } from "native-base";

interface ReportIssuesProps {}

const ReportIssues: FC<ReportIssuesProps> = () => {
  return (
    <VStack>
      <Text textAlign="center" mt={10}>
        Report issues
      </Text>
    </VStack>
  );
};

export default ReportIssues;
