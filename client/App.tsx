import React from "react";
import { useNotifications } from "./hooks/";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

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
  Litreboards,
} from "./components";
import { StackCardStyleInterpolator } from "react-navigation-stack";

const Stack = createStackNavigator();
const forFade: StackCardStyleInterpolator = ({ current: { progress } }) => ({
  cardStyle: {
    opacity: progress,
  },
});

const hideHeader = { headerShown: false };
const disableSwipeBack = { gestureEnabled: false };
const hideAndDisable = { ...hideHeader, ...disableSwipeBack };

const screens = [
  { name: "Start", component: StartScreen, disable: true },
  { name: "SignIn", component: SignInScreen, disable: true },
  { name: "Register", component: RegisterScreen, disable: false },
  { name: "Intake", component: WaterIntakeScreen, disable: false },
  { name: "Reminder", component: ReminderScreen, disable: false },
  { name: "Welcome", component: WelcomeScreen, disable: true },
  { name: "Home", component: HomeScreen, disable: true },
  { name: "Friends", component: FriendsScreen, disable: true },
  { name: "Litreboards", component: Litreboards, disable: true },
  { name: "Calender", component: CalenderScreen, disable: true },
  { name: "AddFriends", component: AddFriendsScreen, disable: true },
  { name: "User", component: UserScreen, disable: true },
  { name: "LogWater", component: LogWaterScreen, disable: true },
  { name: "CupSize", component: CupSizeScreen, disable: true },
];

export default function App() {
  const [notification] = useNotifications();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ ...hideHeader, cardStyleInterpolator: forFade }}
      >
        {screens.map((screen) => (
          <Stack.Screen
            name={screen.name}
            component={screen.component}
            options={screen.disable ? hideAndDisable : hideHeader}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
