import React, { useState } from "react";
import { Platform, PlatformIOSStatic, ScrollView, StyleSheet, Text, View } from "react-native";
import { Colours, Styles } from "../../styles";
import BottomNavbar from "../BottomNavbar";
import CalendAr from "../CalendAr";
import SafeGradient from "../SafeGradient";
import ScreenProps from "./ScreenProps";

export default function CalendarScreen({ navigation }: ScreenProps) {
  const [selectedDay, setSelectedDay] = useState("");

  return (
    <SafeGradient>
      <ScrollView>
        <View style={styles.calendarBox}>
          <CalendAr setSelectedDay={setSelectedDay} />
        </View>
        <View style={styles.infoBox}>
          <View style={styles.infoHeaderBox}>
            <Text style={{ ...Styles.body, ...styles.infoHeaderText }}>{selectedDay}</Text>
          </View>
          <View style={styles.infoTextBox}>
            <Text style={{ ...Styles.body, ...styles.infoText }}>
              On this day you drank x{/*water*/} litres of water!
            </Text>
            <Text style={{ ...Styles.body, ...styles.infoText }}>
              {Number(1234567890?.toString().slice(8, 10)) > 15
                ? "You reached your goal! Way to go! " + String.fromCodePoint(0x1f929)
                : "You did not reach your goal " + String.fromCodePoint(0x1f614)}
            </Text>
          </View>
        </View>
        {/* <LogChart /> */}
      </ScrollView>
      <BottomNavbar navigation={navigation} />
    </SafeGradient>
  );
}

const styles = StyleSheet.create({
  // CONTAINERS
  calendarBox: {
    flex: 2,
    // borderWidth: 1,
  },
  infoBox: {
    flex: 1,
    alignSelf: "center",
    marginVertical: "5%",
    width: (Platform as PlatformIOSStatic).isPad ? "60%" : "80%",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colours.yellow,
  },
  infoHeaderBox: {
    backgroundColor: Colours.yellow,
    width: "100%",
    padding: "5%",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    flex: 1,
  },
  infoTextBox: {
    flex: 2,
    marginVertical: "5%",
  },
  // TEXT
  infoHeaderText: {
    color: Colours.medBlue,
    textAlign: "center",
    fontSize: 20,
  },
  infoText: {
    color: Colours.yellow,
  },
});
