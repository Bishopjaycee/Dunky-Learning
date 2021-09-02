import React, { FC, useState, useEffect } from "react";
import {
  VStack,
  Pressable,
  Heading,
  HStack,
  Button,
  ScrollView,
  Select,
  CheckIcon,
  Text,
  Image,
  TextArea,
  FormControl,
  Input,
  Box,
  Progress,
} from "native-base";
import { ToastAndroid, TouchableOpacity } from "react-native";
import { Entypo, EvilIcons, AntDesign } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

interface CreateAssignmentProps {
  navigation: any;
}
const CreateAssignment: FC<CreateAssignmentProps> = ({ navigation }) => {
  const [subject, setSubject] = useState("");
  const [classes, setClasses] = useState("");
  const [description, setDescription] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [fileLoaded, setFileStatus] = useState(false);
  const [file, setFile] = useState({}) as any;
  const callToat = () => {
    ToastAndroid.showWithGravity(
      "Assignment successfully created!",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );

    const stID = setTimeout(() => {
      navigation.goBack();
      clearTimeout(stID);
    }, 1000);
  };

  useEffect(() => {
    const unsubscribed = navigation.addListener("onPress", (e: any) => {
      e.preventDefault();
    });
    return () => unsubscribed;
  }, [navigation]);

  const _pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync();
      console.log(result);
      setFile(result);
      setFileStatus(!fileLoaded);
    } catch (error) {
      console.error(error?.message);
    }
  };

  const _clearDoc = () => {
    setFile({});
    setFileStatus(!fileLoaded);
  };

  return (
    <VStack bg="white" h="100%" px={2} pt={10} pb={4}>
      <Pressable
        onPress={() => navigation.goBack()}
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
      <Heading
        textTransform="capitalize"
        textAlign="center"
        mt={4}
        fontSize={24}
      >
        Create Assignment
      </Heading>
      <VStack px={4} justifyContent="center" alignItems="center" mt={10}>
        <FormControl isInvalid={false} my={2}>
          <FormControl.Label>Subject</FormControl.Label>
          <Select
            selectedValue={subject}
            minWidth={200}
            accessibilityLabel="Select subject"
            placeholder="Select subject"
            onValueChange={(itemValue) => setSubject(itemValue)}
            _selectedItem={{
              bg: "primary.600",
              endIcon: <CheckIcon size={4} />,
            }}
          >
            <Select.Item label="JavaScript" value="js" />
            <Select.Item label="TypeScript" value="ts" />
            <Select.Item label="C" value="c" />
            <Select.Item label="Python" value="py" />
            <Select.Item label="Java" value="java" />
          </Select>

          <FormControl.ErrorMessage>
            Something is wrong.
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={false} my={2}>
          <FormControl.Label>Class</FormControl.Label>
          <Select
            selectedValue={classes}
            minWidth={200}
            accessibilityLabel="Select class"
            placeholder="Select class"
            onValueChange={(itemValue) => setClasses(itemValue)}
            _selectedItem={{
              bg: "primary.600",
              endIcon: <CheckIcon size={4} />,
            }}
          >
            <Select.Item label="Senior Secondary 1" value="ss1" />
            <Select.Item label="Senior Secondary 2" value="ss2" />
            <Select.Item label="Senior Secondary 3" value="ss3" />
          </Select>

          <FormControl.ErrorMessage>
            Something is wrong.
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={false} my={2}>
          <FormControl.Label>Description</FormControl.Label>
          <TextArea
            _focus={{ borderColor: "primary.600" }}
            value={description}
            numberOfLines={3}
            _invalid={{ borderColor: "red.600" }}
            onChangeText={setDescription}
            h={20}
            placeholder="Description of assignment"
          />
          <FormControl.ErrorMessage>
            Something is wrong.
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={false} my={2}>
          <FormControl.Label>Deadline</FormControl.Label>
          <Input
            _focus={{ borderColor: "primary.600" }}
            value={deadLine}
            _invalid={{ borderColor: "red.600" }}
            onChangeText={setDeadLine}
            placeholder="dd/mm/yyyy"
          />
          <FormControl.ErrorMessage>
            Something is wrong.
          </FormControl.ErrorMessage>
        </FormControl>
        {!fileLoaded ? (
          <TouchableOpacity
            onPress={_pickDocument}
            style={{ alignSelf: "flex-start" }}
          >
            <Text color="primary.600" mt={2} mb={8} textAlign="left">
              Attach a File <EvilIcons name="link" size={24} color="black" />
            </Text>
          </TouchableOpacity>
        ) : (
          <>
            <HStack
              px={3}
              py={1}
              bg="white"
              shadow={2}
              w="100%"
              my={2}
              rounded={5}
            >
              <Image
                source={
                  fileType(file?.name) == "pdf"
                    ? require(`../assets/images/pdf.png`)
                    : require(`../assets/images/word.png`)
                }
                alt="word"
                size={8}
                m={2}
              />
              <Box m={1} h={8} w={40}>
                <Text fontSize={12} isTruncated>
                  {file?.name}
                </Text>
                <Text textAlign="right" fontSize={10}>
                  100%
                </Text>
                <Progress h={1} colorScheme={"primary"} bg="primary.600" />
              </Box>
              <Box alignSelf="center" ml={10}>
                <AntDesign
                  name="checkcircle"
                  size={15}
                  color="#5956E9"
                  stroke="white"
                />
              </Box>
            </HStack>
            <Text
              color="primary.600"
              alignSelf="flex-end"
              fontSize={12}
              fontWeight="900"
              mb={8}
              onPress={_clearDoc}
            >
              Change Doc
            </Text>
          </>
        )}

        <Button
          variant="solid"
          color="white"
          bg="primary.600"
          mb={4}
          w="100%"
          _pressed={{ backgroundColor: "brand.bg1" }}
          _text={{ color: "white" }}
          onPress={callToat}
        >
          Create Assignment
        </Button>
      </VStack>
    </VStack>
  );
};

export default CreateAssignment;

function fileType(name: string) {
  if (name.match(/.pdf$/)) {
    return "pdf";
  }
  if (name.match(/(.doc|.docx)$/)) {
    return "word";
  }
}
