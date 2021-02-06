import React from "react";
import { Text, StyleSheet, View, } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";


interface WelcomeScreenProps {
    navigation: StackNavigationHelpers;
  }
  

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
    return (
        <View>
            <Text>This is the welcome screen</Text>
        </View>

    )
}

