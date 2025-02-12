"use client"

import { useEffect, useRef } from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming, Easing } from "react-native-reanimated"

const { width, height } = Dimensions.get("window")

const Particle = ({ size, initialPosition }) => {
  const translateX = useSharedValue(initialPosition.x)
  const translateY = useSharedValue(initialPosition.y)

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(Math.random() * width, {
        duration: 5000 + Math.random() * 5000,
        easing: Easing.linear,
      }),
      -1,
      true,
    )
    translateY.value = withRepeat(
      withTiming(Math.random() * height, {
        duration: 5000 + Math.random() * 5000,
        easing: Easing.linear,
      }),
      -1,
      true,
    )
  }, [translateX, translateY]) // Added translateX and translateY to dependencies

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    }
  })

  return (
    <Animated.View style={[styles.particle, { width: size, height: size, borderRadius: size / 2 }, animatedStyle]} />
  )
}

const ParticleBackground = () => {
  const particles = useRef(
    Array.from({ length: 20 }, () => ({
      size: 2 + Math.random() * 3,
      initialPosition: {
        x: Math.random() * width,
        y: Math.random() * height,
      },
    })),
  ).current

  return (
    <View style={StyleSheet.absoluteFill}>
      {particles.map((particle, index) => (
        <Particle key={index} size={particle.size} initialPosition={particle.initialPosition} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  particle: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
})

export default ParticleBackground

