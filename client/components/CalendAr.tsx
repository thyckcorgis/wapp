import React, { useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Calendar } from "react-native-calendars";

import { Colours, Styles } from "../styles";

const yellow = ["#FFFFB7", "#FFF192", "#FFEA61", "#FFDD3C", "#FFD400"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dateToYMD = (date: Date) => date.toISOString().slice(0, 10);

const increaseDate = (date: Date) => new Date(new Date(date).setDate(date.getDate() + 1));

const createDateRange = (start: Date, end: Date) => {
  const dateArr: Date[] = [];
  for (let startCp = increaseDate(start); startCp < end; startCp = increaseDate(startCp)) {
    dateArr.push(new Date(startCp));
  }
  return dateArr;
};

interface MarkedDate {
  [k: string]: {
    startingDay?: boolean;
    endingDay?: boolean;
    selected?: boolean;
    color: string;
    textColor: string;
  };
}

const createMarkedDates = (start: Date, end: Date) => {
  const startStr = dateToYMD(start);
  const endStr = dateToYMD(end);
  const selectedStr = createDateRange(start, end).map((d) => dateToYMD(d));
  const markedDates: MarkedDate = {
    [startStr]: { startingDay: true, color: yellow[0], textColor: Colours.darkBlue },
  };
  selectedStr.forEach((dateStr) => {
    markedDates[dateStr] = { selected: true, color: yellow[0], textColor: Colours.darkBlue };
  });
  markedDates[endStr] = { endingDay: true, color: yellow[0], textColor: Colours.darkBlue };

  return markedDates;
};

interface CalendArProps {
  // props: string;
  // day: Date;
  // month: Date;
}

export default function CalendAr({}: CalendArProps) {
  const [selectedDay, setSelectedDay] = useState("");
  return (
    <View style={styles.calendarBox}>
      <Calendar
        // INITIALIZE BASIC PARAMETERS
        // Replace these with some dates after to save memory
        // minDate={"2012-05-10"}
        // maxDate={"2012-05-30"}
        onDayPress={(day) => {
          setSelectedDay(months[day.month - 1] + " " + day.day + ", " + day.year);
          console.log(selectedDay);
        }}
        onMonthChange={(month) => {
          // Grab the month data or something
          // console.log("month changed", month);
        }}
        monthFormat={"MMMM yyyy"}
        // hideExtraDays={true}
        firstDay={1}
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        onPressArrowRight={(addMonth) => addMonth()}
        enableSwipeMonths={true}
        // STREAKS
        markingType={"period"}
        markedDates={createMarkedDates(new Date("2021-03-08"), new Date("2021-03-29"))}
        // STYLING
        style={{
          width: Platform.isPad == true ? "80%" : "100%",
          borderWidth: Platform.isPad == true ? 1 : 0,
          borderColor: Colours.yellow,
          borderRadius: 20,
          height: "100%",
          alignSelf: "center",
        }}
        theme={{
          calendarBackground: "transparent",
          textSectionTitleColor: Colours.yellow,
          selectedDayBackgroundColor: "#ff7171",
          selectedDayTextColor: Colours.yellow,
          todayTextColor: Colours.yellow,
          dayTextColor: Colours.yellow,
          textDisabledColor: "#d9e1e8",
          // dotColor: "#00adf5",
          // selectedDotColor: "#ffffff",
          arrowColor: Colours.yellow,
          monthTextColor: Colours.yellow,
          indicatorColor: "blue",
          textDayFontFamily: Platform.OS == "ios" ? "Avenir-Light" : "sans-serif-light",
          textMonthFontFamily: Platform.OS == "ios" ? "Avenir-Light" : "sans-serif-light",
          textDayHeaderFontFamily: Platform.OS == "ios" ? "Avenir-Light" : "sans-serif-light",
          // textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "300",
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 14,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  calendarBox: {
    marginTop: Platform.OS == "ios" ? "5%" : "10%",
    // marginHorizontal: Platform.isPad == true ? "5%" : null,
    justifyContent: "center",
    alignContent: "center",
    flex: 2,
  },
});
