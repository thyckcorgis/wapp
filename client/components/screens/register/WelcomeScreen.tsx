import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, SafeAreaView, Keyboard } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colours, Styles } from "../../../styles";
import { WelcomeIcon } from "../../../assets";
import { GrowingButton } from "../../buttons";

import ScreenProps from "../ScreenProps";

export default function WelcomeScreen({ navigation }: ScreenProps) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={Styles.background}>
        <LinearGradient style={Styles.background} colors={[Colours.darkBlue, Colours.medBlue]} />
        <View style={Styles.bigButton}>
          <GrowingButton
            ContainerStyle={styles.container}
            onTap={() => navigation.navigate("Home")}
            Logo={<WelcomeIcon />}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: Colours.yellow,
    width: 250,
    height: 250,
    borderRadius: 400,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    zIndex: 1,
    elevation: 1,
  },
});
