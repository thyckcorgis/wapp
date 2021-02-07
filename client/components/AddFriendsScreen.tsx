import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";

interface AddFriendsScreenProps {
  navigation: StackNavigationHelpers;
}

export default function AddFriendsScreen({
  navigation,
}: AddFriendsScreenProps) {
  return (
    <View>
      <Text style={{ padding: 50 }}>This is the add friends screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Friends")}>
        <Text style={{ padding: 50 }}>go back</Text>
      </TouchableOpacity>
    </View>
  );
}
