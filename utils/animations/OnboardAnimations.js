import React from "react";
import { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const OnboardAnimations = ({
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

              useNativeDriver: false,
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
    inputRange: [0, 1],
    outputRange,
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          opacity: 0.03,
          zIndex: 1,
          transform: [{ rotate }],
          pointerEvents: "none",
          left: -width / 2, // Centering the lines
          top: -height / 2, // Centering the lines
        },
      ]}
    >
      {Array.from({ length: 70 }).map((_, i) => (
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
    width: width * 2.5, // Extend width to cover rotated corners
    height: height * 2.5, // Extend height to ensure full coverage
    backgroundColor: "rgb(138, 141, 211)", // Golden color for the lines
  },
});
export default OnboardAnimations;
