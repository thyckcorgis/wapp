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
      textStyle={styles.solidText}
      viewStyle={styles.solidView}
    />
  );
}

const styles = StyleSheet.create({
  solidView: {
    backgroundColor: Colours.yellow,
    marginVertical: 10,
  },
  solidText: {
    textAlign: "center",
    color: Colours.darkBlue,
  },
});
