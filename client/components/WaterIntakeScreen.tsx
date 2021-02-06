import React from "react";
import { Text, StyleSheet, View, TouchableOpacity} from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";


interface WaterIntakeScreenProps {
    navigation: StackNavigationHelpers;
  }
  

export default function WaterIntakeScreen({ navigation }: WaterIntakeScreenProps) {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("Reminder")}>
                <Text style={{padding:50}}>This is the water intake screen</Text>
            </TouchableOpacity>        
        </View>

    )
}

