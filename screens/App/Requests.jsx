import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import LoanDetailsCard from "../../components/LoanDetailsCard";
import BoubyanRequest from "../../components/BoubyanRequest";
import { BankList } from "../../components/BankList";

export function Requests() {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <LoanDetailsCard />
        <BankList />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#292933",
    alignItems: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 24,
  },
});

export default Requests;
