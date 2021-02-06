import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";


interface WelcomeScreenProps {
    navigation: StackNavigationHelpers;
  }
  

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text style={{padding:50}}>This is the welcome screen</Text>
            </TouchableOpacity>
        </View>

    )
}

