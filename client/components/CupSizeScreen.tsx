import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import Styles from "../styles/styles";
import Colours from "../styles/colours";

import { HomeIcon } from "../assets";

interface CupSizeScreenProps {
  navigation: StackNavigationHelpers;
}

export interface Cup {
  name: string;
  size: string;
}

const textField = (
  placeholder: string,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  numberPad: boolean
) => (
  <TextInput
    style={{ ...Styles.inputField, ...styles.inputField }}
    // placeholder={placeholder}
    placeholderTextColor={Colours.darkBlue}
    onChangeText={(text) => setValue(text)}
    value={value}
    keyboardType={numberPad ? "decimal-pad" : "default"}
  />
);

const input = (
  placeholder: string,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  numberPad: boolean
) => (
  <View>
    <Text style={{ ...Styles.body, ...styles.smallText }}>
      {placeholder + ":"}
    </Text>
    {textField(placeholder, value, setValue, numberPad)}
  </View>
);

export default function CupSizeScreen({ navigation }: CupSizeScreenProps) {
  const [cups, setCups] = useState<Cup[]>([]);
  const [name, setName] = useState("");
  const [size, setSize] = useState("");

  function addCup() {
    if (name === "" || size === "") return;
    setCups((c) => [...c, { name, size }]);
    setName("");
    setSize("");
  }

  return (
    <SafeAreaView style={Styles.screen}>
      <LinearGradient
        style={Styles.background}
        colors={[Colours.darkBlue, Colours.medBlue]}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={{ ...Styles.title, ...styles.title }}>Make a cup</Text>
      </TouchableOpacity>
      <View style={styles.cupBox}>
        {input("Name of cup (eg: My Green Bottle)", name, setName, false)}
        {input("Size of cup (mL)", size, setSize, true)}
        <TouchableOpacity
          style={{ ...Styles.buttonShape, ...styles.addButton }}
          onPress={addCup}
        >
          <Text style={{ ...Styles.body, ...styles.addText }}>Add new cup</Text>
        </TouchableOpacity>
        {cups.map(({ name, size }) => (
          <View style={{ padding: 50 }} key={name}>
            <Text>
              {name}: {size} mL
            </Text>
          </View>
        ))}
      </View>
      <View style={{ ...Styles.navBar }}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <HomeIcon />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cupBox: {
    flex: 1,
    justifyContent: "center",
    margin: 40,
  },
  inputField: {
    borderColor: Colours.yellow,
  },
  title: {
    textAlign: "center",
    color: Colours.yellow,
    marginTop: 30,
  },
  smallText: {
    textAlign: "center",
    color: Colours.yellow,
  },
  addButton: {
    backgroundColor: Colours.yellow,
  },
  addText: {
    textAlign: "center",
    color: Colours.darkBlue,
  },
});
