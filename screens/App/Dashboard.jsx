import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import DashboardNavigator from "../../navigations/dashboardNavigator";

export function Dashboard() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.content}>
        <DashboardNavigator />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1E",
    paddingTop: 30,
  },
  content: {
    flex: 1,
    width: "100%",
  },
});
export default Dashboard;
