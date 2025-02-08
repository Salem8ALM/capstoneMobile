import { View, ScrollView, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LoanRequestCard } from "../../../components/LoanRequestCard";

// Sample data
const loanRequests = [
  {
    id: 1,
    title: "Business Expansion Loan",
    purpose: "Purchase new equipment",
    status: "Pending",
    amount: 50000,
    term: "36 months",
    repaymentPlan: "Monthly",
    dateUpdated: "2024-02-08",
    isNew: true,
  },
  {
    id: 2,
    title: "Working Capital Loan",
    purpose: "Inventory purchase",
    status: "Await Response",
    amount: 25000,
    term: "24 months",
    repaymentPlan: "Monthly",
    dateUpdated: "2024-02-07",
    isNew: true,
  },
  {
    id: 3,
    title: "Emergency Fund Loan",
    purpose: "Cash flow management",
    status: "Pending",
    amount: 15000,
    term: "12 months",
    repaymentPlan: "Monthly",
    dateUpdated: "2024-02-05",
    isNew: false,
  },
];

export default function LoanDashboard() {
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Loan Requests" titleStyle={styles.headerTitle} />
        <Appbar.Action
          icon={(props) => (
            <MaterialCommunityIcons name="bell" {...props} color="#FFD700" />
          )}
          onPress={() => {}}
        />
      </Appbar.Header>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        {loanRequests.map((loan) => (
          <LoanRequestCard
            key={loan.id}
            {...loan}
            onPress={() => console.log("Pressed loan:", loan.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  header: {
    backgroundColor: "#1a1a1a",
    elevation: 0,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
});
