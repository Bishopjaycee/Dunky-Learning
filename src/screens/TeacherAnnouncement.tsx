import React, { FC } from "react";
import { Text, VStack } from "native-base";

interface TeacherAnnouncementProps {}

const TeacherAnnouncement: FC<TeacherAnnouncementProps> = () => {
  return (
    <VStack>
      <Text textAlign="center" mt={10}>
        Teacher anno
      </Text>
    </VStack>
  );
};

export default TeacherAnnouncement;
