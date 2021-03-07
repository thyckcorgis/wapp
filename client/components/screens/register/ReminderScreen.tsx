import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Colours, Styles } from "../../../styles";

import { getData, storeData } from "../../../storage";
import { registerForPushNotificationsAsync } from "../../../notifications";
import { uploadPushToken } from "../../../api";
import SafeGradient from "../../SafeGradient";
import ScreenProps from "../ScreenProps";

interface User {
  username: string;
  expoPushToken?: string;
}

export default function ReminderScreen({ navigation }: ScreenProps) {
  const [wakeTime, setWakeTime] = useState(new Date());
  const [sleepTime, setSleepTime] = useState(new Date());

  useEffect(() => {
    (async () => {
      const user = (await getData("user")) as User;
      if (user == null || user.expoPushToken) return;
      const token = await registerForPushNotificationsAsync();
      if (token) {
        const newUser = await uploadPushToken(user.username, token);
        await storeData("user", newUser);
      } else {
        navigation.navigate("Home");
      }
    })();
  }, []);

  const onChangeWake = (_: any, selectedWake?: Date) => {
    const currentWake = selectedWake || new Date();
    setWakeTime(currentWake);
  };
  const onChangeSleep = (_: any, selectedSleep?: Date) => {
    const currentSleep = selectedSleep || new Date();
    setSleepTime(currentSleep);
  };

  function reminders() {
    console.log({ wakeTime, sleepTime });
    console.log({
      wakeTime: wakeTime.getHours(),
      sleepTime: sleepTime.getHours(),
    });
    navigation.navigate("Welcome");
  }

  return (
    <SafeGradient colors={[Colours.lightBlue, Colours.yellow]}>
      <View style={styles.box}>
        <Text style={{ ...Styles.title, ...styles.titleText }}>Set your daily reminders:</Text>

        {/* WAKE TIME */}
        <View style={[styles.intervalBox, { backgroundColor: Colours.yellow }]}>
          <View style={[styles.headerBox, { backgroundColor: Colours.darkYellow }]}>
            <Text style={[Styles.title, styles.headerText, { color: Colours.darkBlue }]}>
              Wake Time
            </Text>
          </View>
          <DateTimePicker
            // testID="dateTimePicker"
            value={wakeTime}
            mode="time"
            is24Hour={true}
            display="spinner"
            // display="default"
            onChange={onChangeWake}
            textColor={Colours.darkBlue}
            style={{ height: 162 }}
            minuteInterval={5}
          />
        </View>

        {/* SLEEP TIME */}
        <View style={[styles.intervalBox, { backgroundColor: Colours.darkBlue }]}>
          <View style={[styles.headerBox, { backgroundColor: Colours.medBlue }]}>
            <Text style={[Styles.title, styles.headerText, { color: Colours.yellow }]}>
              Sleep Time
            </Text>
          </View>
          <DateTimePicker
            // testID="dateTimePicker"
            value={sleepTime}
            mode="time"
            is24Hour={true}
            display="spinner"
            // display="default"
            onChange={onChangeSleep}
            textColor={Colours.yellow}
            style={{ height: 162 }}
            minuteInterval={5}
          />
        </View>

        <TouchableOpacity
          onPress={() => reminders()}
          style={{ ...Styles.buttonShape, ...styles.submitButton }}
        >
          <Text style={{ ...Styles.body, ...styles.submitText }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeGradient>
  );
}

const styles = StyleSheet.create({
  // CONTAINERS
  box: {
    alignItems: "center",
  },
  intervalBox: {
    alignSelf: "center",
    width: 250,
    justifyContent: "center",
    borderRadius: 20,
    marginTop: "1%",
    marginBottom: "5%",
  },
  headerBox: {
    paddingVertical: "1%",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },

  // TEXT
  titleText: {
    color: Colours.darkBlue,
    paddingVertical: 10,
    textAlign: "center",
  },
  headerText: {
    fontSize: 24,
    color: Colours.medBlue,
    textAlign: "center",
    // textDecorationLine: "underline",
  },

  // BUTTONS
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
