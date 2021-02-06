import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, TextInput, } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { Picker } from "@react-native-picker/picker";


import {useState} from "react"


interface RegisterScreenProps {
    navigation: StackNavigationHelpers;
  }

  const textField = (
    placeholder: string,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    numberPad: boolean,
    //style?: 
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
    numberPad: boolean,
    //style?:
  ) => (
    <View>
      <Text>{placeholder + ":"}</Text>
      {textField(placeholder, value, setValue, numberPad, /*style*/)}
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
            <Text style={{padding:50}}>Who are you?????</Text>
            {input("Name", name, setName, false)}
            {input("Username", username, setUsername, false)}
            {input("Password", password, setPassword, false)}
            {input("Repeat Password", password2, setPassword2, false)}
            {input("Weight", weight, setWeight, true)}
            <View>
                <Picker
                mode="dropdown"
                selectedValue={activityLevel}
                style={{ width: "100%" }}
                onValueChange={(itemValue) =>
                    setActivityLevel(itemValue as string)
                }
                >
                <Picker.Item label="Inactive" value="0" />
                <Picker.Item label="Low" value="1" />
                <Picker.Item label="Moderate" value="2" />
                <Picker.Item label="High" value="3" />
                <Picker.Item label="Very high" value="4" />
                </Picker>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Intake")}>
                <Text style={{padding:50}}>Submit</Text>
            </TouchableOpacity>

        </View>
    )
}

