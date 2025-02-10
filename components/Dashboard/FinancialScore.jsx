import React from "react";
import { View, Text, Animated, StyleSheet } from "react-native";

export const FinancialScore = ({ scoreWidth }) => {
  return (
    <View>
      <Text style={styles.scoreText}>Financial Score:</Text>
      <View style={styles.scoreBar}>
        <Animated.View
          style={[
            styles.scoreProgress,
            {
              width: scoreWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreText: {
    color: "#fff",
    fontSize: 16,
  },
  scoreBar: {
    height: 8,
    backgroundColor: "#444",
    borderRadius: 4,
    overflow: "hidden",
    marginTop: 10,
    marginBottom: 10,
  },
  scoreProgress: {
    height: "100%",
    backgroundColor: "#FFD700",
  },
}); 