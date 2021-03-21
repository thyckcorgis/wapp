import React, { useState } from "react";
import { View, Text, StyleSheet, Platform, Dimensions } from "react-native";
import {
  VictoryScatter,
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryZoomContainer,
  VictoryArea,
  VictoryAxis,
  VictoryClipContainer,
} from "victory-native";

import { Colours, Styles } from "../styles";

const yellow = ["#FFFFB7", "#FFF192", "#FFEA61", "#FFDD3C", "#FFD400"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Replace this data with stuff from the database
const data = [
  { month: 1, volume: 0 },
  { month: 2, volume: 3 },
  { month: 3, volume: 2.5 },
  { month: 4, volume: 1 },
  { month: 5, volume: 2 },
  { month: 6, volume: 3 },
  { month: 7, volume: 2.5 },
  { month: 8, volume: 1 },
];

export default function LogChart() {
  return (
    <View style={styles.graphBox}>
      <VictoryChart
        height={Dimensions.get("window").height * 0.5}
        width={
          Platform.isPad == true
            ? Dimensions.get("window").width * 0.6
            : Dimensions.get("window").width
        }
        // minDomain={{ x: 0, y: 0 }}
        maxDomain={{ x: 100, y: 5 }}
        containerComponent={
          <VictoryZoomContainer
            allowPan={true}
            allowZoom={false}
            zoomDomain={{ x: [0, 3] }}
            zoomDimension="x"
          />
        }
      >
        <VictoryLine
          interpolation={"natural"}
          // domain={{ x: [1, 12], y: [0, 5] }}
          style={{ data: { stroke: Colours.yellow } }}
          data={data}
          x="month"
          y="volume"
        />
        <VictoryScatter
          // domain={{ x: [1, 12], y: [0, 5] }}
          x="month"
          y="volume"
          data={data}
          style={{
            parent: { border: "1px solid #ccc" },
            data: { fill: Colours.yellow },
          }}
          size={5}
          labels={({ data }) => data.volume}
        />
        {/* Y AXIS */}
        <VictoryAxis
          dependentAxis
          crossAxis
          label="Volume"
          style={{
            axis: { stroke: Colours.yellow },
            axisLabel: { ...Styles.title, ...{ fontSize: 18 } },
            grid: { stroke: ({ tick }) => (tick == 1 ? Colours.errorRed : Colours.lightBlue) },
            ticks: { stroke: "grey", size: 5 },
            tickLabels: { ...Styles.body },
          }}
          maxDomain={{ x: 12 }}
        />
        {/* X AXIS */}
        <VictoryAxis
          crossAxis
          label="Month"
          style={{
            axis: { stroke: Colours.yellow },
            axisLabel: { ...Styles.title, ...{ fontSize: 18 } },
            grid: { stroke: ({ tick }) => (tick == 1 ? Colours.errorRed : Colours.lightBlue) },
            ticks: { stroke: "grey", size: 5 },
            tickLabels: { ...Styles.body },
          }}
          minDomain={{ x: 0 }}
          maxDomain={{ x: 31 }}
          tickFormat={(month) => months[month - 1]}
        />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  graphBox: {
    // marginTop: Platform.OS == "ios" ? "5%" : "10%",
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
    // COMMENT OUT LATER
    backgroundColor: Colours.medBlue,
  },
});
