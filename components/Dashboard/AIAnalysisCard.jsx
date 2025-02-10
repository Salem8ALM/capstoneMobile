import React from "react";
import { View, Text, TouchableOpacity, Animated, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { handlePressIn, handlePressOut } from "../../utils/animations/buttonAnimations";

export const AIAnalysisCard = ({ scaleAnim, translateXButton1 }) => {
  const onPress = () => {};

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.3}
        onPress={onPress}
        onPressIn={() => handlePressIn(scaleAnim)}
        onPressOut={() => handlePressOut(scaleAnim)}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.title}>AI Financial Analysis</Text>
          <MaterialCommunityIcons name="chart-bar" size={28} color="white" style={styles.aiIcon} />
        </View>
        <Text style={styles.description}>
          Make smarter decisions with cutting-edge AI-driven reports.
        </Text>

        <Animated.View
          style={[styles.shineWrapper, { transform: [{ translateX: translateXButton1 }] }]}
        >
          <LinearGradient
            colors={["rgba(255,255,255,0.1)", "rgba(255, 255, 255, 0.4)", "rgba(255,255,255,0.1)"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.shine}
          />
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2E2E2E",
    padding: 20,
    borderRadius: 15,
    overflow: "hidden",
    position: "relative",
    marginVertical: 10,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  description: {
    fontSize: 14,
    color: "#AAA",
    marginTop: 5,
  },
  aiIcon: {
    marginLeft: 10,
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
    opacity: 0.4,
    borderRadius: 8,
  },
}); 