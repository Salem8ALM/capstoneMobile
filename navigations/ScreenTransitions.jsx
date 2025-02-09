import { Easing } from "react-native"

export const screenTransitions = {
  animation: "timing",
  config: {
    duration: 300,
    easing: Easing.bezier(0.2, 0, 0, 1),
    useNativeDriver: true,
  },
  screenInterpolator: ({ layout, position, scene }) => {
    const { index } = scene
    const { initWidth } = layout

    const translateX = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [initWidth, 0, 0],
    })

    const opacity = position.interpolate({
      inputRange: [index - 1, index - 0.99, index],
      outputRange: [0, 1, 1],
    })

    return {
      opacity,
      transform: [{ translateX }],
    }
  },
}

export default screenTransitions;