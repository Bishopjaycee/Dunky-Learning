import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CompetitionSetupScreen from "./../screens/CompetitonSetupScreen";

import TeamSelection from "../screens/TeamSelectionScreen";

const CompStack = createStackNavigator();

const CompetitionStack = () => {
  return (
    <CompStack.Navigator initialRouteName="initial">
      <CompStack.Screen
        name="initial"
        component={CompetitionSetupScreen}
        options={{ headerShown: false }}
      />
    
      <CompStack.Screen
        name="select-team"
        component={TeamSelection}
        options={{ headerShown: false }}
      />
    </CompStack.Navigator>
  );
};

export default CompetitionStack;
