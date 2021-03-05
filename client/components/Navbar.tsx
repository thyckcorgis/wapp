import React from "react";
import { View } from "react-native";
import { Styles } from "../styles";

interface NavbarProps {
  left?: JSX.Element | null;
  middle?: JSX.Element | null;
  right?: JSX.Element | null;
}

export default function Navbar({ left = null, middle = null, right = null }: NavbarProps) {
  return (
    <View style={Styles.navBar}>
      {left}
      {middle}
      {right}
    </View>
  );
}
