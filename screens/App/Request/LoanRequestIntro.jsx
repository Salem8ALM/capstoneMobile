import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AnimatedIntroContent from "../../../utils/animations/AnimatedIntroContent";
import FinanceSymbol from "../../../utils/animations/FinanceSymbol";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native-paper";
import Routes from "../../../utils/constants/routes";
import { useTabBar } from "../../../navigations/TabBarProvider";
import LottieView from "lottie-react-native";

const LoanRequestIntro = () => {
  const symbols = [
    { icon: "cash", size: 30, color: "rgba(255, 215, 0, 0.2)" },
    { icon: "cash", size: 40, color: "rgba(255, 215, 0, 0.2)" },
    { icon: "cash", size: 60, color: "rgba(255, 215, 0, 0.05)" },
    { icon: "cash", size: 30, color: "rgba(255, 215, 0, 0.2)" },
    { icon: "cash", size: 20, color: "rgba(255, 215, 0, 0.2)" },
    { icon: "cash", size: 60, color: "rgba(255, 215, 0, 0.05)" },
    { icon: "cash", size: 30, color: "rgba(255, 215, 0, 0.2)" },
    { icon: "cash", size: 40, color: "rgba(255, 215, 0, 0.2)" },
    { icon: "cash", size: 30, color: "rgba(255, 215, 0, 0.2)" },
    { icon: "cash", size: 30, color: "rgba(255, 215, 0, 0.2)" },
    { icon: "cash", size: 60, color: "rgba(255, 215, 0, 0.05)" },
    { icon: "cash", size: 20, color: "rgba(255, 215, 0, 0.2)" },
    { icon: "cash", size: 30, color: "rgba(255, 215, 0, 0.2)" },
    { icon: "cash", size: 40, color: "rgba(255, 215, 0, 0.2)" },
    { icon: "cash", size: 30, color: "rgba(255, 215, 0, 0.2)" },
    { icon: "cash", size: 30, color: "rgba(255, 215, 0, 0.2)" },
    { icon: "cash", size: 20, color: "rgba(255, 215, 0, 0.2)" },
    { icon: "cash", size: 60, color: "rgba(255, 215, 0, 0.05)" },
    { icon: "cash", size: 40, color: "rgba(255, 215, 0, 0.2)" },
    { icon: "cash", size: 30, color: "rgba(255, 215, 0, 0.2)" },
    { icon: "cash", size: 20, color: "rgba(255, 215, 0, 0.05)" },
    { icon: "cash", size: 20, color: "rgba(255, 215, 0, 0.05)" },
    { icon: "cash", size: 40, color: "rgba(255, 215, 0, 0.2)" },
    { icon: "cash", size: 40, color: "rgba(255, 215, 0, 0.2)" },
    { icon: "cash", size: 20, color: "rgba(255, 215, 0, 0.05)" },
    { icon: "cash", size: 30, color: "rgba(255, 215, 0, 0.2)" },
    { icon: "cash", size: 60, color: "rgba(255, 215, 0, 0.05)" },
    { icon: "cash", size: 20, color: "rgba(255, 215, 0, 0.05)" },
    { icon: "cash", size: 30, color: "rgba(255, 215, 0, 0.2)" },
    { icon: "cash", size: 40, color: "rgba(255, 215, 0, 0.2)" },
    { icon: "cash", size: 30, color: "rgba(255, 215, 0, 0.2)" },
    { icon: "cash", size: 30, color: "rgba(255, 215, 0, 0.2)" },
    { icon: "cash", size: 20, color: "rgba(255, 215, 0, 0.2)" },
    { icon: "cash", size: 60, color: "rgba(255, 215, 0, 0.05)" },
    { icon: "cash", size: 40, color: "rgba(255, 215, 0, 0.05)" },
    { icon: "cash", size: 30, color: "rgba(255, 215, 0, 0.2)" },
    { icon: "cash", size: 30, color: "rgba(255, 215, 0, 0.2)" },
    { icon: "cash", size: 30, color: "rgba(255, 215, 0, 0.05)" },
    { icon: "cash", size: 40, color: "rgba(255, 215, 0, 0.2)" },
  ];

  const navigation = useNavigation();

  const { setShowTabBar } = useTabBar();

  useEffect(() => {
    // Delay the tab bar hiding to give the animation a chance to play
    const hideTabBarTimeout = setTimeout(() => {
      setShowTabBar(false);
    }, 100); // Adjust delay as necessary to allow animation time

    // Reset the tab bar visibility when leaving the screen
    return () => {
      clearTimeout(hideTabBarTimeout); // Clear the timeout to prevent unnecessary calls
      setShowTabBar(true);
    };
  }, []); // Empty dependency array ensures this runs only once when the screen is mounted

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.replace(Routes.LoanRequest.LoanDashboard)}
      >

        {/* <Ionicons name="arrow-back" size={24} color="white" /> */}
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* Animated Intro */}
      <AnimatedIntroContent />

      {/* Symbols */}
      {symbols.map((symbol, index) => (
        <FinanceSymbol style={styles.symbols} key={index} {...symbol} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1C1C1E",
  },
  lottieAnimation: {
    width: 200, // Adjust to your preferred size
    height: 200,
    alignSelf: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  backText: {
    color: "white",
    fontSize: 16,
    marginLeft: 5,
  },
  symbols: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
});

export default LoanRequestIntro;
