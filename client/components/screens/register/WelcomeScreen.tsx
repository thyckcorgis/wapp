import React from "react";
import { View, TouchableOpacity } from "react-native";

import { Styles } from "../../../styles";
import { WelcomeIcon } from "../../../assets";

import { getData } from "../../../storage";

import SafeGradient from "../../SafeGradient";
import ScreenProps from "../ScreenProps";

export default function WelcomeScreen({ navigation }: ScreenProps) {
  async function nextScreen() {
    const data = await getData("user");
    navigation.navigate("Home", data);
  }
  return (
    <SafeGradient>
      <TouchableOpacity onPress={nextScreen}>
        <View style={Styles.bigButton}>
          <WelcomeIcon />
        </View>
      </TouchableOpacity>
    </SafeGradient>
  );
}
