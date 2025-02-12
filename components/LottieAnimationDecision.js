"use client";

import React, { useRef, useEffect } from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";

const LottieAnimationDecision = ({
  source,
  visible,
  onAnimationFinish,
  loop = false,
}) => {
  const animationRef = useRef(null);

  useEffect(() => {
    if (visible && animationRef.current) {
      animationRef.current.play();
    } else if (!visible && animationRef.current) {
      animationRef.current.reset();
    }
  }, [visible]);

  const handleAnimationFinish = () => {
    if (loop && animationRef.current) {
      animationRef.current.play();
    } else if (onAnimationFinish) {
      onAnimationFinish();
    }
  };

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <LottieView
        ref={animationRef}
        source={source}
        autoPlay
        loop={loop}
        style={styles.animation}
        onAnimationFinish={handleAnimationFinish}
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

export default LottieAnimationDecision;
