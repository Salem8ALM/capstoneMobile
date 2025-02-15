import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions, Easing } from "react-native";

const { width, height } = Dimensions.get("window");

const ChatAnimations = () => {
  const backgroundAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const backgroundAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(backgroundAnim, {
          toValue: 1,
          duration: 2000000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(backgroundAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ])
    );

    backgroundAnimation.start();

    return () => backgroundAnimation.stop();
  }, []);

  const rotate = backgroundAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "3000deg"],
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
      {Array.from({ length: Math.ceil(width / 12) }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.diagonalLine,
            {
              left: i * 12,
              height: height * 50, // Match the height of the lines like before
              width: width * 90, // Adjust width to match previous style
              transform: [{ rotate: `${i * 12}deg` }], // Adjust rotation for the diagonal lines
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
    backgroundColor: "rgb(183, 183, 183)", // Golden color for the lines
  },
});

export default React.memo(ChatAnimations); // 🔥 Memoized to avoid re-renders
