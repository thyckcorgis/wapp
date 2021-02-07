import React from "react";
import { Text, StyleSheet, View, TouchableOpacity} from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";


interface CupSizeScreenProps {
    navigation: StackNavigationHelpers;
  }
  

export default function CupSizeScreen({ navigation }: CupSizeScreenProps) {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("LogWater")}>
                <Text style={{padding:50}}>This is the cup size screen</Text>
            </TouchableOpacity>        
        </View>
    )
}

