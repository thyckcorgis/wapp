import React, { useEffect } from "react";
import { View, TouchableOpacity } from "react-native";

import { Colours, Styles } from "../../styles";
import { StartIcon } from "../../assets";

import { getData } from "../../storage";
import SafeGradient from "../SafeGradient";
import ScreenProps from "./ScreenProps";

export default function StartScreen({ navigation }: ScreenProps) {
  useEffect(() => {
    (async () => {
      try {
        const data = await getData("user");
        if (data !== null) {
          navigation.navigate("Home", data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <SafeGradient colors={[Colours.lightBlue, Colours.yellow]}>
      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <View style={Styles.bigButton}>
          <StartIcon />
        </View>
      </TouchableOpacity>
    </SafeGradient>
  );
}
