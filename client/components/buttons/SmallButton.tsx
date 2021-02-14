import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { Styles, Colours } from "../../styles";

interface SmallButtonProps {
  label: string;
  onPress: () => void;
}

const SmallButton = ({ label, onPress }: SmallButtonProps) => (
  <TouchableOpacity style={styles.smallButton} onPress={onPress}>
    <Text style={{ ...Styles.body, ...styles.buttonText }}>{label}</Text>
  </TouchableOpacity>
);

export default SmallButton;

const styles = StyleSheet.create({
  smallButton: {
    borderRadius: 20,
    backgroundColor: Colours.lightBlue,
    margin: 10,
    padding: 10,
    paddingHorizontal: 20,
    elevation: 2,
    alignSelf: "center",
    width: "50%",
  },
  buttonText: {
    color: Colours.darkBlue,
    textAlign: "center",
  },
});
