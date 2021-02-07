import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { storeData } from "../storage";

interface UserScreenProps {
  navigation: StackNavigationHelpers;
}

export default function UserScreen({ navigation }: UserScreenProps) {
  function logout() {
    storeData("user", null);
    navigation.navigate("SignIn");
  }

  return (
    <View>
      <Text style={{ padding: 50 }}>This is the user screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={{ padding: 50 }}>go back</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logout}>
        <Text style={{ padding: 50 }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
