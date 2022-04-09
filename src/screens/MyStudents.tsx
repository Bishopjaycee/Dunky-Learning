import React, { FC, useState } from "react";
import { Text, VStack, HStack, Image, Circle } from "native-base";
import { TouchableOpacity } from "react-native";

interface MyStudentsProps {
  navigation: any;
}

const MyStudents: FC<MyStudentsProps> = ({ navigation }) => {
  const [studentClass, setStudentClass] = useState([1, 2, 3]);
  return (
    <VStack h="100%" bg="white" pt={10} px={8}>
      <Text textAlign="center" mt={10}>
        All your students in one place.
      </Text>
      <VStack mt={10}>
        {studentClass.map((item, index) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("list-students", {
                students: `Senior Secondary ${item}`,
              })
            }
            key={index}
          >
            <HStack
              px={3}
              py={5}
              mb={4}
              borderRadius={4}
              borderWidth={1}
              borderColor="primary.600"
              justifyContent="space-between"
              alignItems="center"
            >
              <Circle bg="#DCEDFF" p={2} w="40px" h="40px">
                <Image
                  source={require("../assets/images/chemistry.png")}
                  alt="chem"
                  resizeMode="contain"
                />
              </Circle>
              <Text fontWeight="700">Senior Secondary {item}</Text>
              <Text />
              {/* <Text fontSize={12} mr={2}>
                32 Stu.
              </Text> */}
            </HStack>
          </TouchableOpacity>
        ))}
      </VStack>
    </VStack>
  );
};

export default MyStudents;
