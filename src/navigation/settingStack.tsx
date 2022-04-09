import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingScreen from "../screens/SettingScreen";
import EditProfileScreen from "./../screens/EditProfileScreen";
import { enableScreens } from "react-native-screens";
import GeneralSetting from "./../screens/GeneralSetting";
import Notifications from "./../screens/Notifications";
import SecuritySetting from "./../screens/SecuritySetting";
import InviteFriend from "./../screens/InviteFriend";
import ReportIssues from "./../screens/ReportIssues";


const Setting = createStackNavigator();

const SettingStack = () => {
  enableScreens();
  return (

      <Setting.Navigator
        initialRouteName="setting"
        screenOptions={{ headerShown: false }}
      >
        <Setting.Screen name="setting" component={SettingScreen} />
        <Setting.Screen name="edit" component={EditProfileScreen} />
        <Setting.Screen name="general" component={GeneralSetting} />
        <Setting.Screen name="notifications" component={Notifications} />
        <Setting.Screen name="security" component={SecuritySetting} />
        <Setting.Screen name="invitation" component={InviteFriend} />
        <Setting.Screen name="report" component={ReportIssues} />
      </Setting.Navigator>

  );
};

export default SettingStack;
