import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeStudentScreen";
import LeadershipBoard from "./../screens/LeadershipBoardScreen";
import RewardCenter from "./../screens/RewardCenterScreen";
import Assignment from "./../screens/Assignment";
import WeeklyProgress from "./../screens/WeeklyProgressScreen";
import RewardConfirmation from "./../screens/RewardConfirmation";
import Notifications from "./../screens/Notifications";
import OTPVerificationScreen from "./../screens/OTPVerificationScreen";

const Home = createStackNavigator();

const HomeStack = () => {
  return (
    <Home.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Home.Screen name="Home" component={HomeScreen} />
      {/* <Home.Screen name="Home" component={OTPVerificationScreen} /> */}
      <Home.Screen name="leadership-board" component={LeadershipBoard} />
      <Home.Screen name="reward-center" component={RewardCenter} />
      <Home.Screen name="assignment" component={Assignment} />
      <Home.Screen name="progress" component={WeeklyProgress} />
      <Home.Screen name="confirm-reward" component={RewardConfirmation} />
    </Home.Navigator>
  );
};

export default HomeStack;
