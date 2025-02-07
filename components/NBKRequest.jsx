import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import NBKReq from "../assets/svg/revisedCards/NBKReq.png";

const NBKRequest = ({ isSelected, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.cardContainer, isSelected && styles.cardSelected]}
      >
        <Image
          source={NBKReq}
          style={styles.image}
          resizeMode="contain" // Ensures image is self-contained within its container
        />
        {isSelected && <View style={styles.overlay} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    borderRadius: 23,
    borderWidth: 2,
    borderColor: "transparent",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(192, 192, 192, 0.3)", // Match app's dark theme
    width: "100%", // Adjust this width as needed to fit the design

    position: "relative", // Needed for overlay positioning
  },
  image: {
    height: "100%", // Image will fill 100% of the card height, or use contain
    width: "100%", // Image will fill 100% of the card height, or use contain
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Fills the entire TouchableOpacity
    backgroundColor: "rgba(255, 255, 255, 0.25)", // White tint with transparency

    borderRadius: 21,
  },
});

export default NBKRequest;
