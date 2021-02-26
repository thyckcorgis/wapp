import React, { useState } from "react";
import { Animated, TouchableWithoutFeedback } from "react-native";

interface ScalingButtonProps {
  onTap: () => void;
  Logo: JSX.Element;
}

const ScalingButton: React.FC<ScalingButtonProps> = ({ onTap, Logo }) => {
  const [scaleValue] = useState(new Animated.Value(0));
  const onButtonClicked = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      duration: 300,
    }).start(() => {
      scaleValue.setValue(0);
    });
    onTap();
  };

  const scaleValueInterpolation = scaleValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.1, 1],
  });

  return (
    <Animated.View style={{ transform: [{ scale: scaleValueInterpolation }] }}>
      <TouchableWithoutFeedback onPress={onButtonClicked}>
        {Logo}
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

export default ScalingButton;
