import React from "react";
import { Text, StyleSheet, View, TouchableOpacity} from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";


interface LogWaterScreenProps {
    navigation: StackNavigationHelpers;
  }

const cup = (
    number: number
) => (
    <Text style={{padding:50}}>Cup number {number}</Text>
)
  

export default function ReminderScreen({ navigation }: LogWaterScreenProps) {

    let i = 0
    let array: JSX.Element[] = []
    function cupHandler() {
        array.push(cup(i))
        i++
        console.log(array)
    }


    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text style={{padding:50}}>This is the log water screen</Text>
            </TouchableOpacity>    
            <TouchableOpacity onPress={() => navigation.navigate("CupSize")}>
                <Text style={{padding:50}}>Customize your cup size</Text>
            </TouchableOpacity>  
            <TouchableOpacity onPress={() => cupHandler()}>
                <Text style={{padding:50}}>Add cup</Text>
            </TouchableOpacity> 
            { array }
        </View>
    )
}

