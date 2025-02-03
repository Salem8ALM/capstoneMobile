import React from "react";
import { View, StyleSheet } from "react-native";
import BTMNav from "../assets/svg/BTMNav.svg";
const TabBarBackground = () => {
  return (
    <View style={styles.container}>
      <BTMNav width="100%" height="120" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: -15,
    left: -20,
    right: -20,
    top: -50,
    zIndex: 1000,
  },
});

export default TabBarBackground;
