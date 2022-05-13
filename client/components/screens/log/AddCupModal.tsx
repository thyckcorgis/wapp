import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { XButton } from "../../../assets";
import { getData, storeData } from "../../../storage";
import { Colours, Styles } from "../../../styles";
import SafeGradient from "../../SafeGradient";
import ScreenProps from "../ScreenProps";

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
    <Text style={{ ...Styles.body, ...styles.smallText }}>{placeholder + ":"}</Text>
    {textField(placeholder, value, setValue, numberPad)}
  </View>
);

export default function AddCupModal({ navigation }: ScreenProps) {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");

  async function addCup() {
    if (name === "" || size === "") return;
    const cups = (await getData("cups")) as Cup[];
    if (cups == null) return navigation.navigate("SignIn");

    cups.push({ name, size });
    await storeData("cups", cups);
    navigation.navigate("LogWater", { refresh: true });
  }

  return (
    <SafeGradient colors={[Colours.lightBlue, Colours.yellow]}>
      <TouchableOpacity
        style={styles.xButton}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        onPress={() => navigation.navigate("LogWater", { refresh: true })}
      >
        <XButton />
      </TouchableOpacity>
      <KeyboardAvoidingView behavior="padding" style={styles.cupBox}>
        <Text style={{ ...Styles.title, ...styles.title }}>Create new cup</Text>
        {input("Name of cup (eg: The Purple Bottle)", name, setName, false)}
        {input("Size of cup (mL)", size, setSize, true)}
        <TouchableOpacity style={{ ...Styles.buttonShape, ...styles.addButton }} onPress={addCup}>
          <Text style={{ ...Styles.body, ...styles.addText }}>Add new cup</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeGradient>
  );
}

const styles = StyleSheet.create({
  xButton: {
    top: "5%",
    left: "5%",
  },
  cupBox: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 40,
  },
  inputField: {
    borderColor: Colours.darkBlue,
  },
  title: {
    textAlign: "center",
    color: Colours.darkBlue,
    marginBottom: 30,
  },
  smallText: {
    textAlign: "center",
    color: Colours.darkBlue,
  },
  addButton: {
    backgroundColor: Colours.darkBlue,
  },
  addText: {
    textAlign: "center",
    color: Colours.yellow,
  },
});
