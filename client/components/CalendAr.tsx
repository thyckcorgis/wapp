import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

import { Colours, Styles } from "../styles";

export default function CalendAr() {
  return (
    <Calendar
      // Initially visible month. Default = Date()
      current={"2012-03-01"}
      // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
      minDate={"2012-05-10"}
      // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
      maxDate={"2012-05-30"}
      // Handler which gets executed on day press. Default = undefined
      onDayPress={(day) => {
        console.log("selected day", day);
      }}
      // Handler which gets executed on day long press. Default = undefined
      onDayLongPress={(day) => {
        console.log("selected day", day);
      }}
      // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
      monthFormat={"yyyy MM"}
      // Handler which gets executed when visible month changes in calendar. Default = undefined
      onMonthChange={(month) => {
        console.log("month changed", month);
      }}
      // Hide month navigation arrows. Default = false
      hideArrows={true}
      // Replace default arrows with custom ones (direction can be 'left' or 'right')
      hideExtraDays={true}
      // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
      // day from another month that is visible in calendar page. Default = false
      disableMonthChange={true}
      // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
      firstDay={1}
      // Hide day names. Default = false
      hideDayNames={true}
      // Show week numbers to the left. Default = false
      showWeekNumbers={true}
      // Handler which gets executed when press arrow icon left. It receive a callback can go back month
      onPressArrowLeft={(subtractMonth) => subtractMonth()}
      // Handler which gets executed when press arrow icon right. It receive a callback can go next month
      onPressArrowRight={(addMonth) => addMonth()}
      // Disable left arrow. Default = false
      disableArrowLeft={true}
      // Disable right arrow. Default = false
      disableArrowRight={true}
      // Enable the option to swipe between months. Default = false
      enableSwipeMonths={true}
    />
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
