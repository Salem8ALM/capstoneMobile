import React from "react";
import { Animated, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { handlePressIn, handlePressOut } from "../../utils/animations/buttonAnimations";

export const LoanButton = ({ buttonAnim, translateXButton2, handleSubmit, submitText }) => {
  return (
    <Animated.View style={[styles.buttonContainer, { transform: [{ scale: buttonAnim }] }]}>
      <Button
        icon={({ color }) => (
          <MaterialCommunityIcons name="currency-usd" size={26} color={color} />
        )}
        mode="contained"
        onPressIn={() => handlePressIn(buttonAnim)}
        onPressOut={() => handlePressOut(buttonAnim)}
        style={styles.submit}
        labelStyle={styles.buttonText}
        onPress={handleSubmit}
      >
        {submitText}
      </Button>
      <Animated.View
        style={[styles.shineWrapper, { transform: [{ translateX: translateXButton2 }] }]}
      >
        <LinearGradient
          colors={[
            "rgba(255,255,255,0.1)",
            "rgba(255, 255, 255, 1)",
            "rgba(255,255,255,0.1)",
          ]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles.shine, { opacity: 1 }]}
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    marginBottom: 15,
    position: "relative",
    overflow: "hidden",
    borderRadius: 8,
  },
  submit: {
    backgroundColor: "#FFD700",
    overflow: "hidden",
    padding: 5,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  shineWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
  },
  shine: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
}); 