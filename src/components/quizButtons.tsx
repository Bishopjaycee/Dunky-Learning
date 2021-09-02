import React, { FC, useEffect, useState } from "react";
import { Button, VStack, Box, Text } from "native-base";
const LottieView = require("lottie-react-native");

interface QuizButtonProps {
  correctOption: string;
  options: string[];
  onChange: (arg: boolean) => void;
  index: number;
}

function checkValue(
  value: string,
  cOpt: string,
  cb: (setCb: boolean) => void,
  cb1: (color: string) => void,
  cb2: (picking: boolean) => void
) {
  cb2(true);
  if (value == cOpt) {
    cb1("#EAFFDE");
    cb(true);
  } else {
    cb1("#FFE3D5");
    cb(false);
  }
  cb2(false);
}

const QuizButton: FC<QuizButtonProps> = ({
  correctOption,
  options,
  index,
  onChange,
}) => {
  const [value, setValue] = useState("");
  const [picking, setPicking] = useState(false);
  const [btnColor, setBtnColor] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const isCorrect = correctOption == value;
  let animation: any = null;
  useEffect(() => {
    checkValue(value, correctOption, onChange, setBtnColor, setPicking);
    console.log("I changed");
  }, [value, picking]);

  const setBtnValue = (option: string) => {
    setValue(option);
    setBtnClicked(true);
    setBtnDisabled(true);
    animation?.play(0, 360);
  };

  function init() {
    setPicking(false);
    setValue("");
    setBtnClicked(false);
    setShowAnswer(false);
    setBtnColor("");
    setBtnDisabled(false);
  }

  useEffect(() => {
    init();
  }, [index]);

  return (
    <VStack mx={6}>
      {options != null
        ? options.map((option, index) => (
            <Button
              key={index}
              onPress={() => setBtnValue(option)}
              my={2}
              disabled={btnDisabled && !(value == option)}
              variant="outline"
              _pressed={{ bg: "white" }}
              bg={value == option ? btnColor : "white"}
              borderColor={
                value == option && btnColor == "#EAFFDE"
                  ? "green.600"
                  : value == option && btnColor == "#FFE3D5"
                  ? "red.500"
                  : "brand.primary"
              }
              isLoading={value == option && picking}
              _text={{
                textAlign: "left",
                color: value == option ? "black" : "brand.primary",
              }}
            >
              {option}
            </Button>
          ))
        : null}
      <VStack justifyContent="center" alignItems="center">
        {btnClicked && (
          <Box w="80px" h="80px">
            <LottieView
              ref={(ref: any) => (animation = ref)}
              style={{
                width: 300,
                flex: 1,
                height: 200,
                backgroundColor: "transparent",
              }}
              resizeMode="cover"
              source={
                isCorrect
                  ? require("../assets/lottie/success.json")
                  : require("../assets/lottie/error.json")
              }
              autoPlay
              loop={false}
            />
          </Box>
        )}
        {!isCorrect && btnClicked && (
          <Box bg="brand.bg1" px={10} py={2} borderRadius={10} w="200px" mt={2}>
            {!showAnswer && (
              <Text
                textAlign="center"
                fontWeight="bold"
                onPress={() => setShowAnswer(true)}
              >
                View Answer
              </Text>
            )}

            {showAnswer && (
              <Text textAlign="center" fontWeight="bold" color="green.600">
                {correctOption}
              </Text>
            )}
          </Box>
        )}
      </VStack>
    </VStack>
  );
};

export default React.memo(QuizButton);
