import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import Styles from "../styles/styles";
import Colours from "../styles/colours";
import { Route } from "@react-navigation/core";
import { API_URL } from "../constants";
import fetch from "axios";
import { storeData } from "../storage";

interface WaterIntakeParams {
  username: string;
  daily: number;
}

interface WaterIntakeScreenProps {
  navigation: StackNavigationHelpers;
  route: Route<"Intake", WaterIntakeParams>;
}

export default function WaterIntakeScreen({
  navigation,
  route: {
    params: { daily, username },
  },
}: WaterIntakeScreenProps) {
  const [intake, setIntake] = useState(daily);
  async function addDailyIntake() {
    const daily = intake;
    const userData = { username, daily };
    const { data } = await fetch({
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `${API_URL}/user/daily`,
      data: userData,
      method: "POST",
    });
    if (!data.ok) {
      console.log(data.messsage);
    } else {
      storeData("user", data.user);
      navigation.navigate("Reminder");
    }
  }

  return (
    <SafeAreaView style={Styles.screen}>
      <LinearGradient
        style={Styles.background}
        colors={[Colours.lightBlue, Colours.yellow]}
      />
      <KeyboardAvoidingView behavior="padding">
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
              Based on your information, your recomended intake is {intake}{" "}
              Litres. But you can change that to whatever you like!
            </Text>
            <TextInput
              placeholder={String(42069)}
              placeholderTextColor={Colours.medBlue}
              onChangeText={(text) => setIntake(Number(text))}
              value={String(intake)}
              style={styles.editField}
              keyboardType="number-pad"
            />
            <TouchableOpacity
              onPress={addDailyIntake}
              style={{ ...Styles.buttonShape, ...styles.submitButton }}
            >
              <Text style={{ ...Styles.body, ...styles.submitText }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    margin: 40,
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
