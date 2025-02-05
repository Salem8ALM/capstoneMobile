import React from "react";
import { View, StyleSheet } from "react-native";
import { useContext } from "react";
import UserContext from "../../../context/UserContext";
import AnimatedIntroContent from "../../../utils/animations/AnimatedIntroContent";

const LoanRequestIntro = () => {
  const { authenticated, setAuthenticated } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <AnimatedIntroContent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
});

export default LoanRequestIntro;
