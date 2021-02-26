import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import CalendarPicker, { CustomDateStyle } from "react-native-calendar-picker";
import moment from "moment";

import { Colours, Styles } from "../../styles";

import Navbar from "../Navbar";
import SafeGradient from "../SafeGradient";

import ScreenProps from "./ScreenProps";

const yellow = ["#FFFFB7", "#FFF192", "#FFEA61", "#FFDD3C", "#FFD400"];

function getGradient<T>(arr: T[], day: number) {
  return arr[Math.floor(day / 6)];
}

const today = moment();

export default function CalendarScreen({ navigation }: ScreenProps) {
  const [date, setDate] = useState<moment.Moment>(moment());
  const [dateStyles, setDateStyles] = useState<CustomDateStyle[]>([]);

  useEffect(() => {
    let day = today.clone().startOf("month");
    let endOf = today.clone().endOf("month");
    let sameMonth = true;
    console.log({ day, endOf, sameMonth });
    while (sameMonth) {
      let newDay = day.clone();
      setDateStyles((dateStyles) => [
        ...dateStyles,
        {
          date: newDay,
          style: {
            backgroundColor: getGradient(yellow, newDay.day()),
          },
          textStyle: { color: "black" }, // white text on yellow background not good :(
        },
      ]);
      sameMonth = day.add(1, "day").isSameOrBefore(endOf, "day");
      console.log({ day, endOf, sameMonth });
    }
  }, []);

  return (
    <SafeGradient>
      <View style={styles.calendarBox}>
        <CalendarPicker
          onDateChange={(date) => setDate(date)}
          startFromMonday={true}
          todayBackgroundColor={Colours.darkBlue}
          todayTextStyle={styles.today}
          selectedDayColor={Colours.yellow}
          selectedDayTextColor={Colours.darkBlue}
          textStyle={{ ...Styles.body, ...styles.text }}
          monthTitleStyle={Styles.title}
          yearTitleStyle={Styles.title}
          dayLabelsWrapper={styles.divider}
          customDatesStyles={dateStyles}
        />
        <View style={styles.infoBox}>
          <Text style={{ ...Styles.body, ...styles.infoHeader }}>
            {date.toString().slice(0, 15)}
          </Text>
          <Text style={{ ...Styles.body, ...styles.infoText }}>
            On this day you drank x{/*water*/} litres of water!
          </Text>
          <Text style={{ ...Styles.body, ...styles.infoText }}>
            {Number(date?.toString().slice(8, 10)) > 15
              ? "You reached your goal! Way to go! " +
                String.fromCodePoint(0x1f929)
              : "You did not reach your goal " + String.fromCodePoint(0x1f614)}
          </Text>
        </View>
      </View>
      <Navbar navigation={navigation} />
    </SafeGradient>
  );
}

const styles = StyleSheet.create({
  calendarBox: {
    flex: 1,
    justifyContent: "center",
  },
  divider: {
    borderColor: Colours.yellow,
    // backgroundColor: Colours.medBlue,
  },
  infoBox: {
    margin: "10%",
    paddingVertical: "5%",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colours.yellow,
    height: 200,
    // justifyContent: "center",
    alignItems: "center",
  },
  infoHeader: {
    color: Colours.yellow,
    fontSize: 20,
  },
  infoText: {
    color: Colours.yellow,
  },
  text: {
    color: Colours.yellow,
  },
  today: {
    color: Colours.yellow,
  },
});
