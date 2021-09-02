import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
// import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/SplashScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import welcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import PhoneVerificationScreen from "../screens/PhoneVerificationScreen";
import OTPVerificationScreen from "../screens/OTPVerificationScreen";
import SuccessScreen from "../screens/SuccessScreen";
import SuccessScreen2 from "../screens/SuccessScreen2";
import MyDrawer from "./drawer";
import firebase from "firebase/app";
import QuizScreen from "./../screens/QuizScreen";
import QuizReport from "./../screens/QuizReport";
import CreateAssignment from "./../screens/CreateAssignment";
import Notifications from "./../screens/Notifications";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import StudentResults from "./../screens/StudentResult";
import TeacherAssignment from "./../screens/TeacherAssignment";
import TeacherAnnouncement from "./../screens/TeacherAnnouncement";
import ListStudent from "./../screens/ListStudents";
import WeeklyProgress from "./../screens/WeeklyProgressScreen";
import MakeRemark from "./../screens/MakeRemark";

const Stack = createNativeStackNavigator(); //createStackNavigator();

export default function StackNavigation() {
  useEffect(() => {
    firebase.auth().currentUser;
  }, []);

  return (
    <Stack.Navigator initialRouteName="splash">
      <Stack.Screen
        name="splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="onboardingScreen"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="welcomeScreen"
        component={welcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="loginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="signupScreen"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="phoneVerificationScreen"
        component={PhoneVerificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="otpVerificationScreen"
        component={OTPVerificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="successScreen"
        component={SuccessScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="successScreen2"
        component={SuccessScreen2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="drawer"
        component={MyDrawer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="quiz-screen"
        component={QuizScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="quiz-report"
        component={QuizReport}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="create-assignment"
        component={CreateAssignment}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="notifications"
        component={Notifications}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="teacher-announcement"
        component={TeacherAnnouncement}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="students-result"
        component={StudentResults}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="teacher-assignment"
        component={TeacherAssignment}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="list-students"
        component={ListStudent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="weekly-progress"
        component={WeeklyProgress}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="make-remark"
        component={MakeRemark}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
