import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import NBKReq from "../assets/svg/NBKReq.svg";

const NBKRequest = ({ isSelected: isAllSelected }) => {
  const [isSelected, setIsSelected] = useState(false);

  // Update local selection state when allSelected changes
  useEffect(() => {
    setIsSelected(isAllSelected);
  }, [isAllSelected]);

  const handlePress = () => {
    setIsSelected(!isSelected);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handlePress}
        style={[styles.cardContainer, isSelected && styles.cardSelected]}
      >
        <NBKReq />
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
});

export default NBKRequest;
