import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { LinearGradient } from "expo-linear-gradient";

import Colours from "../styles/colours";
import { StartIcon } from "../assets";

interface StartScreenProps {
  navigation: StackNavigationHelpers;
}

export default function StartScreen({ navigation }: StartScreenProps) {
  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={[Colours.lightBlue, Colours.yellow]}
        style={styles.background}
      />
      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <View style={styles.buttonContainer}>
          <StartIcon />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 1000,
  },
  buttonContainer: {
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
  },
});
