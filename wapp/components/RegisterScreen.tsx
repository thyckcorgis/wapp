import React from "react";
import { storeData } from "../storage";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { LinearGradient } from "expo-linear-gradient";
import { API_URL } from "../constants";

import Styles from "../styles/styles";
import Colours from "../styles/colours";
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
) => (
  <TextInput
    style={{ ...Styles.inputField, ...styles.inputField }}
    placeholder={placeholder}
    placeholderTextColor={Colours.medBlue}
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
  <View style={styles.item}>
    <Text style={{ ...Styles.body, ...styles.headerText }}>
      {placeholder + ":"}
    </Text>
    {textField(placeholder, value, setValue, numberPad)}
  </View>
);

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [error, setError] = useState("");

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
      setError(data.message);
      console.log(data.messsage);
    } else {
      storeData("user", data.user);
      navigation.navigate("Intake");
    }
  }


  return (
    <SafeAreaView style={Styles.screen}>
      <LinearGradient
        style={Styles.background}
        colors={[Colours.lightBlue, Colours.yellow]}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Intake")}>
        <Text>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => registerUser()}>
        <Text style={{ ...Styles.title, ...styles.titleText }}>
          Who are you?
        </Text>
      </TouchableOpacity>

      <ScrollView
        keyboardDismissMode="on-drag"
        style={styles.scroll}
        //showsVerticalScrollIndicator="true"
      >
        {input("Name", name, setName, false)}
        {input("Username", username, setUsername, false)}
        {input("Password", password, setPassword, false)}
        {input("Repeat Password", password2, setPassword2, false)}
        {input("Weight", weight, setWeight, true)}
        <Text style={{ ...Styles.body, ...styles.activityText }}>
          Activity Level
        </Text>
        <View style={styles.pickerContainer}>
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
        <TouchableOpacity
          onPress={() => registerUser()}
          style={{ ...Styles.buttonShape, ...styles.submitButton }}
        >
          <Text style={Styles.error}>{error}</Text>
          <Text style={{ ...Styles.body, ...styles.submitText }}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    alignSelf: "stretch",
    width: Dimensions.get("window").width,
  },
  pickerContainer: {
    alignSelf: "center",
    borderWidth: 1,
    borderColor: Colours.medBlue,
    borderRadius: 20,
    width: 250,
    height: 200,
    paddingVertical: 10,
    marginVertical: 10,
  },
  item: {
    width: 250,
    alignSelf: "center",
    marginVertical: "5%",
  },
  inputField: {
    borderColor: Colours.medBlue,
    color: Colours.medBlue,
  },
  titleText: {
    textAlign: "center",
    color: Colours.medBlue,
    marginTop: 50,
  },
  activityText: {
    textAlign: "center",
    color: Colours.medBlue,
    fontSize: 20,
  },
  headerText: {
    textAlign: "left",
    color: Colours.medBlue,
    fontSize: 20,
  },
  submitText: {
    textAlign: "center",
    color: Colours.yellow,
  },
  submitButton: {
    backgroundColor: Colours.medBlue,
    marginVertical: 10,
  },
});
