import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CompetitionScreen from "../screens/CompetitionScreen";
import CompetitionSetupScreen from "./../screens/CompetitonSetupScreen";
import CompetitionTeamSetup from "./../screens/CompetitionTeamSetup";

const CompStack = createStackNavigator();

const CompetitionStack = () => {
  return (
    <CompStack.Navigator initialRouteName="compete">
      <CompStack.Screen
        name="compete"
        component={CompetitionScreen}
        options={{ headerShown: false }}
      />

      <CompStack.Screen
        name="setup"
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
