import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";

interface CupSizeScreenProps {
  navigation: StackNavigationHelpers;
}

const cup = (number: number) => (
  <Text style={{ padding: 50 }}>Cup number {number}</Text>
);

export default function CupSizeScreen({ navigation }: CupSizeScreenProps) {
  let i = 0;
  let array: JSX.Element[] = [];
  function cupHandler() {
    array.push(cup(i));
    i++;
    console.log(array);
  }

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={{ padding: 50 }}>This is the cup size screen</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => cupHandler()}>
        <Text style={{ padding: 50 }}>Add cup</Text>
      </TouchableOpacity>
      {array}
    </View>
  );
}
