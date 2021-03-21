import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const opacityTransition: object = {
  gestureDirection: "horizontal",
  transitionSpec: {
    open: {
      animation: "timing",
    },
    close: {
      animation: "timing",
      config: {
        duration: 300,
      },
    },
  },
  cardStyleInterpolator: ({ current }: { current: { progress: number } }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  }),
};

const hideHeader = { headerShown: false };
const disableSwipeBack = { gestureEnabled: false };
const hideAndDisable = { ...hideHeader, ...disableSwipeBack };

import {
  Start,
  SignIn,
  Register,
  WaterIntake,
  Reminder,
  Welcome,
  Home,
  Friends,
  Calender,
  LogChart,
  AddFriends,
  User,
  LogWater,
  Litreboards,
  WaterLog,
  AddCupModal,
} from "./screens";

const screens = [
  // Uncomment this when making functions
  { name: "Start", component: Start, disable: true },
  { name: "SignIn", component: SignIn, disable: false },
  { name: "Register", component: Register, disable: false },
  { name: "Intake", component: WaterIntake, disable: false },
  { name: "Reminder", component: Reminder, disable: false },
  { name: "Welcome", component: Welcome, disable: true },
  { name: "Home", component: Home, disable: true },
  { name: "Friends", component: Friends, disable: true },
  { name: "Litreboards", component: Litreboards, disable: true },
  { name: "Calender", component: Calender, disable: true },
  { name: "AddFriends", component: AddFriends, disable: true },
  { name: "User", component: User, disable: true },
  { name: "LogWater", component: LogWater, disable: true },
  { name: "WaterLog", component: WaterLog, disable: true },
  { name: "AddCupModal", component: AddCupModal, disable: false },
  { name: "LogChart", component: LogChart, disable: true },
];

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          ...hideHeader,
          ...opacityTransition,
        }}
      >
        {screens.map((screen) => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={screen.disable ? hideAndDisable : hideHeader}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
