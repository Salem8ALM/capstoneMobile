"use client";

import React, { useRef, useEffect } from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";

const LottieAnimation = ({
  source,
  visible,
  onAnimationFinish,
  loop = true, // Make sure loop is true by default
}) => {
  const animationRef = useRef(null);

  useEffect(() => {
    if (visible && animationRef.current) {
      animationRef.current.play(); // Play animation when visible
    } else if (!visible && animationRef.current) {
      animationRef.current.stop(); // Stop animation when not visible
    }
  }, [visible]);

  const handleAnimationFinish = () => {
    if (loop && animationRef.current) {
      animationRef.current.play(); // Loop animation if it's set to loop
    } else if (onAnimationFinish) {
      onAnimationFinish(); // Call the onFinish callback
    }
  };

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <LottieView
        ref={animationRef}
        source={source}
        autoPlay
        loop={loop} // Ensure loop is correctly passed
        style={styles.animation}
        onAnimationFinish={handleAnimationFinish} // Use the finish handler to loop or do something after the animation ends
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  animation: {
    width: 200,
    height: 200,
  },
});

export default LottieAnimation;
