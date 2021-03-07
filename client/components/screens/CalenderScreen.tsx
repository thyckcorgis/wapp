import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Platform } from "react-native";
import CalendarPicker, { CustomDateStyle } from "react-native-calendar-picker";
import moment from "moment";

import { Colours, Styles } from "../../styles";

import BottomNavbar from "../BottomNavbar";
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
            // Not sure if it's better with background or text?
            // backgroundColor: getGradient(yellow, newDay.day()),
          },
          textStyle: { color: getGradient(yellow, newDay.day()) }, // white text on yellow background not good :(
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
          // TODAY
          todayTextStyle={styles.today}
          todayBackgroundColor={"transparent"}
          // SELECTED
          selectedDayStyle={{
            borderWidth: 1,
            borderColor: Colours.yellow,
          }}
          selectedDayTextColor={Colours.yellow}
          // GENERAL
          textStyle={{ ...Styles.body, ...styles.text }}
          monthTitleStyle={Styles.title}
          yearTitleStyle={Styles.title}
          dayLabelsWrapper={styles.divider}
          customDatesStyles={dateStyles}
        />
      </View>
      <View style={styles.infoBox}>
        <View style={styles.infoHeaderBox}>
          <Text style={{ ...Styles.body, ...styles.infoHeaderText }}>
            {date.toString().slice(0, 15)}
          </Text>
        </View>
        <View style={styles.infoTextBox}>
          <Text style={{ ...Styles.body, ...styles.infoText }}>
            On this day you drank x{/*water*/} litres of water!
          </Text>
          <Text style={{ ...Styles.body, ...styles.infoText }}>
            {Number(date?.toString().slice(8, 10)) > 15
              ? "You reached your goal! Way to go! " + String.fromCodePoint(0x1f929)
              : "You did not reach your goal " + String.fromCodePoint(0x1f614)}
          </Text>
        </View>
      </View>
      <BottomNavbar navigation={navigation} />
    </SafeGradient>
  );
}

const styles = StyleSheet.create({
  calendarBox: {
    marginTop: Platform.OS == "ios" ? "5%" : "10%",
    // marginHorizontal: Platform.isPad == true ? "5%" : null,
    flex: 2,
  },
  divider: {
    borderColor: Colours.yellow,
  },
  infoBox: {
    flex: 1,
    marginHorizontal: "10%",
    marginVertical: "3%",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colours.yellow,
    alignItems: "center",
  },
  infoHeaderBox: {
    backgroundColor: Colours.yellow,
    width: "100%",
    padding: "5%",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  infoTextBox: {
    flex: 1,
    marginVertical: "5%",
  },
  infoHeaderText: {
    color: Colours.medBlue,
    textAlign: "center",
    fontSize: 20,
  },
  infoText: {
    color: Colours.yellow,
  },
  text: {
    color: Colours.yellow,
    fontSize: 18,
  },
  today: {
    fontSize: 20,
    color: Colours.yellow,
    fontWeight: "bold",
  },
});
