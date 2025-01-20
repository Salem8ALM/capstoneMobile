import { Animated } from "react-native";

// Generic reusable animation function
export const animateField = (anim, value, options = {}) => {
  Animated.spring(anim, {
    toValue: value,
    useNativeDriver: true,
    friction: options.friction || 4,
    tension: options.tension || 10,
    ...options, // Allow overriding other properties
  }).start();
};
