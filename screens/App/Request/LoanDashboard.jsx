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
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Routes from "../../../utils/constants/routes";
import { getToken } from "../../../storage/TokenStorage";
import { getAllRequestsAPI } from "../../../api/LoanRequest";
import LottieView from "lottie-react-native";
import UserContext from "../../../context/UserContext";
import { useNotifications } from "../../../context/NotificationsContext";
import NotificationBanner from "../../../utils/animations/NotificationBanner";
import { useFocusEffect } from "@react-navigation/native";

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
  const [previousLoans, setPreviousLoans] = useState({});

  const [notificationVisible, setNotificationVisible] = useState(false); // State to manage banner visibility
  const [notificationMessage, setNotificationMessage] = useState(""); // Message to show in the banner
  const { loans, setLoans } = useContext(UserContext);
  const { addNotification } = useNotifications();

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

  const getAllRequests = async () => {
    try {
      const token = await getToken("access");
      const response = await getAllRequestsAPI(token);

      if (response && response.allRequests) {
        const updatedRequests = response.allRequests.map((request) => ({
          ...request,
          loanTerm: loanTermMap[request.loanTerm] || "Unknown",
          repaymentPlan: formatRepaymentPlan(request.repaymentPlan),
          status: request.status.replace(/_/g, " "),
        }));

        // Check for new responses
        updatedRequests.forEach((loan) => {
          const previousLoan = previousLoans[loan.id];
          if (
            previousLoan &&
            loan.status !== previousLoan.status &&
            loan.status.includes("NEW_RESPONSE")
          ) {
            addNotification({
              type: "loan_response",
              title: "New Loan Response",
              message: `You have received a new response for loan: ${loan.loanTitle}`,
              loanId: loan.id,
              responseId: `${loan.id}-${loan.statusDate}`, // Create unique response ID
              timestamp: new Date(loan.statusDate),
            });
          }
        });

        // Update previous loans state
        const newPreviousLoans = {};
        updatedRequests.forEach((loan) => {
          newPreviousLoans[loan.id] = loan;
        });
        setPreviousLoans(newPreviousLoans);

        setLoans(updatedRequests);
      } else {
        // Handle cases where the response doesn't have the expected structure
        setNotificationMessage("Invalid response format");
        setNotificationVisible(true);
        setTimeout(() => {
          setNotificationVisible(false);
        }, 3000); // Hide the banner after 3 seconds
      }
    } catch (error) {
      setNotificationMessage("unable to fetch loans at the moment");
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000); // Hide the banner after 3 seconds
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Initial fetch
      getAllRequests();

      // Set up polling interval
      const interval = setInterval(() => {
        getAllRequests();
      }, 3000);

      return () => {
        clearInterval(interval);
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <NotificationBanner
        message={notificationMessage}
        visible={notificationVisible}
      />

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
        {!loans || loans.length === 0 ? (
          <View style={styles.noMessagesContainer}>
            <LottieView
              source={require("../../../assets/loanRequestWait.json")}
              autoPlay
              loop
              style={styles.lottieAnimation}
            />
            <Text style={styles.noMessagesText}>No loan request made yet</Text>
          </View>
        ) : (
          loans
            .slice()
            .sort((a, b) => new Date(b.statusDate) - new Date(a.statusDate))
            .map((loan) => (
              <LoanRequestCard
                key={loan.id}
                {...loan}
                onPress={() => {
                  navigation.navigate(Routes.LoanRequest.LoanResponseViewAll, {
                    loanId: loan.id,
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
    paddingTop: 10,
    flex: 1,
    backgroundColor: "#1C1C1E",
  },

  shineWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
  },

  shine: {
    borderRadius: 8, // If you want rounded corners for the gradient
    position: "absolute", // Make sure the gradient itself doesn't overflow

    width: "100%",
    height: "100%",
    opacity: 0.4,
    borderRadius: 8, // If you want rounded corners for the gradient
  },

  header: {
    backgroundColor: "#1C1C1E",
    elevation: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2C2C2E",
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    borderRadius: 30,
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
    marginTop: 100,
  },
  lottieAnimation: {
    Top: 100,
    width: 250, // Adjust to your preferred size
    height: 250,
  },
  noMessagesText: {
    marginTop: 20,
    fontSize: 18,
    color: "#fff", // You can adjust the color
  },
});
