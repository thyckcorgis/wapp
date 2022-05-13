import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Styles } from "../../styles";

interface ButtonProps {
  label: string;
  onPress: () => void;
  textStyle: object;
  viewStyle: object;
}
export default function RoundButton({ label, onPress, textStyle, viewStyle }: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={{ ...Styles.buttonShape, ...viewStyle }}>
      <Text style={{ ...Styles.body, ...textStyle }}>{label}</Text>
    </TouchableOpacity>
  );
}
