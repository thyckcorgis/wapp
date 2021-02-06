import React from "react";
import { Text, StyleSheet, View, } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";


interface ReminderScreenProps {
    navigation: StackNavigationHelpers;
  }
  

export default function ReminderScreen({ navigation }: ReminderScreenProps) {
    return (
        <View>
            <Text>This is the Reminder Screen</Text>
        </View>

    )
}

