import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { getData, storeData } from "../storage";
import { useState } from 'react';
import { setDailyIntake } from '../api'

interface UserScreenProps {
  navigation: StackNavigationHelpers;
}

interface User {
  username: string;
  daily: string;
}

export default function UserScreen({ navigation }: UserScreenProps) {
  const [newIntake, setNewIntake] = useState('');
  const [intake, setIntake] = useState('');

  async function getUser() {
    const user = await getData('user') as User;
    if (user == null) {
      return;
    } else {
    const { daily, username } = user
    setIntake(daily)    
    return username;
    }
  }
  

  function logout() {
    storeData("user", null);
    navigation.navigate("SignIn");
  }

    //const [intake, setIntake] = useState(`${daily}`);
    async function updateIntake() {
      const username = getUser();
      const data = await setDailyIntake(username.toString(), Number(newIntake));
      if (!data.ok) {
        console.log(data.messsage);
      } else {
        storeData("user", data.user);
        navigation.navigate("Reminder");
      }
    }  

  return (
    <View>
      <Text style={{ padding: 50 }}>This is the user screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={{ padding: 50 }}>go back</Text>
      </TouchableOpacity>
      <Text style={{padding:50}}>
        Set new daily goal. 
        Current daily goal is {intake}
      </Text>
      <TextInput
        placeholder={intake}
        onChangeText={(text) => setNewIntake(text)}
        value={String(newIntake)}
        keyboardType="decimal-pad"
      />
      <TouchableOpacity
          onPress={() => updateIntake()}
          //style={{ ...Styles.buttonShape, ...styles.submitButton }}
        >
          <Text /*style={{ ...Styles.body, ...styles.submitText }}*/>Submit</Text>
        </TouchableOpacity>
      <TouchableOpacity onPress={logout}>
        <Text style={{ padding: 50 }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
