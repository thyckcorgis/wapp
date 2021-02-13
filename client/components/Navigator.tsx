import React from "react";
import { StackCardStyleInterpolator } from "react-navigation-stack";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const forFade: StackCardStyleInterpolator = ({ current: { progress } }) => ({
  cardStyle: {
    opacity: progress,
  },
});

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
  AddFriends,
  User,
  LogWater,
  CupSize,
  Litreboards,
} from "./screens";

const screens = [
  { name: "Start", component: Start, disable: true },
  { name: "SignIn", component: SignIn, disable: true },
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
  { name: "CupSize", component: CupSize, disable: true },
];

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ ...hideHeader, cardStyleInterpolator: forFade }}
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