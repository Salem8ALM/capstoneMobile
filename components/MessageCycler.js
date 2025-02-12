"use client"

import { useState, useEffect } from "react"
import { Animated, Text, StyleSheet } from "react-native"

const MessageCycler = ({ messages, style, interval }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fadeAnim] = useState(new Animated.Value(1))

  useEffect(() => {
    const timer = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length)
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start()
      })
    }, interval)

    return () => clearInterval(timer)
  }, [messages, interval, fadeAnim])

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={[styles.text, style]}>{messages[currentIndex]}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
  },
})

export default MessageCycler

