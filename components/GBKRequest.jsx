import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import GBKReq from "../assets/svg/GBKReq.svg";

const GBKRequest = ({ isSelected, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.cardContainer, isSelected && styles.cardSelected]}
      >
        <GBKReq />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  cardContainer: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "transparent",
    alignSelf: "center",
    alignItems: "center",
  },
  cardSelected: {
    borderColor: "#FFD700",
    shadowColor: "#FFD700",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default GBKRequest;
