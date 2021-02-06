import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, TextInput} from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { useState } from "react";


interface WaterIntakeScreenProps {
    navigation: StackNavigationHelpers;
  }
  

export default function WaterIntakeScreen({ navigation }: WaterIntakeScreenProps) {
    
    const [intake, setIntake] = useState("");

    const water = 69420;

    return (
        <View>
            <Text style={{padding:50}}>Set your daily water intake goal. Based on your information, 
                    your recomended intake is {water} litres. But you can change that to whatever you like!
            </Text>
            <TextInput
                placeholder={water.toString()}
                onChangeText={(text) => setIntake(text)}
                value={intake}
            />
            <TouchableOpacity onPress={() => navigation.navigate("Reminder")}>
                <Text>Submit</Text>
            </TouchableOpacity>        
        </View>

    )
}

