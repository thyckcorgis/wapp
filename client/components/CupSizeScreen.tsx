import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { useState, useEffect } from "react";

interface CupSizeScreenProps {
  navigation: StackNavigationHelpers;
}

const cup = (number: number) => (
  <Text style={{ padding: 50 }}>Cup number {number}</Text>
);
let array: JSX.Element[] = [];

export default function CupSizeScreen({ navigation }: CupSizeScreenProps) {
  const [newCup, setNewCup] = useState(0);

  useEffect(() => {
    array.push(cup(newCup));
    console.log(array);
  });

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={{ padding: 50 }}>This is the cup size screen</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setNewCup(newCup + 1)}>
        <Text style={{ padding: 50 }}>Add cup</Text>
      </TouchableOpacity>
      {array}
    </View>
  );
}
