"use client"

import React, { useEffect, useRef } from "react"
import { Animated, Dimensions, StyleSheet } from "react-native"

const { width } = Dimensions.get("window")

const AnimatedScreen = ({ children, style }) => {
  const slideAnim = useRef(new Animated.Value(width)).current
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start()

    return () => {
      // Reset animations when component unmounts
      slideAnim.setValue(width)
      fadeAnim.setValue(0)
    }
  }, [slideAnim, fadeAnim])

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateX: slideAnim,
            },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#292933",
  },
})

export default AnimatedScreen