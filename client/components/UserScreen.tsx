import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { storeData } from "../storage";
import { useState } from 'react';

interface UserScreenProps {
  navigation: StackNavigationHelpers;
}

export default function UserScreen({ navigation }: UserScreenProps) {
  const [intake, setIntake] = useState('');

  function logout() {
    storeData("user", null);
    navigation.navigate("SignIn");
  }

  function setDailyGoal() {
    //intake
  }

  return (
    <View>
      <Text style={{ padding: 50 }}>This is the user screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={{ padding: 50 }}>go back</Text>
      </TouchableOpacity>
      <Text style={{padding:50}}>
        Set new daily goal. 
        Current daily goal is {/* {daily} */}
      </Text>
      <TextInput
        //placeholder={daily.toString()}
        placeholder='69420'
        onChangeText={(text) => setIntake(text)}
        value={String(intake)}
        keyboardType="decimal-pad"
      />
      <TouchableOpacity
          onPress={() => setDailyGoal()}
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
