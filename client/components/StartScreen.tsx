import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";


interface StartScreenProps {
    navigation: StackNavigationHelpers;
  }
  

export default function StartScreen({ navigation }: StartScreenProps) {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                <Text style={{padding:50}}>This is the start screen</Text>
            </TouchableOpacity>
        </View>

    )
}

