import { Animated } from "react-native";

// Handle press-in animation
export const handlePressIn = (anim) => {
  Animated.spring(anim, {
    toValue: 0.9,
    useNativeDriver: true,
  }).start();
};

// Handle press-out animation
export const handlePressOut = (anim) => {
  Animated.spring(anim, {
    toValue: 1,
    friction: 3,
    tension: 100,
    useNativeDriver: true,
  }).start();
};
