import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import SettingStack from "./settingStack";
import MyStudents from "./../screens/MyStudents";

import { enableScreens } from "react-native-screens";
import { Image } from "native-base";
import TeacherHomeScreen from "./../screens/HomeTeacherScreen";

const Tab = createBottomTabNavigator();

export default function TeacherTap() {
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
        component={TeacherHomeScreen}
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
        name="my-students"
        component={MyStudents}
        options={{
          tabBarLabel: "My Students",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={require("../assets/images/student-active.png")}
                alt="student"
                w="25px"
                h="25px"
              />
            ) : (
              <Image
                source={require("../assets/images/student-inactive.png")}
                alt="student"
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
