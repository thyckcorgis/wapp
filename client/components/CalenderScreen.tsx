import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { LinearGradient } from "expo-linear-gradient";
import CalendarPicker from "react-native-calendar-picker";

import Styles from "../styles/styles";
import Colours from "../styles/colours";

import { HomeIcon } from "../assets";

interface CalenderScreenProps {
  navigation: StackNavigationHelpers;
}

export default class CalenderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : "";
    return (
      <SafeAreaView style={Styles.screen}>
        <LinearGradient
          style={Styles.background}
          colors={[Colours.darkBlue, Colours.medBlue]}
        />
        <View style={styles.calendarBox}>
          <CalendarPicker
            onDateChange={this.onDateChange}
            startFromMonday={true}
            todayBackgroundColor={Colours.darkBlue}
            todayTextStyle={styles.today}
            selectedDayColor={Colours.yellow}
            selectedDayTextColor={Colours.darkBlue}
            textStyle={{ ...Styles.body, ...styles.text }}
            monthTitleStyle={Styles.title}
            yearTitleStyle={Styles.title}
            dayLabelsWrapper={styles.divider}
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
        <View style={{ ...Styles.navBar }}>
          <TouchableOpacity onPress={this.props.navigation.navigate("Home")}>
            <HomeIcon />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
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
