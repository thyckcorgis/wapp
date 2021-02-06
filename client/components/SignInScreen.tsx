import React from "react";
import { Text, StyleSheet, View, } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";


interface SignInScreen {
    navigation: StackNavigationHelpers;
  }
  

export default function SignInScreen({ navigation }: SignInScreen) {
    return (
        <View>
            <Text>This is the sign in screen</Text>
        </View>

    )
}

