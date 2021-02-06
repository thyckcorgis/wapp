import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";


interface HomeScreenProps {
    navigation: StackNavigationHelpers;
  }
  

export default function HomeScreen({ navigation }: HomeScreenProps) {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text style={{padding:50}}>This is the home screen</Text>
            </TouchableOpacity>        
        </View>

    )
}

