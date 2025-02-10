import React from "react"
import { ViewStyle } from "react-native"

export type AnimationPreset = "slide" | "fade" | "scale" | "flip"

export interface AnimatedScreenProps {
  children: React.ReactNode
  style?: ViewStyle
  preset?: AnimationPreset
  duration?: number
  direction?: "left" | "right" | "up" | "down"
  gesturesEnabled?: boolean
}

