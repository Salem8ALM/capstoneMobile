import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions, Easing } from "react-native";

const { width, height } = Dimensions.get("window");

const DiagonalLines = ({
  toValueSequence = [0, 1], // Default to a basic sequence
  duration = 2000, // Default animation duration
  outputRange = ["0deg", "30deg"], // Default rotation range
  lineSpacing = 12, // Spacing between lines
  lineOffset = 0, // Offset for the lines
}) => {
  const backgroundAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const backgroundAnimation = Animated.loop(
      Animated.sequence(
        toValueSequence.map((toValue) =>
          Animated.timing(backgroundAnim, {
            toValue,
            duration,
            useNativeDriver: true,
            easing: Easing.linear, // Apply linear easing for consistent speed
          })
        )
      )
    );

    backgroundAnimation.start();

    return () => backgroundAnimation.stop();
  }, [toValueSequence, duration, backgroundAnim]);

  const rotate = backgroundAnim.interpolate({
    inputRange: [0, 1],
    outputRange,
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          opacity: 0.04,
          zIndex: 1,
          transform: [{ rotate }],
          pointerEvents: "none",
        },
      ]}
    >
      {Array.from({ length: Math.ceil(width / lineSpacing) }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.diagonalLine,
            {
              left: i * lineSpacing + lineOffset,
              height: height * 50, // Adjust line height to ensure full coverage vertically
              width: width * 90, // Adjust line width for full coverage horizontally
              transform: [{ rotate: `${i * 2}deg` }], // Adjust rotation for diagonal lines
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
    backgroundColor: "rgb(138, 141, 211)", // Golden color for the lines
  },
});

export default DiagonalLines;
