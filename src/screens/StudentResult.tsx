import React, { FC } from "react";
import { Text, VStack } from "native-base";

interface StudentResultsProps {}

const StudentResults: FC<StudentResultsProps> = () => {
  return (
    <VStack>
      <Text textAlign="center" mt={10}>
       Student Results
      </Text>
    </VStack>
  );
};

export default StudentResults;
