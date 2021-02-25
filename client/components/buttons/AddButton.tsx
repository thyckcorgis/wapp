import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, Animated } from "react-native";
import { Colours, Styles } from "../../styles";
import { ScreenProps } from "react-native-screens";

type AddButtonProps = {
  onAdd: () => void;
};

export default function AddButton({ onAdd }: AddButtonProps) {
  const [scaleValue] = useState(new Animated.Value(0));
  const onButtonClicked = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      duration: 700,
    }).start(() => {
      scaleValue.setValue(0);
    });
    onAdd();
    console.log("Button clicked");
  };

  const scaleValueInterpolation = scaleValue.interpolate({
    inputRange: [0, 0.25, 1],
    outputRange: [1, 20, 30],
  });

  return (
    <>
      <Animated.View
        style={[
          styles.container,
          { transform: [{ scale: scaleValueInterpolation }] },
        ]}
      />
      <TouchableOpacity style={styles.container} onPress={onButtonClicked}>
        <Text style={{ ...Styles.title, ...styles.plus }}>+</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 55,
    height: 55,
    backgroundColor: Colours.yellow,
    borderRadius: 28,
    // borderWidth: 1,
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
    color: Colours.medBlue,
    fontSize: 35,
  },
});
