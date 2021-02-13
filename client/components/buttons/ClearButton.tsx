import React from "react";
import { StyleSheet } from "react-native";
import { Colours } from "../../styles";
import RoundButton from "./RoundButton";

interface ClearButtonProps {
  label: string;
  onPress: () => void;
}
export default function ClearButton({ label, onPress }: ClearButtonProps) {
  return (
    <RoundButton
      onPress={onPress}
      label={label}
      textStyle={styles.clearText}
      viewStyle={styles.clearView}
    />
  );
}

const styles = StyleSheet.create({
  clearView: {
    borderColor: Colours.yellow,
    borderWidth: 1,
    marginVertical: 10,
  },
  clearText: {
    textAlign: "center",
    color: Colours.yellow,
  },
});
