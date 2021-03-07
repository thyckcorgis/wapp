import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { Route } from "@react-navigation/native";

import { Colours, Styles } from "../../../styles";

import { storeData } from "../../../storage";
import { setDailyIntake } from "../../../api";

import SafeGradient from "../../SafeGradient";
import ScreenProps from "../ScreenProps";

interface WaterIntakeParams {
  username: string;
  daily: number;
}

interface WaterIntakeScreenProps extends ScreenProps {
  route: Route<"Intake", WaterIntakeParams>;
}

export default function WaterIntakeScreen({
  navigation,
  route: {
    params: { daily, username },
  },
}: WaterIntakeScreenProps) {
  const [intake, setIntake] = useState(`${daily}`);
  async function addDailyIntake() {
    const data = await setDailyIntake(username, Number(intake));
    if (!data.ok) {
      console.log(data.messsage);
    } else {
      storeData("user", data.user);
      navigation.navigate("Reminder");
    }
  }
  return (
    <SafeGradient colors={[Colours.lightBlue, Colours.yellow]}>
      {/* <KeyboardAvoidingView behavior="padding"> */}
      <ScrollView
        style={styles.scroll}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View style={styles.textBox}>
          <Text style={{ ...Styles.title, ...styles.title }}>
            Set your daily water intake goal.
          </Text>
          <Text style={{ ...Styles.title, ...styles.text }}>
            Based on your information, your recomended intake is {daily} Litres. But you can change
            that to whatever you like!
          </Text>
          <TextInput
            placeholder={daily.toString()}
            placeholderTextColor={Colours.medBlue}
            onChangeText={(text) => setIntake(text)}
            value={String(intake)}
            style={styles.editField}
            keyboardType="decimal-pad"
          />
          <TouchableOpacity
            onPress={addDailyIntake}
            style={{ ...Styles.buttonShape, ...styles.submitButton }}
          >
            <Text style={{ ...Styles.body, ...styles.submitText }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* </KeyboardAvoidingView> */}
    </SafeGradient>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    alignSelf: "stretch",
    width: Dimensions.get("window").width,
  },
  textBox: {
    flex: 1,
    justifyContent: "center",
    margin: "10%",
  },
  title: {
    textAlign: "center",
    color: Colours.darkBlue,
  },
  text: {
    marginVertical: 10,
    textAlign: "center",
    color: Colours.medBlue,
    fontSize: 25,
  },
  editField: {
    borderWidth: 1,
    borderColor: Colours.medBlue,
    borderRadius: 20,
    height: 50,
    width: 100,
    marginVertical: 10,
    padding: 5,
    textAlign: "center",
    alignSelf: "center",
  },
  submitButton: {
    backgroundColor: Colours.medBlue,
  },
  submitText: {
    textAlign: "center",
    color: Colours.yellow,
  },
});
