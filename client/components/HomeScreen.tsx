import React from "react";
import { Text, StyleSheet, View, } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";


interface HomeScreenProps {
    navigation: StackNavigationHelpers;
  }
  

export default function HomeScreen({ navigation }: HomeScreenProps) {
    return (
        <View>
            <Text>This is the home screen</Text>
        </View>

    )
}

