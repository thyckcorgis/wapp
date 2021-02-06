import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { LinearGradient } from "expo-linear-gradient";
import Colours from "../styles/colours";

interface HomeScreenProps {
  navigation: StackNavigationHelpers;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("Friends")}>
        <Text style={{ padding: 50 }}>This is the home screen</Text>
      </TouchableOpacity>
    </View>
  );
}
