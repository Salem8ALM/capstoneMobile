"use client";

import React, { useRef, useEffect } from "react";
import { StyleSheet, Animated } from "react-native";
import LottieView from "lottie-react-native";

const LottieAnimation = ({ animations, currentIndex, style }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const animationRef = useRef(null);
  const [currentAnimation, setCurrentAnimation] = React.useState(
    animations[currentIndex]
  );

  useEffect(() => {
    // Fade out current animation
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // Change animation after fade out
    setTimeout(() => {
      setCurrentAnimation(animations[currentIndex]);
    }, 500);
  }, [currentIndex, animations, fadeAnim]); // Added fadeAnim to dependencies

  return (
    <Animated.View style={[styles.container, style, { opacity: fadeAnim }]}>
      <LottieView
        ref={animationRef}
        source={currentAnimation}
        autoPlay
        loop
        style={styles.animation}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: "100%",
    height: "100%",
  },
});

export default LottieAnimation;
