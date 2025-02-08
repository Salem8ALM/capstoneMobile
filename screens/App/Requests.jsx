import { useState } from "react";
import { View, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import LoanDetailsCard from "../../components/LoanDetailsCard";
import { BankList } from "../../components/BankList";
import LoanRequestNavigator from "../../navigations/LoanRequestNavigator.js";
import { Text } from "react-native-paper";
import FinanceSymbol from "../../utils/animations/FinanceSymbol.js";
import { useNavigation } from "@react-navigation/native";
import Routes from "../../utils/constants/routes.js";
import LoanRequestBankSelection from "./Request/LoanRequestBankSelection.jsx";

export function Requests() {
  const [showBankList, setShowBankList] = useState(false);
  const [loanDetails, setLoanDetails] = useState(null);

  const navigation = useNavigation();

  const handleLoanDetailsSubmit = (details) => {
    setLoanDetails(details);
    setShowBankList(true);
  };

  const symbols = [
    { icon: "cash", size: 30, color: "rgba(255, 215, 0, 0.02)" },
    { icon: "chart-line", size: 40, color: "rgba(255, 223, 0, 0.05)" },
    { icon: "bank", size: 35, color: "rgba(255, 230, 0, 0.02)" },
    { icon: "credit-card", size: 30, color: "rgba(255, 165, 0, 0.07)" },
    { icon: "currency-usd", size: 35, color: "rgba(255, 99, 0, 0.05)" },
    { icon: "calculator", size: 25, color: "rgba(255, 204, 0, 0.02)" },
    { icon: "chart-areaspline", size: 40, color: "rgba(255, 255, 0, 0.07)" },
    { icon: "cash", size: 30, color: "rgba(255, 215, 0, 0.02)" },
    { icon: "chart-line", size: 40, color: "rgba(255, 223, 0, 0.05)" },
    { icon: "bank", size: 35, color: "rgba(255, 230, 0, 0.02)" },
    { icon: "credit-card", size: 30, color: "rgba(255, 165, 0, 0.07)" },
    { icon: "currency-usd", size: 35, color: "rgba(255, 99, 0, 0.05)" },
    { icon: "calculator", size: 25, color: "rgba(255, 204, 0, 0.02)" },
    { icon: "chart-areaspline", size: 40, color: "rgba(255, 255, 0, 0.07)" },
    { icon: "cash", size: 30, color: "rgba(255, 215, 0, 0.02)" },
    { icon: "chart-line", size: 40, color: "rgba(255, 223, 0, 0.05)" },
    { icon: "bank", size: 35, color: "rgba(255, 230, 0, 0.02)" },
    { icon: "credit-card", size: 30, color: "rgba(255, 165, 0, 0.07)" },
    { icon: "currency-usd", size: 35, color: "rgba(255, 99, 0, 0.05)" },
    { icon: "calculator", size: 25, color: "rgba(255, 204, 0, 0.02)" },
    { icon: "chart-areaspline", size: 40, color: "rgba(255, 255, 0, 0.07)" },
    { icon: "cash", size: 30, color: "rgba(255, 215, 0, 0.02)" },
    { icon: "chart-line", size: 40, color: "rgba(255, 223, 0, 0.05)" },
    { icon: "bank", size: 35, color: "rgba(255, 230, 0, 0.02)" },
    { icon: "credit-card", size: 30, color: "rgba(255, 165, 0, 0.07)" },
    { icon: "currency-usd", size: 35, color: "rgba(255, 99, 0, 0.05)" },
    { icon: "calculator", size: 25, color: "rgba(255, 204, 0, 0.02)" },
    { icon: "chart-areaspline", size: 40, color: "rgba(255, 255, 0, 0.07)" },
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.content}>
        <LoanRequestNavigator />
      </SafeAreaView>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  content: {
    flex: 1,
    width: "100%",
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: height * 0.05, // 5% of screen height padding
  },

  symbols: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    zIndex: -1,
  },
});

export default Requests;
