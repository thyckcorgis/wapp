import React, { useEffect, useState } from "react";
import { Platform, PlatformIOSStatic, StyleSheet, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { Colours } from "../styles";

class EDate extends Date {
  isGreaterThan(date: Date) {
    return this.getTime() >= date.getTime();
  }

  // end  >  current date > start
  inRangeOf(start: Date, end: Date) {
    return new EDate(end).isGreaterThan(this) && this.isGreaterThan(start);
  }
}

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

/**
 * Converts a Date object to Year-Month-Day string.
 * Ex. Mon May 03 2021 22:18:20 GMT-0600 => 2021-05-03
 * @param date
 * @returns
 */
const dateToYMD = (date: Date) => date.toISOString().slice(0, 10);

/**
 * Converts a DateObject object to Month Day, Year string.
 * @param day
 * @returns
 */
const momentToMDY = (day: DateData) => months[day.month - 1] + " " + day.day + ", " + day.year;

const dateToMDY = (date: Date) =>
  months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();

const momentToDate = (day: DateData) => new Date(day.year, day.month - 1, day.day);

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
    selectedColor?: string;
    color?: string;
    textColor?: string;
  };
}

const createMarkedDates = (start: Date, end: Date, selected: Date) => {
  const startStr = dateToYMD(start);
  const endStr = dateToYMD(end);
  const selectedStr = createDateRange(start, end).map((d) => dateToYMD(d));
  const markedDates: MarkedDate = {
    [startStr]: {
      startingDay: true,
      endingDay: false,
      color: yellow[0],
      textColor: Colours.darkBlue,
    },
  };
  selectedStr.forEach((dateStr) => {
    markedDates[dateStr] = { selected: true, color: yellow[0], textColor: Colours.darkBlue };
  });
  markedDates[endStr] = {
    endingDay: true,
    startingDay: false,
    color: yellow[0],
    textColor: Colours.darkBlue,
  };

  const isInRange = new EDate(selected).inRangeOf(start, end);
  markedDates[dateToYMD(selected)] = {
    startingDay: !isInRange,
    endingDay: !isInRange,
    ...markedDates[dateToYMD(selected)],
    selected: true,
    textColor: Colours.yellow,
    color: "#ff7171",
  };

  return markedDates;
};

interface CalendArProps {
  setSelectedDay: React.Dispatch<React.SetStateAction<string>>;
}

export default function CalendAr({ setSelectedDay }: CalendArProps) {
  useEffect(() => {
    const today = dateToMDY(new Date());
    setSelectedDay(today);
  }, []);

  function dayPressHandler(day: DateData) {
    const thisDay = momentToMDY(day);
    setSelectedDay(thisDay);
    setSelectedDate(momentToDate(day));
  }

  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View style={styles.calendarBox}>
      <Calendar
        // INITIALIZE BASIC PARAMETERS
        // Replace these with some dates after to save memory
        // minDate={"2012-05-10"}
        // maxDate={"2012-05-30"}
        onDayPress={(day) => dayPressHandler(day)}
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
        // Change these values for streaks:
        markedDates={createMarkedDates(
          new Date("2021-04-28"),
          new Date("2021-05-01"),
          selectedDate
        )}
        // STYLING
        style={{
          width: (Platform as PlatformIOSStatic).isPad ? "80%" : "100%",
          borderWidth: (Platform as PlatformIOSStatic).isPad ? 1 : 0,
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
