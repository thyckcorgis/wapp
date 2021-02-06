import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";


interface SignInScreen {
    navigation: StackNavigationHelpers;
  }
  

export default function SignInScreen({ navigation }: SignInScreen) {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={{padding:50}}>This is the Sign In screen</Text>
            </TouchableOpacity>        
        </View>

    )
}

