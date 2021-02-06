import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { LinearGradient } from "expo-linear-gradient";

import Styles from "../styles/styles";
import Colours from "../styles/colours";

import { StartIcon } from "../assets";

interface StartScreenProps {
  navigation: StackNavigationHelpers;
}

export default function StartScreen({ navigation }: StartScreenProps) {
  return (
    <View style={Styles.screen}>
      <LinearGradient
        colors={[Colours.lightBlue, Colours.yellow]}
        style={Styles.background}
      />
      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <View style={Styles.bigButton}>
          <StartIcon />
        </View>
      </TouchableOpacity>
    </View>
  );
}
