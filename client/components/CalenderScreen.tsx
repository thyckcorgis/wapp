import React from "react";
import { Text, StyleSheet, View, TouchableOpacity} from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";


interface CalenderScreenProps {
    navigation: StackNavigationHelpers;
  }
  

export default function AddFriendsScreen({ navigation }: CalenderScreenProps) {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("Calender")}>
                <Text style={{padding:50}}>This is the calender screen</Text>
            </TouchableOpacity>        
        </View>

    )
}

