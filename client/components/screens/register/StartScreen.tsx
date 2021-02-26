import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colours, Styles } from "../../../styles";
import { StartIcon } from "../../../assets";
import { GrowingButton } from "../../buttons";

import { getData } from "../../../storage";
import ScreenProps from "../ScreenProps";

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={Styles.background}>
        <LinearGradient
          style={Styles.background}
          colors={[Colours.lightBlue, Colours.yellow]}
        />
        <View style={Styles.bigButton}>
          <GrowingButton
            ContainerStyle={styles.container}
            onTap={() => navigation.navigate("SignIn")}
            Logo={<StartIcon />}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: Colours.medBlue,
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
