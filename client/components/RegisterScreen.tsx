import React from "react";
import { storeData } from "../storage";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { API_URL } from "../constants";
import { Picker } from "@react-native-picker/picker";

import { useState } from "react";
import fetch from "axios";

interface RegisterScreenProps {
  navigation: StackNavigationHelpers;
}

const textField = (
  placeholder: string,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  numberPad: boolean
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
  numberPad: boolean
  //style?:
) => (
  <View>
    <Text>{placeholder + ":"}</Text>
    {textField(placeholder, value, setValue, numberPad /*style*/)}
  </View>
);

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");

  async function registerUser() {
    const userData = {
      username,
      name,
      daily: 420.69,
      password,
    };
    const { data } = await fetch({
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `${API_URL}/user/register`,
      data: userData,
      method: "POST",
    });
    if (!data.ok) {
      console.log(data.message);
    } else {
      await storeData("user", data.user);
      navigation.navigate("Welcome");
    }
  }

  return (
    <View>
      <TouchableOpacity onPress={() => registerUser()}>
        <Text style={{ padding: 50 }}>Register Screen</Text>
      </TouchableOpacity>
      {input("Name", name, setName, false)}
      {input("Username", username, setUsername, false)}
      {input("Password", password, setPassword, false)}
      {input("Repeat Password", password2, setPassword2, false)}
      {input("Weight", weight, setWeight, true)}
      <Text>Activity Level</Text>
      <View>
        <Picker
          mode="dropdown"
          selectedValue={activityLevel}
          style={{ width: "100%" }}
          onValueChange={(itemValue) => setActivityLevel(itemValue as string)}
        >
          <Picker.Item label="Inactive" value="0" />
          <Picker.Item label="Low" value="1" />
          <Picker.Item label="Moderate" value="2" />
          <Picker.Item label="High" value="3" />
          <Picker.Item label="Very high" value="4" />
        </Picker>
      </View>
      <TouchableOpacity onPress={() => registerUser()}>
        <Text style={{ padding: 50 }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
