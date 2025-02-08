import React from "react";
import { View, StyleSheet } from "react-native";
import AnimatedIntroContent from "../../../utils/animations/AnimatedIntroContent";
import FinanceSymbol from "../../../utils/animations/FinanceSymbol";

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

  return (
    <View style={styles.container}>
      <AnimatedIntroContent />
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
    backgroundColor: "#1a1a1a",
  },
  symbols: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
});

export default LoanRequestIntro;
