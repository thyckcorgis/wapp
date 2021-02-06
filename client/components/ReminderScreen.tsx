import React from "react";
import { Text, StyleSheet, View, TouchableOpacity} from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";


interface ReminderScreenProps {
    navigation: StackNavigationHelpers;
  }
  

export default function ReminderScreen({ navigation }: ReminderScreenProps) {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
                <Text style={{padding:50}}>This is the reminder screen</Text>
            </TouchableOpacity>        
        </View>

    )
}

