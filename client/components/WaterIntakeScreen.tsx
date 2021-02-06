import React from "react";
import { Text, StyleSheet, View, } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";


interface WaterIntakeScreenProps {
    navigation: StackNavigationHelpers;
  }
  

export default function WaterIntakeScreen({ navigation }: WaterIntakeScreenProps) {
    return (
        <View>
            <Text>This is the water intake screen</Text>
        </View>

    )
}

