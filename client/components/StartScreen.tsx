import React from "react";
import { Text, StyleSheet, View, } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";


interface StartScreenProps {
    navigation: StackNavigationHelpers;
  }
  

export default function StartScreen({ navigation }: StartScreenProps) {
    return (
        <View>
            <Text>This is the start screen</Text>
        </View>

    )
}

