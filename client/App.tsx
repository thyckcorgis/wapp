import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Notification from "./notifications";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import {
  StartScreen as Start,
  SignInScreen as SignIn,
  RegisterScreen as Register,
  WaterIntakeScreen as WaterIntake,
  ReminderScreen as Reminder,
  WelcomeScreen as Welcome,
  HomeScreen as Home,
  FriendsScreen as Friends,
  CalenderScreen as Calender,
  AddFriendsScreen as AddFriends,
  UserScreen as User,
  LogWaterScreen as LogWater,
  CupSizeScreen as CupSize,
} from "./components";
const Stack = createStackNavigator();

interface ScreenProps {
  name: string;
  component: (t: any) => JSX.Element;
}
function hideHeader() {
  return { headerShown: false };
}
const Screen = ({ name, component }: ScreenProps) => {
  return (
    <Stack.Screen name={name} component={component} options={hideHeader} />
  );
};

export default function App() {
  // return <ReminderScreen />;
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ ...hideHeader }}>
        <Screen name="Start" component={Start} />
        <Screen name="SignIn" component={SignIn} />
        <Screen name="Register" component={Register} />
        <Screen name="Intake" component={WaterIntake} />
        <Screen name="Reminder" component={Reminder} />
        <Screen name="Welcome" component={Welcome} />
        <Screen name="Home" component={Home} />
        <Screen name="Friends" component={Friends} />
        <Screen name="Calender" component={Calender} />
        <Screen name="AddFriends" component={AddFriends} />
        <Screen name="User" component={User} />
        <Screen name="LogWater" component={LogWater} />
        <Screen name="CupSize" component={CupSize} />
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
