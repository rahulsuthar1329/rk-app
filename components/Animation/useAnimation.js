import React from "react";
import { Animated, Easing } from "react-native";

const useAnimation = (animatedValue) => {
  const startAnimation = (toValue, setIsTop) => {
    Animated.timing(animatedValue, {
      toValue,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setIsTop((prev) => !prev);
    });
  };

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-15, 5],
    extrapolate: "clamp",
  });

  return { startAnimation, translateY };
};

export default useAnimation;
