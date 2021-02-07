import React from "react";
import { Text, StyleSheet, View, TouchableOpacity} from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";


interface LogWaterScreenProps {
    navigation: StackNavigationHelpers;
  }
  

export default function ReminderScreen({ navigation }: LogWaterScreenProps) {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("LogWater")}>
                <Text style={{padding:50}}>This is the log water screen</Text>
            </TouchableOpacity>        
        </View>

    )
}

