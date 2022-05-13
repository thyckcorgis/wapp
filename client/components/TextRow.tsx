import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colours, Styles } from "../styles";

interface TextRowProps {
  title: string;
  text: string;
}

export default function TextRow({ title, text }: TextRowProps) {
  return (
    <View style={styles.name}>
      <Text style={{ ...Styles.body, ...styles.headerText }}>{title + " "}</Text>
      <Text style={{ ...Styles.body, ...styles.friendText }}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    color: Colours.darkBlue,
  },
  friendText: {
    textAlignVertical: "center",
    fontSize: 18,
    color: Colours.medBlue,
  },
});
