import React from "react";
import { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const DiagonalLines = ({
  toValueSequence,
  duration,
  outputRange,
  lineSpacing,
  lineOffset,
}) => {
  const backgroundAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const backgroundAnimation = Animated.loop(
      Animated.sequence(
        toValueSequence.map(
          (toValue) =>
            Animated.timing(backgroundAnim, {
              toValue,
              duration,
              useNativeDriver: true,
            }),
          Animated.timing(backgroundAnim, {
            toValue: 0,
            duration: 10000,
            useNativeDriver: true,
          })
        )
      )
    );

    backgroundAnimation.start();

    return () => backgroundAnimation.stop();
  }, [toValueSequence, duration, backgroundAnim]);

  const rotate = backgroundAnim.interpolate({
    inputRange: [0, 1.5],
    outputRange,
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          opacity: 0.07,
          zIndex: 1,
          transform: [{ rotate }],
          pointerEvents: "none",
        },
      ]}
    >
      {Array.from({ length: 200 }).map((_, i) => (
        <View
          key={i}
          style={[styles.diagonalLine, { left: i * lineSpacing + lineOffset }]}
        />
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  diagonalLine: {
    position: "absolute",
    width: 2,
    height: height * 9, // Ensures lines cover the entire height of the screen
    backgroundColor: "#FFD700", // Golden color for the lines
  },
});
export default DiagonalLines;
