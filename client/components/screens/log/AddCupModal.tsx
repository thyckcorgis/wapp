import React, { useState } from "react";
import { Text, View, Modal, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Colours, Styles } from "../../../styles";
import ScreenProps from "../ScreenProps";

export default function AddCupModal({ navigation }: ScreenProps) {
  return (
    <View style={styles.modalView}>
      <Text>Modal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colours.medBlue,
  },
});
