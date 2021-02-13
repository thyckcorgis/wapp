import React from "react";
import { View, TouchableOpacity, SafeAreaView } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { getData } from "../../storage";
import { WelcomeIcon } from "../../assets";
import { LinearGradient } from "expo-linear-gradient";

import Styles from "../../styles/styles";
import Colours from "../../styles/colours";

interface WelcomeScreenProps {
  navigation: StackNavigationHelpers;
}

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  async function nextScreen() {
    const data = await getData("user");
    navigation.navigate("Home", data);
  }
  return (
    <SafeAreaView style={Styles.screen}>
      <LinearGradient
        style={Styles.background}
        colors={[Colours.darkBlue, Colours.medBlue]}
      />
      <TouchableOpacity onPress={nextScreen}>
        <View style={Styles.bigButton}>
          <WelcomeIcon />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
