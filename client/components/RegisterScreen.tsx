import React from "react";
import { Text, StyleSheet, View, } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";


interface RegisterScreenProps {
    navigation: StackNavigationHelpers;
  }
  

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
    return (
        <View>
            <Text>This is the register screen</Text>
        </View>

    )
}

