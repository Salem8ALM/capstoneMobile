import { useEffect, useRef, useState } from "react"
import { Animated, Text, StyleSheet, View, Platform } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const MissingFieldPopup = ({ message, visible }) => {
  const translateY = useRef(new Animated.Value(-100)).current
  const [isVisible, setIsVisible] = useState(visible)

  useEffect(() => {
    if (visible) {
      setIsVisible(true)
      Animated.spring(translateY, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start()

      const timer = setTimeout(() => {
        Animated.timing(translateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          // Set isVisible to false after animation completes
          setIsVisible(false)
        })
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [visible, translateY])

  if (!isVisible) return null

  return (
    <Animated.View
      style={[
        styles.banner,
        {
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.content}>
        <MaterialCommunityIcons name="alert-circle" size={24} color="#FFD700" />
        <Text style={styles.message}>{message}</Text>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  banner: {
    position: "absolute",
    top: Platform.OS === 'ios' ? 50 : 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFD700",
    padding: 16,
    zIndex: 1000,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    fontSize: 16,
    color: "black",
    marginLeft: 8,
    textAlign: "center",
  },
})

export default MissingFieldPopup

