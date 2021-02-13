import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Colours, Styles } from "../../styles";

import { getData, storeData } from "../../storage";
import { registerForPushNotificationsAsync } from "../../notifications";
import { uploadPushToken } from "../../api";
import SafeGradient from "../SafeGradient";
import ScreenProps from "./ScreenProps";

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
        <Text style={{ ...Styles.title, ...styles.titleText }}>
          Set your daily reminders:
        </Text>

        {/* WAKE TIME */}
        <View style={styles.intervalBox}>
          <View style={{ ...Styles.buttonShape, ...styles.wakeButton }}>
            <Text style={{ ...Styles.body, ...styles.wakeText }}>
              Set Wake Up Time
            </Text>
          </View>
          <DateTimePicker
            testID="dateTimePicker"
            value={wakeTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChangeWake}
            textColor={Colours.medBlue}
            style={{height:162}}
          />
        </View>

        {/* SLEEP TIME */}
        <View style={styles.intervalBox}>
          <View style={{ ...Styles.buttonShape, ...styles.sleepButton }}>
            <Text style={{ ...Styles.body, ...styles.sleepText }}>
              Set Sleep Time
            </Text>
          </View>
          <DateTimePicker
            testID="dateTimePicker"
            value={sleepTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChangeSleep}
            textColor={Colours.medBlue}
            style={{height:162}}
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
  scroll: {
    flex: 1,
  },
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
    paddingVertical: 10,
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
