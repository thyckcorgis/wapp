import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { LinearGradient } from "expo-linear-gradient";

import Styles from "../styles/styles";
import Colours from "../styles/colours";

interface FriendsScreenProps {
  navigation: StackNavigationHelpers;
}

export default function FriendsScreen({ navigation }: FriendsScreenProps) {
  return (
    <View style={Styles.screen}>
      <LinearGradient
        style={Styles.background}
        colors={[Colours.darkBlue, Colours.medBlue]}
      />
      <Text style={Styles.title}>Friends</Text>
      <TouchableOpacity onPress={() => navigation.navigate("AddFriends")}>
        <Text style={{ padding: 50 }}>Go to add friends screen</Text>
      </TouchableOpacity>
    </View>
  );
}
