import React, { FC } from "react";
import {
  Text,
  VStack,
  Pressable,
  Heading,
  HStack,
  FormControl,
  TextArea,
  Button,
} from "native-base";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

interface MakeRemarkProps {
  navigation: any;
}

const MakeRemark: FC<MakeRemarkProps> = ({ navigation }) => {
  const [expression, setExpression] = useState("");
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const goBack = () => navigation.pop();
  return (
    <VStack pt={10} bg="white" h="100%" px={8}>
      <Pressable
        onPress={goBack}
        pos="absolute"
        bg="brand.primary"
        pl={8}
        top={10}
        p={2}
        zIndex={2}
        roundedBottomRight="xl"
        roundedTopRight="xl"
      >
        <Entypo
          name="chevron-with-circle-left"
          size={24}
          color="white"
          style={{ marginLeft: 8 }}
        />
      </Pressable>
      <Heading textAlign="center" mt={20} fontSize={20} px={4}>
        How do you feel about Paul’s progress?
      </Heading>
      <HStack mx={4} px={4} justifyContent="space-between" my={6}>
        <Button
          onPress={() => setExpression("great")}
          bg={expression == "great" ? "primary.600" : "white"}
          borderWidth={1}
          p={4}
          borderColor="rgba(117, 125, 136, 0.5)"
          _pressed={{ bg: "primary.600" }}
        >
          😃
        </Button>
        <Button
          onPress={() => setExpression("good")}
          bg={expression == "good" ? "primary.600" : "white"}
          borderWidth={1}
          p={4}
          borderColor="rgba(117, 125, 136, 0.5)"
          _pressed={{ bg: "primary.600" }}
        >
          😒
        </Button>
        <Button
          onPress={() => setExpression("bad")}
          bg={expression == "bad" ? "primary.600" : "white"}
          borderWidth={1}
          p={4}
          borderColor="rgba(117, 125, 136, 0.5)"
          _pressed={{ bg: "primary.600" }}
        >
          😞
        </Button>
      </HStack>
      <FormControl isInvalid={false} mt={4}>
        <VStack alignItems="center">
          <FormControl.Label
            _text={{ fontSize: 20, textAlign: "center", ml: 4 }}
          >
            Make a Remark
          </FormControl.Label>
          <Controller
            control={control}
            name="remark"
            defaultValue=""
            rules={{ required: "remark required", maxLength:120 }}
            render={({ field: { onChange, ref, value } }) => (
              <TextArea
                onChange={onChange}
                ref={ref}
                value={value}
                w="100%"
                numberOfLines={4}
                _focus={{ borderColor: "brand.primary" }}
                h={40}
                bg="#F4F4F4"
              />
            )}
          />

          <FormControl.ErrorMessage my={1}>
            I'll only appear when FormControl have isInvalid props.
          </FormControl.ErrorMessage>
        </VStack>
      </FormControl>
      <Text
        textAlign="right"
        fontSize={12}
        opacity={0.6}
        mt={2}
        mb={6}
        color="#50555C"
      >
        120 Characters
      </Text>
      <Button
        alignSelf="center"
        variant="solid"
        bg="brand.primary"
        color="white"
        w="300px"
        mt={10}
        _pressed={{ backgroundColor: "brand.bg1" }}
        onPress={() => navigation.navigate("weekly-progress")}
      >
        Send Remark
      </Button>
    </VStack>
  );
};

export default MakeRemark;
