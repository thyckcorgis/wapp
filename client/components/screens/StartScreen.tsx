import React, { useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { LinearGradient } from "expo-linear-gradient";

import Styles from "../../styles/styles";
import Colours from "../../styles/colours";

import { StartIcon } from "../../assets";
import { getData } from "../../storage";

interface StartScreenProps {
  navigation: StackNavigationHelpers;
}

export default function StartScreen({ navigation }: StartScreenProps) {
  useEffect(() => {
    (async () => {
      const data = await getData("user");
      if (data !== null) {
        navigation.navigate("Home", data);
      }
    })();
  }, []);

  return (
    <View style={Styles.screen}>
      <LinearGradient
        colors={[Colours.lightBlue, Colours.yellow]}
        style={Styles.background}
      />
      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <View style={Styles.bigButton}>
          <StartIcon />
        </View>
      </TouchableOpacity>
    </View>
  );
}
