import {
  View,
  ScrollView,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Appbar, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LoanRequestCard } from "../../../components/LoanRequestCard";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import Routes from "../../../utils/constants/routes";
import { getToken } from "../../../storage/TokenStorage";
import { getAllRequestsAPI } from "../../../api/LoanRequest";
import LottieView from "lottie-react-native";

const loanTermMap = {
  SIX_MONTHS: "6 Months",
  ONE_YEAR: "1 Year",
  TWO_YEARS: "2 Years",
  FIVE_YEARS: "5 Years",
};

const formatRepaymentPlan = (plan) => {
  return plan
    .toLowerCase() // Convert to lowercase
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
};

export default function LoanDashboard({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    console.log("Loan Requests:", loanRequests); // Log the loanRequests
  }, [loanRequests]);

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
    }).start(() => navigation.navigate(Routes.LoanRequest.LoanRequestIntro));
  };

  const [loanRequests, setLoanRequests] = useState([]);

  const getAllRequests = async () => {
    try {
      const token = await getToken("access");

      try {
        const response = await getAllRequestsAPI(token);
        if (response?.allRequests) {
          const updatedRequests = response.allRequests.map((request) => ({
            ...request,
            loanTerm: loanTermMap[request.loanTerm] || "Unknown", // Convert backend term to user-friendly text
            repaymentPlan: formatRepaymentPlan(request.repaymentPlan), // Format repayment plan
            status: request.status.replace(/_/g, " "), // Format repayment plan

            isNew: true, // Default to true as required
          }));
          setLoanRequests(updatedRequests);
        }
      } catch (error) {
        console.error("Unable to retrieve loan requests:", error);
      }
    } catch (error) {
      console.error("Unable to retrieve token:", error);
    }
  };

  useEffect(() => {
    // Fetch initially
    getAllRequests();

    // // Set up interval to fetch every 3 seconds
    // const interval = setInterval(() => {
    //   getAllRequests();
    // }, 3000);

    // // Cleanup function to clear interval on unmount
    // return () => clearInterval(interval);
  }, []);

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
        {loanRequests.length === 0 ? (
          <View style={styles.noMessagesContainer}>
            <LottieView
              source={require("../../../assets/no-message.json")}
              autoPlay
              loop
              style={styles.lottieAnimation}
            />
            <Text style={styles.noMessagesText}>No loean request made yet</Text>
          </View>
        ) : (
          loanRequests
            .slice()
            .sort((a, b) => new Date(b.statusDate) - new Date(a.statusDate))
            .map((loan) => (
              <LoanRequestCard
                key={loan.id}
                {...loan}
                onPress={() => {
                  navigation.navigate(Routes.LoanRequest.LoanResponseViewAll, {
                    loan: loan,
                  });
                  console.log("Pressed loan:", loan.id);
                  

                }}
              />
            ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
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
    paddingBottom: 100,
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
  noMessagesContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1, // Ensure it takes the available space
    marginTop: 50,
  },
  lottieAnimation: {
    width: 150, // Adjust to your preferred size
    height: 150,
  },
  noMessagesText: {
    marginTop: 20,
    fontSize: 18,
    color: "#fff", // You can adjust the color
  },
});
