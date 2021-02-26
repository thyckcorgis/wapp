import React, { useState } from "react";
import { View, Animated, TouchableOpacity, StyleSheet } from "react-native";
import { Colours, Styles } from "../../styles";

interface GrowingButtonProps {
  onTap: () => void;
  Logo: JSX.Element;
}

const GrowingButton: React.FC<GrowingButtonProps> = ({ onTap, Logo }) => {
  const [scaleValue] = useState(new Animated.Value(0));
  const onButtonClicked = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      duration: 700,
    }).start(() => {
      scaleValue.setValue(0);
    });
    onTap();
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
        {Logo}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: Colours.yellow,
    width: 55,
    height: 55,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    zIndex: 1,
    elevation: 1,
  },
});

export default GrowingButton;
