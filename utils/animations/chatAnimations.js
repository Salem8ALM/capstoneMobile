import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions, Easing } from "react-native";

const { width, height } = Dimensions.get("window");

const ChatAnimations = ({
  toValueSequence = [0.5, 0], // Default to a basic sequence
  duration = 2000000, // Default animation duration
  outputRange = ["45deg", "10000deg"], // Default rotation range
  lineSpacing = 12, // Spacing between lines
  lineOffset = 0, // Offset for the lines
  verticalOffset = 0, // New parameter to shift animation up/down
}) => {
  const backgroundAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const backgroundAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(backgroundAnim, {
          toValue: 1,
          duration: duration, // Using the passed 'duration' prop
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(backgroundAnim, {
          toValue: 0,
          duration: duration, // Using the passed 'duration' prop
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ])
    );

    backgroundAnimation.start();

    return () => backgroundAnimation.stop();
  }, [duration]);

  const rotate = backgroundAnim.interpolate({
    inputRange: [0, 1],
    outputRange: outputRange, // Using the passed 'outputRange' prop
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          opacity: 0.03, //0.04
          zIndex: 1,
          transform: [{ rotate }, { translateY: verticalOffset }], // Applying the vertical offset
          pointerEvents: "none", // Make sure child elements don't block interaction
        },
      ]}
    >
      {Array.from({ length: Math.ceil(width / lineSpacing) }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.diagonalLine,
            {
              left: i * lineSpacing + lineOffset, // Applying the line offset
              height: height * 2, // Keeping the height constant for the lines
              width: width * 0.9, // Adjusting the width of the lines
              transform: [{ rotate: `${i * 12}deg` }], // Adjust rotation for each line
              pointerEvents: "none", // Make sure child elements don't block interaction
            },
          ]}
        />
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  diagonalLine: {
    position: "absolute",

    backgroundColor: "rgb(157, 157, 157)", // rgb(157, 157, 157)
  },
});

export default React.memo(ChatAnimations); // 🔥 Memoized to avoid re-renders
