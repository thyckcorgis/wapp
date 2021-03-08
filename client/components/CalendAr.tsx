import React from "react";
import { View, Text } from "react-native";

import { Colours, Styles } from "../styles";

// DEFINE VARIABLES
// Colours ranging from light yellow --> dark yellow
const yellow = ["#FFFFB7", "#FFF192", "#FFEA61", "#FFDD3C", "#FFD400"];
// Calendar initiation
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
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Define these big boi types
type CalendarState = {
  months: string
  weekDays: string
  ndays: number
  activeDate: Date
  year: Date
  month: Date
  firstDay: Date
  maxDays: Date
}

// Time for a big boi class
class CalendAr extends React.Component<{}, CalendarState> { 
  state={
    activeDate:new Date()
  }

  generateMatrix() {
    var matrix = []
    matrix[0] = this.weekDays;
  }

  //   Initiate all calendar variables
  var year = this.state.activeDate.getFullYear();
  var month = this.state.activeDate.getMonth();
  var firstDay = new Date(year, month, 1).getDay();
  var maxDays = this.nDays[month];
  if (month == 1) {
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      maxDays += 1;
    }
  }

  var i = 1;
  for(var row = 1; row < 7; row ++) {
    matrix[row] = [];
    for (var col = 0; col < 7; col++) {
      matrix[row][col] = -1;
      if (row == 1 && col >= firstDay) {
        matrix[row][col] = i++;
      } else if (row > 1 && i <= maxDays) {
        matrix[row][col] = i++;
      }
    }
  }

  render() {
    var matrix = this.generateMatrix();
    return (
      <View>
        <Text>CalendAr</Text>
      </View>
    );
  }
}

export default class App extends React.Component {
  render() {
    return <CalendAr />;
  }
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
