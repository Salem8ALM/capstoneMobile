import { useState } from "react";
import { View, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import LoanDetailsCard from "../../components/LoanDetailsCard";
import { BankList } from "../../components/BankList";
import LoanRequestNavigator from "../../navigations/LoanRequestNavigator.js";
import { Text } from "react-native-paper";

export function Requests() {
  const [showBankList, setShowBankList] = useState(false);
  const [loanDetails, setLoanDetails] = useState(null);

  const handleLoanDetailsSubmit = (details) => {
    setLoanDetails(details);
    setShowBankList(true);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.content}>
        {/* {!showBankList ? (
          <View style={styles.cardContainer}>
            <LoanDetailsCard onSubmit={handleLoanDetailsSubmit} />
          </View>
        ) : (
          <BankList loanDetails={loanDetails} />
        )} */}

        <LoanRequestNavigator />
      </SafeAreaView>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#292933",
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
});

export default Requests;
