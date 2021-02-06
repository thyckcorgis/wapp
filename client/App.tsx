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
import FriendsScreen from "./components/FriendsScreen";
import CalenderScreen from "./components/CalenderScreen";
import AddFriendsScreen from './components/AddFriendsScreen';

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
          name="SignIn"
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
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={hideHeader} 
        />
        <Stack.Screen
          name="Friends"
          component={FriendsScreen}
          options={hideHeader}
        />
        <Stack.Screen
          name="Calender"
          component={CalenderScreen}
          options={hideHeader}
        />
        <Stack.Screen
          name="AddFriends"
          component={AddFriendsScreen}
          options={hideHeader}
        />
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
