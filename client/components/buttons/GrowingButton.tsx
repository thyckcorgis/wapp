import React, { useState } from "react";
import { Animated, TouchableOpacity } from "react-native";

interface GrowingButtonProps {
  onTap: () => void;
  Logo: JSX.Element;
  ContainerStyle: object;
}

const GrowingButton: React.FC<GrowingButtonProps> = ({ onTap, Logo, ContainerStyle }) => {
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
        style={[{ ...ContainerStyle }, { transform: [{ scale: scaleValueInterpolation }] }]}
      />
      <TouchableOpacity style={{ ...ContainerStyle }} onPress={onButtonClicked}>
        {Logo}
      </TouchableOpacity>
    </>
  );
};

export default GrowingButton;
