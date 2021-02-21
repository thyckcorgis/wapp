import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";

import { Colours, Styles } from "../../styles";

import Navbar from "../Navbar";
import SafeGradient from "../SafeGradient";

import ScreenProps from "./ScreenProps";

export default function CalendarScreen({ navigation }: ScreenProps) {
  const [date, setDate] = useState<moment.Moment | null>(null);

  const startDate = date?.toString() || "";

  const yellow = [
    '#FFFFB7',
    '#FFF192',
    '#FFEA61',
    '#FFDD3C',
    '#FFD400'
  ]
  let today = date;
  // idk what this code is lmao its from the calenderpicker documentation
  let day = today?.clone().startOf('month');
  let customDatesStyles = [];
  while(day?.add(1, 'day').isSame(today, 'month')) {
    customDatesStyles.push({
      date: day.clone(),
      style: {backgroundColor: yellow[Math.floor(Number(day.toString().slice(8,10))/6)]},
      //style: {backgroundColor: yellow[Math.floor(Math.random()*5)]},
      textStyle: {color: 'black'}, // white text on yellow background not good :(
    });
  }
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
          customDatesStyles={customDatesStyles}
        />
        <View style={styles.infoBox}>
          <Text style={{ ...Styles.body, ...styles.infoHeader }}>
            SELECTED DATE:
          </Text>
          <Text style={{ ...Styles.body, ...styles.infoText }}>
            {startDate}
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
