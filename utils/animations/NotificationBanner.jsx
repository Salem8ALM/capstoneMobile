"use client";

import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const NotificationBanner = ({ message, visible, duration = 3000 }) => {
  const slideAnim = useRef(new Animated.Value(-100)).current; // Start off-screen
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (visible) {
      // Clear any existing timeout
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }

      // Slide down animation
      Animated.timing(slideAnim, {
        toValue: -10, // Move the banner to the top of the screen
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Set timeout to slide back up
      timeoutRef.current = setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: -100, // Move the banner off-screen
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, duration);
    } else {
      // If not visible, clear timeout and slide up immediately
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    // Cleanup function
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [visible, duration, slideAnim]);

  return (
    <Animated.View
      style={[
        styles.banner,
        {
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#FFD700",
    padding: 15,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: 10, // Small space from the top
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // for Android shadow
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default NotificationBanner;
