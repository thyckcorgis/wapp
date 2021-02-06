import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import Styles from "../styles/styles";
import Colours from "../styles/colours";

interface WaterIntakeScreenProps {
  navigation: StackNavigationHelpers;
}

export default function WaterIntakeScreen({
  navigation,
}: WaterIntakeScreenProps) {
  const [intake, setIntake] = useState("");

  const water = 69420;

  return (
    <View style={Styles.screen}>
      <LinearGradient
        style={Styles.background}
        colors={[Colours.lightBlue, Colours.yellow]}
      />
      <Text style={{ ...Styles.title, ...styles.text }}>
        Set your daily water intake goal. Based on your information, your
        recomended intake is {water} litres. But you can change that to whatever
        you like!
      </Text>
      <TextInput
        placeholder={water.toString()}
        onChangeText={(text) => setIntake(text)}
        value={intake}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Reminder")}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
});
