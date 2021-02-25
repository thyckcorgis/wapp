import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colours } from "../../styles";

type AddButtonProps = {
  onAdd: () => void;
};

export default function AddButton({ onAdd }: AddButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onAdd}>
      <Text style={styles.plus}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 55,
    height: 55,
    backgroundColor: Colours.darkBlue,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: Colours.yellow,
    position: "absolute",
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    bottom: 20,
    zIndex: 1,
    elevation: 1,
  },
  plus: {
    color: Colours.yellow,
    fontSize: 24,
    fontWeight: "bold",
  },
});
