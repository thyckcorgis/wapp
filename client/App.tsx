import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import StartScreen from "./components/StartScreen";
import SignInScreen from "./components/SignInScreen";
import RegisterScreen from "./components/RegisterScreen";
import WaterIntakeScreen from "./components/WaterIntakeScreen";
import ReminderScreen from "./components/ReminderScreen";
import WelcomeScreen from "./components/WelcomeScreen";
import HomeScreen from "./components/HomeScreen";

const Stack = createStackNavigator();


export default function App() {
  function hideHeader() {
    return { headerShown: false };
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ ...hideHeader}}
      >
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={hideHeader}
        />
        <Stack.Screen
          name="Sign In"
          component={SignInScreen}
          options={hideHeader}
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
          options={hideHeader}
        />
        <Stack.Screen name="Home" component={HomeScreen} options={hideHeader} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
