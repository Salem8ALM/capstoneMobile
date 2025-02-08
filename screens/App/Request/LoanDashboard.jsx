import {
  View,
  ScrollView,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Appbar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LoanRequestCard } from "../../../components/LoanRequestCard";
import { LinearGradient } from "expo-linear-gradient";
import { useRef } from "react";

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

export default function LoanDashboard({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.8,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start(() => navigation.navigate("NewLoanRequest"));
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Loan Requests" titleStyle={styles.headerTitle} />
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.7}
        >
          <Animated.View
            style={[styles.addButton, { transform: [{ scale: scaleAnim }] }]}
          >
            <LinearGradient
              colors={["#FFD700", "#FFFACD"]}
              style={styles.gradient}
            >
              <MaterialCommunityIcons name="plus" size={28} color="#000" />
            </LinearGradient>
          </Animated.View>
        </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 16,
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
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
});
