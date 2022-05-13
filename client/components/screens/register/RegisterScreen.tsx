import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Colours, Styles } from "../../../styles";

import { registerUser } from "../../../util";
import { storeData } from "../../../storage";
import { defaultCups } from "../../../constants";
import SafeGradient from "../../SafeGradient";
import ScreenProps from "../ScreenProps";

// this is in litres
// if you drink this many ounces of water a day you will die so don't do that
const calculateDailyIntake = (weight: number, activityLevel: number) => {
  return (weight * 0.015 + activityLevel * 0.2).toFixed(1);
};

const textField = (
  placeholder: string,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  numberPad: boolean,
  secureTextEntry?: boolean
) => (
  <TextInput
    style={{ ...Styles.inputField, ...styles.inputField }}
    placeholder={placeholder}
    placeholderTextColor={Colours.medBlue}
    onChangeText={(text) => setValue(text)}
    value={value}
    keyboardType={numberPad ? "decimal-pad" : "default"}
    secureTextEntry={secureTextEntry}
  />
);

const input = (
  placeholder: string,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  numberPad: boolean,
  secureTextEntry?: boolean
) => (
  <View style={styles.item}>
    <Text style={{ ...Styles.body, ...styles.headerText }}>{placeholder + ":"}</Text>
    {textField(placeholder, value, setValue, numberPad, secureTextEntry)}
  </View>
);

export default function RegisterScreen({ navigation }: ScreenProps) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [error, setError] = useState("");

  async function register() {
    if (name === "" || username === "" || password === "" || password2 === "" || weight === "")
      return;
    const daily = calculateDailyIntake(Number(weight), Number(activityLevel));
    const data = await registerUser(username, password, name, Number(daily));
    if (!data.ok) {
      setError(data.message);
      console.log(data.messsage);
    } else {
      storeData("user", data.user);
      storeData("cups", defaultCups);
      navigation.navigate("Intake", { username, daily });
    }
  }

  return (
    <SafeGradient colors={[Colours.lightBlue, Colours.yellow]}>
      <Text style={{ ...Styles.title, ...styles.titleText }}>Who are you?</Text>

      <ScrollView keyboardDismissMode="on-drag" style={styles.scroll}>
        {input("Name", name, setName, false)}
        {input("Username", username, setUsername, false)}
        {input("Password", password, setPassword, false, true)}
        {input("Confirm Password", password2, setPassword2, false, true)}
        {input("Weight", weight, setWeight, true)}
        <Text style={{ ...Styles.body, ...styles.activityText }}>Activity Level</Text>
        <View style={styles.pickerContainer}>
          <Picker
            mode="dropdown"
            selectedValue={activityLevel}
            itemStyle={{ ...Styles.body, ...styles.pickerItems }}
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
        <Text style={Styles.error}>{error}</Text>
        <TouchableOpacity
          onPress={() => register()}
          style={{ ...Styles.buttonShape, ...styles.submitButton }}
        >
          <Text style={{ ...Styles.body, ...styles.submitText }}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeGradient>
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
    marginVertical: "3%",
  },
  inputField: {
    borderColor: Colours.medBlue,
    color: Colours.medBlue,
  },
  titleText: {
    textAlign: "center",
    color: Colours.darkBlue,
    marginVertical: 30,
  },
  activityText: {
    textAlign: "center",
    color: Colours.darkBlue,
    fontSize: 20,
  },
  headerText: {
    textAlign: "left",
    color: Colours.darkBlue,
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
  pickerItems: {
    color: Colours.darkBlue,
    fontSize: 14,
  },
});
