import { useState } from "react";
import { View, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import BankList from "../../../components/BankList";
import LoanDetailsCard from "../../../components/LoanDetailsCard";
import { useNavigation } from "@react-navigation/native";

export default function LoanRequestBankSelection() {
  const [showBankList, setShowBankList] = useState(false);
  const [loanDetails, setLoanDetails] = useState(null);

  const handleLoanDetailsSubmit = (details) => {
    setLoanDetails(details);
    setShowBankList(true);
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.content}>
        <BankList loanDetails={loanDetails} />
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
