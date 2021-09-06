import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CompetitionSetupScreen from "./../screens/CompetitonSetupScreen";
import CompetitionTeamSetup from "./../screens/CompetitionTeamSetup";

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
        name="team-setup"
        component={CompetitionTeamSetup}
        options={{ headerShown: false }}
      />
    </CompStack.Navigator>
  );
};

export default CompetitionStack;
