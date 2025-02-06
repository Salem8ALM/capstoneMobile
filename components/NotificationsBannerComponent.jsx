// NotificationBanner.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NotificationBannerComponent = ({ message, visible }) => {
  if (!visible) return null;

  return (
    <View style={styles.banner}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#FFCC00",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
});

export default NotificationBannerComponent;
