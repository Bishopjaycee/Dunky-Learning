import React, { useState, useEffect } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  Box,
  // HamburgerIcon,
  Pressable,
  Heading,
  Center,
  HStack,
  Text,
  VStack,
} from "native-base";
import StudentTap from "./studentBottomNav";
import { Ionicons } from "@expo/vector-icons";
import TeacherTap from "./teacherBottomTab";
import ParentTrack from "./../screens/ParentTrack";
import { ActivityIndicator, ToastAndroid } from "react-native";
import { useUser } from "./../util/use-user";
import { isConnected } from "./../util/netInfo";

const Drawer = createDrawerNavigator();
function Component(props: any) {
  return (
    <HStack alignItems="center" mt={6}>
      <Pressable
        onPress={() => props.navigation.toggleDrawer()}
        position="absolute"
        ml={2}
        zIndex={1}
      >
        {/* <HamburgerIcon ml={2} size="sm" /> */}
      </Pressable>
      <Center flex={1}>
        <Heading size="md">{props.route.name}</Heading>
      </Center>
    </HStack>
  );
}

function CustomDrawerContent(props: any) {
  const { signOut } = useUser();
  const exit = async () => {
    signOut().then(() => props.navigation.navigate("onboardingScreen"));
  };
  return (
    <DrawerContentScrollView
      style={{ backgroundColor: "rgba(89, 86, 233, 1)", color: "white" }}
      {...props}
      safeArea
    >
      <DrawerItemList {...props} />
      <DrawerItem
        label="Share Experience"
        labelStyle={{ color: "#F0c8F2" }}
        icon={({ size }) => (
          <Ionicons name="share-outline" size={size} color="#F0c8F2" />
        )}
        onPress={() => {}}
      />
      <Box mt={20}>
        <DrawerItem
          label="Logout"
          labelStyle={{ color: "#F0c8F2" }}
          onPress={exit}
          icon={({ size }) => (
            <Ionicons name="md-exit-outline" size={size} color="#F0c8F2" />
          )}
        />
      </Box>
    </DrawerContentScrollView>
  );
}

function HomeComponent(role: any) {
  switch (role) {
    case "student":
      return StudentTap;
    case "teacher":
      return TeacherTap;
    case "parent":
      return ParentTrack;
    default:
      return () => (
        <VStack justifyContent="center" alignItems="center" mt={20} p={20}>
          <ActivityIndicator size="large" color="#5956E9" />
          {/* <Text>It is me</Text> */}
        </VStack>
      );
  }
}

export default function MyDrawer() {
  const { error, userRole, getUserRole } = useUser();
  useEffect(() => {
    getUserRole();
  }, [userRole]);

  return userRole != null ? (
    <Drawer.Navigator
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerInactiveTintColor: "black",
        drawerActiveTintColor: "white",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeComponent(userRole)}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={Component}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="About Us"
        component={Component}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  ) : (
    <VStack justifyContent="center" alignItems="center" mt={20} p={20}>
      <ActivityIndicator size="large" color="#5956E9" />
      {/* <Text>Tell me not</Text> */}
    </VStack>
  );
}
