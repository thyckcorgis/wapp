import React from "react";
import { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Switch } from "react-native-switch";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { LinearGradient } from "expo-linear-gradient";
import RNDateTimePicker from "@react-native-community/datetimepicker";

import Styles from "../styles/styles";
import Colours from "../styles/colours";

interface ReminderScreenProps {
  navigation: StackNavigationHelpers;
}

export default function ReminderScreen({ navigation }: ReminderScreenProps) {
  const [wakeTime, setWakeTime] = useState(false);
  const toggleWake = () => setWakeTime(!wakeTime);

  const [sleepTime, setSleepTime] = useState(false);
  const toggleSleep = () => setSleepTime(!sleepTime);

  const [time, setTime] = useState(new Time(1234567890));

  //   const setWake = (event, selectedTime) => {
  //     const currentTime = selectedTime || time;
  //     setWakeTime(currentTime);
  //   };

  return (
    <View style={Styles.screen}>
      <LinearGradient
        style={Styles.background}
        colors={[Colours.lightBlue, Colours.yellow]}
      />
      <Text style={{ ...Styles.title, ...styles.titleText }}>
        Set your daily reminders:
      </Text>
      <View style={styles.intervalBox}>
        <Text style={{ ...Styles.body, ...styles.headerText }}>Wake Up:</Text>
        <View style={styles.timeBox}>
          <TextInput
            style={styles.timeInput}
            placeholder={"8:00"}
            placeholderTextColor={Colours.medBlue}
          />
          <Switch
            onValueChange={toggleWake}
            activeText={"AM"}
            activeTextStyle={styles.amText}
            inActiveText={"PM"}
            inactiveTextStyle={styles.pmText}
            backgroundActive={Colours.yellow}
            backgroundInactive={Colours.medBlue}
            circleBorderWidth={0}
            circleSize={40}
            value={wakeTime}
          />
          <View>
            <RNDateTimePicker
              testID="dateTimePicker"
              value={time}
              mode="time"
              is24Hour={false}
              //   onChange={setWake}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
        <Text style={{ padding: 50 }}>This is the reminder screen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  timeBox: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  intervalBox: {
    alignSelf: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    color: Colours.medBlue,
  },
  titleText: {
    color: Colours.darkBlue,
    paddingVertical: 20,
  },
  amText: {
    color: Colours.medBlue,
  },
  pmText: {
    color: Colours.yellow,
  },
  timeInput: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colours.medBlue,
    width: 100,
    height: 40,
    marginHorizontal: 20,
    textAlign: "center",
  },
});
