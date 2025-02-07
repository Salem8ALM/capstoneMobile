import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

const GBKRequest = ({ isSelected, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.cardContainer, isSelected && styles.cardSelected]}
      ></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "transparent",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(41, 41, 51, 0.7)", // Match app's dark theme
    width: "100%", // Adjust this width as needed to fit the design
    // height: "100%", // Adjust this width as needed to fit the design

    paddingHorizontal: 0, // Remove any side padding
  },
  cardSelected: {
    borderColor: "#FFD700", // Yellow border when selected
    shadowColor: "#FFD700",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    height: "100%", // Image will fill 100% of the card height, or use contain
  },
});

export default GBKRequest;
