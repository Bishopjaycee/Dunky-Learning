import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SubjectScreen from "./../screens/SubjectScreen";
import StartQuiz from "./../screens/StartQuiz";

import { enableScreens } from "react-native-screens";

const SubStack = createStackNavigator();

const SubjectStack = () => {
  enableScreens();
  return (
    <SubStack.Navigator
      initialRouteName="index"
      screenOptions={{ gestureEnabled: true }}
    >
      <SubStack.Screen
        name="index"
        component={SubjectScreen}
        options={{ headerShown: false }}
      />
      <SubStack.Screen
        name="start-quiz"
        component={StartQuiz}
        options={{ headerShown: false }}
      />
    </SubStack.Navigator>
  );
};

export default React.memo(SubjectStack);
