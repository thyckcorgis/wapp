import { LinearGradient } from "expo-linear-gradient";
import React, { ReactChild } from "react";
import { Keyboard, SafeAreaView, TouchableWithoutFeedback } from "react-native";
import { Colours, Styles } from "../styles";

interface SafeGradientProps {
  children: ReactChild | ReactChild[];
  colors?: string[];
}

export default function SafeGradient({ children, colors }: SafeGradientProps) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={Styles.screen}>
        <LinearGradient
          style={Styles.background}
          colors={colors || [Colours.darkBlue, Colours.medBlue]}
        />
        {children}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
