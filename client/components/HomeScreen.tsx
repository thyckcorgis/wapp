import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { LinearGradient } from "expo-linear-gradient";
import Colours from "../styles/colours";
import { Route } from "@react-navigation/native";

interface HomeParams {
  username: string;
  name: string;
  friends: string[];
  daily: number;
  currentIntake: number;
}
interface HomeScreenProps {
  navigation: StackNavigationHelpers;
  route: Route<"Home", HomeParams>;
}

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("AddFriends")}>
        <Text style={{ padding: 50 }}>This is the home screen</Text>
        <Text style={{ padding: 50 }}>{JSON.stringify(route.params)}</Text>
      </TouchableOpacity>
    </View>
  );
}
