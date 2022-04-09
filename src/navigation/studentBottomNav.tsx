import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import SettingStack from "./settingStack";
import SubjectStack from "./subjectsStack";
import { enableScreens } from "react-native-screens";

import HomeStack from "./studentHomeStack";
import CompetitionScreen from "./../screens/CompetitionScreen";

const Tab = createBottomTabNavigator(); //createMaterialBottomTabNavigator();

export default function StudentTap() {
  enableScreens();
  return (
    <Tab.Navigator
      // backBehavior="initialRoute"
      initialRouteName="homeScreen"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 65,
          paddingHorizontal: 3,
          paddingBottom: 10,
        },
        tabBarIconStyle: { paddingVertical: 1 },
        tabBarActiveTintColor: "#5956E9",
        tabBarInactiveTintColor: "rgba(134, 134, 134, 0.5)",
        tabBarLabelStyle: {
          marginBottom: 4,
        },
      }}
    >
      <Tab.Screen
        name="homeScreen"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="md-home-sharp"
              size={24}
              color={color}
              style={{ marginTop: 4 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="subjectScreen"
        component={SubjectStack}
        options={{
          tabBarLabel: "Subjects",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="document-text-sharp"
              size={24}
              color={color}
              style={{ marginTop: 4, marginBottom: 4 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="competitionScreen"
        component={CompetitionScreen}
        options={{
          tabBarLabel: "Competitions",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="md-trophy-sharp"
              size={24}
              color={color}
              style={{ marginTop: 4, marginBottom: 4 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="settingScreen"
        component={SettingStack}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="settings-sharp"
              size={24}
              color={color}
              style={{ marginTop: 4, marginBottom: 4 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
