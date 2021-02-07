import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Notification from "./notifications";

import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackCardInterpolator,
} from "@react-navigation/stack";

import {
  StartScreen,
  SignInScreen,
  RegisterScreen,
  WaterIntakeScreen,
  ReminderScreen,
  WelcomeScreen,
  HomeScreen,
  FriendsScreen,
  CalenderScreen,
  AddFriendsScreen,
  UserScreen,
  LogWaterScreen,
  CupSizeScreen,
  LitreboardsScreen,
} from "./components";
import { CalendarIcon } from "./assets";

const Stack = createStackNavigator();
const forFade: StackCardInterpolator = ({ current: { progress } }) => ({
  cardStyle: {
    opacity: progress,
  },
});

export default function App() {
  const hideHeader = { headerShown: false };
  const disableSwipeBack = { gestureEnabled: false };
  const hideAndDisable = { ...hideHeader, ...disableSwipeBack };
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ ...hideHeader, cardStyleInterpolator: forFade }}
      >
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={hideAndDisable}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={hideAndDisable}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={hideHeader}
        />
        <Stack.Screen
          name="Intake"
          component={WaterIntakeScreen}
          options={hideHeader}
        />
        <Stack.Screen
          name="Reminder"
          component={ReminderScreen}
          options={hideHeader}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={hideAndDisable}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={hideAndDisable}
        />
        <Stack.Screen
          name="Friends"
          component={FriendsScreen}
          options={hideAndDisable}
        />
        <Stack.Screen
          name="Litreboards"
          component={LitreboardsScreen}
          options={hideAndDisable}
        />
        <Stack.Screen
          name="Calender"
          component={CalenderScreen}
          options={hideAndDisable}
        />
        <Stack.Screen
          name="AddFriends"
          component={AddFriendsScreen}
          options={hideAndDisable}
        />
        <Stack.Screen name="User" component={UserScreen} options={hideHeader} />
        <Stack.Screen
          name="LogWater"
          component={LogWaterScreen}
          options={hideAndDisable}
        />
        <Stack.Screen
          name="CupSize"
          component={CupSizeScreen}
          options={hideAndDisable}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
