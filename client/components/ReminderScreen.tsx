import React from "react";
import { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";

import Styles from "../styles/styles";
import Colours from "../styles/colours";

interface ReminderScreenProps {
  navigation: StackNavigationHelpers;
}

export default function ReminderScreen({ navigation }: ReminderScreenProps) {
  const [wakeTime, setWakeTime] = useState(new Date());
  const [sleepTime, setSleepTime] = useState(new Date());
  const [showWake, setShowWake] = useState(false);
  const [showSleep, setShowSleep] = useState(false);

  const onChangeWake = (event, selectedWake) => {
    const currentWake = selectedWake || date;
    setShowWake(Platform.OS === "ios");
    setWakeTime(currentWake);
  };
  const onChangeSleep = (event, selectedSleep) => {
    const currentSleep = selectedSleep || date;
    setShowSleep(Platform.OS === "ios");
    setSleepTime(currentSleep);
  };

  const showWakeMode = () => {
    setShowWake(true);
  };
  const showSleepMode = () => {
    setShowSleep(true);
  };

  const showWakeTimepicker = () => {
    showWakeMode("time");
  };
  const showSleepTimepicker = () => {
    showSleepMode("time");
  };

  return (
    <View style={Styles.screen}>
      <LinearGradient
        style={Styles.background}
        colors={[Colours.lightBlue, Colours.yellow]}
      />
      <View style={styles.box}>
        <Text style={{ ...Styles.title, ...styles.titleText }}>
          Set your daily reminders:
        </Text>

        {/* WAKE TIME */}
        <View style={styles.intervalBox}>
          <TouchableOpacity
            style={{ ...Styles.buttonShape, ...styles.wakeButton }}
            onPress={showWakeTimepicker}
          >
            <Text style={{ ...Styles.body, ...styles.wakeText }}>
              Set Wake Up Time
            </Text>
          </TouchableOpacity>
          {showWake && (
            <DateTimePicker
              testID="dateTimePicker"
              value={wakeTime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeWake}
              textColor={Colours.medBlue}
            />
          )}
        </View>

        {/* SLEEP TIME */}
        <View style={styles.intervalBox}>
          <TouchableOpacity
            style={{ ...Styles.buttonShape, ...styles.sleepButton }}
            onPress={showSleepTimepicker}
          >
            <Text style={{ ...Styles.body, ...styles.sleepText }}>
              Set Sleep Time
            </Text>
          </TouchableOpacity>
          {showSleep && (
            <DateTimePicker
              testID="dateTimePicker"
              value={sleepTime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeSleep}
              textColor={Colours.medBlue}
            />
          )}
        </View>

        <TouchableOpacity
          onPress={() => reminders()}
          style={{ ...Styles.buttonShape, ...styles.submitButton }}
        >
          <Text style={{ ...Styles.body, ...styles.submitText }}>Submit</Text>
        </TouchableOpacity>
        {/* RANDOM STUFF */}
        <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
          <Text style={{ padding: 50 }}>This is the reminder screen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginHorizontal: 50,
    alignItems: "center",
  },
  intervalBox: {
    // flex: 1,
    // flexDirection: "row",
    alignSelf: "center",
    // borderColor: "black",
    // borderWidth: 1,
  },
  headerText: {
    fontSize: 18,
    color: Colours.medBlue,
  },
  titleText: {
    color: Colours.darkBlue,
    paddingVertical: 20,
  },
  wakeButton: {
    backgroundColor: Colours.yellow,
    width: 150,
  },
  wakeText: {
    color: Colours.darkBlue,
    textAlign: "center",
  },
  sleepButton: {
    backgroundColor: Colours.darkBlue,
    width: 150,
  },
  sleepText: {
    color: Colours.yellow,
    textAlign: "center",
  },
  submitText: {
    textAlign: "center",
    color: Colours.yellow,
  },
  submitButton: {
    marginTop: 30,
    backgroundColor: Colours.medBlue,
    marginVertical: 10,
  },
});
