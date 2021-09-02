import {
  Text,
  VStack,
  Pressable,
  Progress,
  HStack,
  Button,
  Icon,
  Box,
} from "native-base";
import React, { FC, useEffect, useMemo, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { getQuestions } from "./../util/questions";
import { QuestionModel } from "../models/firebase.model";
import { ActivityIndicator, LogBox } from "react-native";
import QuizButton from "../components/quizButtons";
import { useCallback } from "react";
import quizJudge from "../util/quizJudge";
import useTimer from "./../hooks/timerFunction";

interface QuizScreenProps {
  navigation: any;
  route: any;
}

const QuizScreen: FC<QuizScreenProps> = ({ navigation, route }) => {
  LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

  const { subjectTitle } = route.params;

  const [isLoaded, setIsLoaded] = useState(false);
  const [questions, setQuestions] = useState<QuestionModel[]>([]);
  const [curIndex, setCurIndex] = useState(1000);
  const [timer, setTimer] = useState(20);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [nextClk, setNext] = useState(false); //tells auto indexer to check if user already moved to the next question

  const loadQuestions = useMemo(() => {
    getQuestions({ subject: subjectTitle.toLowerCase(), level: 0 }).then(
      (data) => {
        setQuestions(data);
        setCurIndex(1);
        setIsLoaded(true);
      }
    );
  }, [questions[0]?.correctOption]);

  useEffect(() => {
    loadQuestions;

    return () => loadQuestions;
  }, [isLoaded]);

  const options = useMemo(
    () => questions[curIndex - 1]?.options,
    [curIndex, questions[curIndex - 1]?.options[2]]
  );
  const correctOption = useMemo(
    () => questions[curIndex - 1]?.correctOption,
    [curIndex, questions[curIndex - 1]?.correctOption]
  );
  const index = useMemo(() => curIndex - 1, [curIndex]);
  const onChange = useCallback(
    (answer) => {
      setAnswers((prev) => [...prev, answer]);
    },
    [answers]
  );
  const report = () => {
    quizJudge({ answers });
    navigation.navigate("quiz-report");
  };
  const next = () => {
    if (curIndex < questions.length) {
      setCurIndex(curIndex + 1);
      setNext(!nextClk);
    } else {
      console.log(curIndex);
      report();
    }
  };

  const prev = () => setCurIndex(curIndex - 1);

  useEffect(() => {
    let unsubscribeTimer: any = null;

    if (questions.length <= 0) return;
    if (curIndex > questions.length) return;
    if (curIndex <= questions.length) {
      unsubscribeTimer = setInterval(() => setTimer(timer - 1), 1000);
    }

    if (timer <= 0 && curIndex < questions.length) {
      if (curIndex > questions.length) {
        clearInterval(unsubscribeTimer);
        return;
      }
      if (!nextClk) next();
      setNext(!nextClk);
      setTimer(7);
    }

    return () => clearInterval(unsubscribeTimer);
  }, [timer]);

  console.log(timer, "reloaded");
  if (isLoaded && questions.length <= 0) {
    return (
      <>
        <Text mt={"20%"} p={"4"} color="primary.600" textAlign="center">
          No Questions found for {subjectTitle}
        </Text>
        <Text
          onPress={() => navigation.navigate("index")}
          textAlign="center"
          textDecoration="underline"
        >
          Go Home
        </Text>
      </>
    );
  }

  return isLoaded ? (
    <VStack pb={6} bg="white" h="100%">
      <VStack px={6} mt={10} pb={4}>
        <HStack mt={4} mb={2} justifyContent="space-between">
          <Text
            alignSelf="flex-start"
            fontWeight="700"
            color={timer <= 3 ? "red.600" : "black"}
          >
            {timer < 10 ? `0${timer}` : `${timer}`}s
          </Text>
          <Pressable onPress={report} mr={4}>
            <Text
              color="brand.primary"
              fontWeight="bolder"
              textAlign="right"
              alignSelf="flex-end"
            >
              Quit
            </Text>
          </Pressable>
        </HStack>

        <Progress
          colorScheme={"primary"}
          value={!questions ? 0 : (curIndex / questions.length) * 100}
          bg="brand.bg1"
        />
        <Text textAlign="center" mt={4}>
          {questions && `${curIndex} / ${questions.length ?? 30}`}
        </Text>
      </VStack>

      <Text textAlign="center" m={4}>
        {questions[curIndex - 1]?.question}
      </Text>
      <QuizButton
        onChange={onChange}
        index={index}
        options={options}
        correctOption={correctOption}
      />
      <HStack justifyContent="space-between" mx={6} mt={curIndex < 0 ? 10 : 4}>
        {curIndex - 1 > 0 ? (
          <Button
            onPress={prev}
            bg="brand.primary"
            p={2}
            w={119}
            alignSelf="flex-start"
          >
            Prev
          </Button>
        ) : (
          <></>
        )}
        <Button
          onPress={next}
          bg="brand.primary"
          p={2}
          w={119}
          alignSelf="flex-end"
        >
          Next
        </Button>
      </HStack>
    </VStack>
  ) : (
    <VStack justifyContent="center" alignItems="center" mt={20} p={20}>
      <ActivityIndicator size="large" color="#5956E9" />
    </VStack>
  );
};

export default QuizScreen;
