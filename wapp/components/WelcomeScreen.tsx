import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { getData } from "../storage";

interface WelcomeScreenProps {
  navigation: StackNavigationHelpers;
}

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  async function nextScreen() {
    const data = await getData("user");
    navigation.navigate("Home", data);
  }
  return (
    <View>
      <TouchableOpacity onPress={nextScreen}>
        <Text style={{ padding: 50 }}>This is the welcome screen</Text>
      </TouchableOpacity>
    </View>
  );
}
