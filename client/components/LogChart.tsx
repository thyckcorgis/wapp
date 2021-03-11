import React, { useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { VictoryScatter, VictoryChart, VictoryTheme } from "victory-native";

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
const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
];

export default function LogChart() {
  return (
    <View style={styles.graphBox}>
      <VictoryChart width={350} theme={VictoryTheme.material}>
        <VictoryScatter data={data} x="quarter" y="earnings" />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  graphBox: {
    marginTop: Platform.OS == "ios" ? "5%" : "10%",
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
  },
});
