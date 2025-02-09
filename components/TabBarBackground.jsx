"use client"

import React from "react"
import { StyleSheet, Animated } from "react-native"
import BTMNav from "../assets/svg/BTMNav.svg"

interface TabBarBackgroundProps {
  scrollY?: Animated.Value
}

const TabBarBackground: React.FC<TabBarBackgroundProps> = ({ scrollY = new Animated.Value(0) }) => {
  // Create an animated value for subtle breathing effect
  const breathingAnimation = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(breathingAnimation, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(breathingAnimation, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }, [breathingAnimation]) // Added breathingAnimation to dependencies

  // Calculate the opacity based on scroll position
  const opacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.95],
    extrapolate: "clamp",
  })

  // Calculate the scale for the breathing effect
  const scale = breathingAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.02],
  })

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <BTMNav width="100%" height="120" />
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: -15,
    left: -20,
    right: -20,
    top: -50,
    zIndex: 1000,
  },
})

export default TabBarBackground

