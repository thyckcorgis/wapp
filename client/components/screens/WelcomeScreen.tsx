import React from "react";
import { View, TouchableOpacity } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";

import { Styles } from "../../styles";
import { WelcomeIcon } from "../../assets";

import { getData } from "../../storage";

import SafeGradient from "../SafeGradient";

interface WelcomeScreenProps {
  navigation: StackNavigationHelpers;
}

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
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
