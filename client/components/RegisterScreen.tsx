import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, TextInput, } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";

import {useState} from "react"


interface RegisterScreenProps {
    navigation: StackNavigationHelpers;
  }

  const textField = (
    placeholder: string,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    //style?: 
    numberPad: boolean,
  ) => (
    <TextInput
      //style=
      placeholder={placeholder}
      onChangeText={(text) => setValue(text)}
      value={value}
      keyboardType={numberPad ? "number-pad" : "default"}
    />
  );

  const input = (
    placeholder: string,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    //style?:
    numberPad: boolean,
  ) => (
    <View>
      <Text>{placeholder + ":"}</Text>
      {textField(placeholder, value, setValue, /*style*/ numberPad)}
    </View>
  );
  

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [weight, setWeight] = useState("");
    const [activityLevel, setActivityLevel] = useState("");

    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("Intake")}>
                <Text style={{padding:50}}>This is the register screen</Text>
            </TouchableOpacity>
            <Text style={{padding:50}}>Who are you?????</Text>
            {input("Name", name, setName, false)}
            {input("Username", username, setUsername, false)}
            {input("Password", password, setPassword, false)}
            {input("Repeat Password", password2, setPassword2, false)}
            {input("Weight", weight, setWeight, true)}


  
        </View>

    )
}

