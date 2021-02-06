import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { LinearGradient } from "expo-linear-gradient";
import Colours from "../styles/colours";

interface HomeScreenProps {
  navigation: StackNavigationHelpers;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.screen}>
      <LinearGradient colors={[Colours.lightBlue, Colours.yellow]} />
      <Text>This is the home screen</Text>
    </View>
  );
}
