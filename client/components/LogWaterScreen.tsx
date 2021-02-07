import React from "react";
import { Text, StyleSheet, View, TouchableOpacity} from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";


interface LogWaterScreenProps {
    navigation: StackNavigationHelpers;
  }
  

export default function ReminderScreen({ navigation }: LogWaterScreenProps) {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text style={{padding:50}}>This is the log water screen</Text>
            </TouchableOpacity>    
            <TouchableOpacity onPress={() => navigation.navigate("CupSize")}>
                <Text style={{padding:50}}>Customize your cup size</Text>
            </TouchableOpacity>  
        </View>
    )
}

