import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";


interface RegisterScreenProps {
    navigation: StackNavigationHelpers;
  }
  

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("Intake")}>
                <Text style={{padding:50}}>This is the register screen</Text>
            </TouchableOpacity>        
        </View>

    )
}

