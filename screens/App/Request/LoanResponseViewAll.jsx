"use client";

import React, { useState, useRef, useEffect, useContext } from "react";
import { View, StyleSheet, Animated, Pressable, Image } from "react-native";
import {
  Text,
  Card,
  Button,
  Avatar,
  Badge,
  IconButton,
  Portal,
  Dialog,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import ResponseActionModal from "../../../components/ResponseActionModal";
import UserContext from "../../../context/UserContext";
import { getToken } from "../../../storage/TokenStorage";
import {
  getAllRequestsAPI,
  withdrawLoanRequestAPI,
} from "../../../api/LoanRequest";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Dimensions } from "react-native";
import NotificationBanner from "../../../utils/animations/NotificationBanner";

const screenWidth = Dimensions.get("window").width;

function capitalizeFirstLetter(input) {
  return input
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const bankIcons = {
  BOUBYAN_BANK: require("../../../assets/bankIcons/Boubyan.png"),
  KUWAIT_INTERNATIONAL_BANK: require("../../../assets/bankIcons/KIB.png"),
  KUWAIT_FINANCE_HOUSE: require("../../../assets/bankIcons/KFH.png"),
  WARBA_BANK: require("../../../assets/bankIcons/Warba.png"),
};

const formatRepaymentPlan = (plan) => {
  return plan
    .toLowerCase() // Convert to lowercase
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
};

const loanTermMap = {
  SIX_MONTHS: "6 Months",
  ONE_YEAR: "1 Year",
  TWO_YEARS: "2 Years",
  FIVE_YEARS: "5 Years",
};

const avatarMap = {
  BOUBYAN_BANK: require("../../../assets/bankers/mohamed.png"),
  KUWAIT_INTERNATIONAL_BANK: require("../../../assets/bankers/fajri.png"),
  WARBA_BANK: require("../../../assets/bankers/salem.png"),
};

const statusPriority = {
  APPROVED: 1,
  COUNTER_OFFER: 2,
  REJECTED: 3,
  RESCINDED: 3,
};

const LoanRequestDetails = ({ route, navigation }) => {
  const { loans, setLoans } = useContext(UserContext);

  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const translateXAnim = useRef(new Animated.Value(-screenWidth * 1.5)).current;

  const { loanId } = route.params;
  let loan = loans.find((loan) => loan.id === loanId) || {};
  const [responses, setResponses] = useState([]);

  const [notificationVisible, setNotificationVisible] = useState(false); // State to manage banner visibility
  const [notificationMessage, setNotificationMessage] = useState(""); // Message to show in the banner

  const withdrawRequest = async () => {
    try {
      const token = await getToken("access");

      // response not needed
      await withdrawLoanRequestAPI(token, loanId);

      //refetch the requests (if useEffect is not in effect)
      await getAllRequests();
      navigation.pop();
    } catch (error) {
      setShowWithdrawDialog(null);
      setNotificationMessage(
        "Unable to withdraw loan request at the moment. Try later."
      );
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000); // Hide the banner after 3 seconds
    }
  };

  const getAllRequests = async () => {
    try {
      const token = await getToken("access");
      const response = await getAllRequestsAPI(token);

      if (response?.allRequests) {
        const updatedRequests = response.allRequests.map((request) => ({
          ...request,
          loanTerm: loanTermMap[request.loanTerm] || "Unknown",
          repaymentPlan: formatRepaymentPlan(request.repaymentPlan),
          status: request.status.replace(/_/g, " "),
          isNew: true,
        }));

        setLoans(updatedRequests);
      }
    } catch (error) {
      setNotificationMessage(
        "Unable to retrieve loan responses. Check internet connection"
      );
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000); // Hide the banner after 3 seconds
    }
  };

  const sortedResponses = responses.slice().sort((a, b) => {
    // Compare by status priority
    const statusComparison =
      statusPriority[a.status] - statusPriority[b.status];
    if (statusComparison !== 0) return statusComparison;

    // If statuses are the same, sort by statusDate (descending)
    return new Date(b.statusDate) - new Date(a.statusDate);
  });

  useEffect(() => {
    // Fetch initially
    getAllRequests();
  }, []);

  useEffect(() => {
    if (!showWithdrawDialog) {
      console.log("Dialog should be closed now");
    }
  }, [showWithdrawDialog]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateXAnim, {
          toValue: screenWidth * 2,
          duration: 750, // Faster pace
          useNativeDriver: true,
        }),
        Animated.delay(500), // Add a 1-second delay before restarting
        Animated.timing(translateXAnim, {
          toValue: -screenWidth, // Reset back to the start position
          duration: 0, // Instantly move back
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    if (loanId) {
      loan = loans.find((loan) => loan.id === loanId) || {};
      setResponses(loan ? loan.loanResponses : []);
    }
  }, [loanId, loans]); // Re-run when loanId or loans change

  const handleResponsePress = (response) => {
    if (
      response.status !== "REJECTED" &&
      response.status !== "RESCINDED" &&
      loan.status !== "APPROVED"
    ) {
      setSelectedResponse(response);
    }
  };

  const handleResponseAction = (action) => {
    // Handle the action (accept/counter/reject)
    console.log(`${action} offer from ${selectedResponse.banker.bank}`);
    setSelectedResponse(null);
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "Invalid date"; // Handle undefined/null cases

    const date = new Date(dateTimeString);
    if (isNaN(date.getTime())) return "Invalid date"; // Handle invalid date cases

    return date.toLocaleString(); // Formats to local date & time
  };

  const headerScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: "clamp",
  });

  const renderIcon = (name, color = "#FFD700") => (
    <MaterialCommunityIcons
      name={name}
      size={20}
      color={color}
      style={
        (styles.icon,
        { margin: name === "bank" ? 10 : name === "clock-outline" ? 10 : 0 })
      }
    />
  );

  const getDecisionColor = (decision) => {
    switch (decision) {
      case "APPROVED":
        return "#4CAF50";
      case "COUNTER_OFFER":
        return "#FFC107";
      case "REJECTED":
        return "#F44336";
      case "RESCINDED":
        return "#9E9E9E"; // Gray (Neutral/Revoked)
      default:
        return "#757575"; // Default Gray
    }
  };

  const getDecisionIcon = (decision) => {
    switch (decision) {
      case "APPROVED":
        return "check-circle";
      case "COUNTER_OFFER":
        return "refresh";
      case "REJECTED":
        return "close-circle";
      case "RESCINDED":
        return "undo"; // Revoked/Withdrawn
      default:
        return "help-circle"; // Unknown
    }
  };

  useEffect(() => {
    console.log(loan);
  }, []);

  return (
    <Animated.ScrollView
      style={styles.container}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={16}
    >
      <NotificationBanner
        message={notificationMessage}
        visible={notificationVisible}
      />

      <Animatable.View
        animation="fadeInDown"
        duration={1000}
        style={styles.header}
      >
        <Animated.View
          style={[
            styles.titleContainer,
            { transform: [{ scale: headerScale }] },
          ]}
        >
          <MaterialCommunityIcons
            name="file-document"
            size={24}
            color="#FFD700"
          />
          <Text style={styles.title}>
            {loan ? loan.loanTitle : "No title found"}
          </Text>
          <Animatable.View
            animation="pulse"
            iterationCount="infinite"
            duration={2000}
          >
            <Badge style={styles.statusBadge}>
              {loan ? loan.status : "No status found"}
            </Badge>
          </Animatable.View>
        </Animated.View>

        <Card style={styles.detailsCard}>
          <Card.Content>
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                {renderIcon("cash-multiple")}
                <Text style={styles.label}>Loan Amount</Text>
                <Text style={styles.value}>
                  {loan
                    ? `${loan.amount.toLocaleString()} KWD`
                    : "No amount found"}
                </Text>
              </View>
              <View style={styles.detailItem}>
                {renderIcon("calendar-clock")}
                <Text style={styles.label}>Loan Term</Text>
                <Text style={styles.value}>
                  {loan ? loan.loanTerm : "No loan Term found"}
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                {renderIcon("calendar-sync")}
                <Text style={styles.label}>Repayment Plan</Text>
                <Text style={styles.value}>
                  {loan ? loan.repaymentPlan : "No repayment plan found"}
                </Text>
              </View>
              <View style={styles.detailItem}>
                {renderIcon("clock-outline")}
                <Text style={styles.label}>Status Date</Text>
                <Text style={styles.value}>
                  {loan?.statusDate
                    ? formatDateTime(loan.statusDate)
                    : "No Status Date found."}
                </Text>
              </View>
            </View>

            <View style={styles.purposeSection}>
              {renderIcon("text-box-outline")}
              <Text style={styles.label}>Purpose/Description</Text>
              <Text style={styles.description}>
                {loan ? loan.loanPurpose : "no purpose"}
              </Text>
            </View>

            {loan.status !== "APPROVED" && (
              <Animatable.View animation="pulse" iterationCount={3}>
                <Button
                  mode="contained"
                  textColor="#F44336"
                  onPress={() => setShowWithdrawDialog(true)}
                  style={styles.withdrawButton}
                  icon={({ size, color }) => (
                    <MaterialCommunityIcons
                      name="close-circle"
                      size={size}
                      color={color}
                    />
                  )}
                >
                  Withdraw Request
                </Button>
              </Animatable.View>
            )}
          </Card.Content>
        </Card>
      </Animatable.View>

      <View style={styles.responsesSection}>
        {!sortedResponses || sortedResponses.length === 0 ? (
          <View style={styles.noMessagesContainer}>
            <LottieView
              source={require("../../../assets/responses_waiting.json")}
              autoPlay
              loop
              style={styles.lottieAnimation}
            />

            <Text style={styles.noMessagesText}>No Bank Offers so far</Text>
          </View>
        ) : (
          <>
            <View style={styles.responsesTitleContainer}>
              {renderIcon("bank")}
              <Text style={styles.responsesTitle}>Loan Responses</Text>
            </View>
            {sortedResponses.map((response, index) => (
              <Animatable.View
                key={response.id}
                animation="fadeInUp"
                delay={300 * index}
              >
                <Pressable onPress={() => handleResponsePress(response)}>
                  <Card
                    style={[
                      styles.responseCard,
                      !(
                        response.status === "REJECTED" ||
                        response.status === "RESCINDED"
                      ) && styles.clickableCard,
                      styles.detailsCard,
                      {
                        borderColor:
                          response.status === "APPROVED" ||
                          response.status === "COUNTER_OFFER"
                            ? "rgb(96, 96, 96)"
                            : "#333",
                        backgroundColor:
                          response.status === "APPROVED" ||
                          response.status === "COUNTER_OFFER"
                            ? "rgb(53, 53, 53)"
                            : "#2a2a2a",
                      },
                    ]}
                  >
                    <Card.Content>
                      <View style={styles.responseHeader}>
                        <View style={styles.bankInfo}>
                          <Image
                            source={bankIcons[response.banker.bank]}
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 25, // Half of width/height to make it round
                              overflow: "hidden", // Ensures it clips correctly
                            }}
                          />
                          <Text style={styles.bankName}>
                            {capitalizeFirstLetter(response.banker.bank)}
                          </Text>
                        </View>
                        {(response.status === "APPROVED" ||
                          response.status === "COUNTER_OFFER") && (
                          <Animatable.View
                            animation="pulse"
                            iterationCount="infinite"
                            duration={2000}
                          >
                            <Badge style={styles.newBadge}>
                              {response.status.replace(/_/g, " ")}
                            </Badge>
                          </Animatable.View>
                        )}
                      </View>

                      <View style={styles.representativeInfo}>
                        <Image
                          source={avatarMap[response.banker.bank]}
                          style={{
                            width: 40,
                            height: 40,
                          }}
                        />
                        <View style={styles.representativeDetails}>
                          <Text style={styles.representativeName}>
                            {capitalizeFirstLetter(
                              `${response.banker.firstName}_${response.banker.lastName}`
                            )}
                          </Text>
                          <Text style={{ color: "rgb(104, 104, 104)" }}>
                            {`+(965) ${response.banker.mobileNumber}`}
                          </Text>
                          <View style={styles.dateContainer}>
                            {renderIcon("clock-outline", "#9E9E9E")}
                            <Text style={styles.responseDate}>
                              {response?.statusDate
                                ? formatDateTime(response.statusDate)
                                : "Undefined"}
                            </Text>
                          </View>
                        </View>
                        <Animatable.View
                          animation={
                            response.status === "APPROVED" ||
                            response.status === "COUNTER_OFFER"
                              ? "bounce"
                              : undefined
                          }
                          iterationCount={
                            response.status === "APPROVED" ||
                            response.status === "COUNTER_OFFER"
                              ? "infinite"
                              : undefined
                          }
                          duration={2000}
                        >
                          <IconButton
                            icon={getDecisionIcon(response.status)}
                            iconColor={getDecisionColor(response.status)}
                            size={24}
                          />
                        </Animatable.View>
                      </View>

                      <Animatable.View
                        animation="fadeIn"
                        style={[
                          styles.decisionSection,
                          { borderColor: getDecisionColor(response.status) },
                        ]}
                      >
                        <Text
                          style={[
                            styles.decision,
                            { color: getDecisionColor(response.status) },
                          ]}
                        >
                          {response.status === "APPROVED" && "Loan Offered"}
                          {response.status === "COUNTER_OFFER" &&
                            "Counter Offer"}
                          {response.status === "REJECTED" &&
                            "Application Rejected: " + response.reason}
                          {response.status === "RESCINDED" &&
                            "Banker Rescinded Offer: New response submitted"}
                        </Text>
                        {response.status === "COUNTER_OFFER" && (
                          <Text style={styles.counterAmount}>
                            Counter Amount: {response.amount}
                          </Text>
                        )}
                      </Animatable.View>
                      {(response.status === "APPROVED" ||
                        response.status === "COUNTER_OFFER") && (
                        <Animated.View
                          style={[
                            styles.shineWrapper,
                            { transform: [{ translateX: translateXAnim }] },
                          ]}
                        >
                          <LinearGradient
                            colors={[
                              "rgba(255,255,255,0.1)",
                              "rgba(255, 255, 255, 0.5)",
                              "rgba(255,255,255,0.1)",
                            ]}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            style={styles.shine}
                          />
                        </Animated.View>
                      )}
                    </Card.Content>
                  </Card>
                </Pressable>
              </Animatable.View>
            ))}
          </>
        )}
      </View>

      <Portal>
        <Dialog
          visible={showWithdrawDialog}
          onDismiss={() => setShowWithdrawDialog(false)}
          style={styles.dialog}
        >
          <Dialog.Title style={styles.dialogTitle}>
            <MaterialCommunityIcons name="alert" size={24} color="#FFD700" />
            <Text style={styles.dialogTitleText}>Withdraw Loan Request?</Text>
          </Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogContent}>
              Are you sure you want to withdraw this loan request? This action
              cannot be undone.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => setShowWithdrawDialog(false)}
              textColor="#FFD700"
              icon="close"
            >
              Cancel
            </Button>
            <Button onPress={withdrawRequest} textColor="#F44336" icon="check">
              Withdraw
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <ResponseActionModal
        visible={!!selectedResponse}
        onDismiss={() => setSelectedResponse(null)}
        response={selectedResponse}
        onAction={handleResponseAction}
        loanId={loanId}
      />
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
    padding: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: 8,
    flex: 1,
  },
  statusBadge: {
    backgroundColor: "#FFD700",
    color: "#000000",
  },
  detailsCard: {
    backgroundColor: "#2C2C2C",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  detailItem: {
    flex: 1,
  },
  label: {
    color: "#9E9E9E",
    marginBottom: 4,
  },
  value: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  description: {
    color: "#FFFFFF",
    marginBottom: 16,
  },
  withdrawButton: {
    backgroundColor: "#2C2C2C",
    borderColor: "#F44336",
    borderWidth: 1,
    marginTop: 16,
  },
  responsesSection: {
    padding: 16,
    marginBottom: 110,
  },
  responsesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  responseCard: {
    backgroundColor: "#2C2C2C",
    marginBottom: 12,
    overflow: "hidden",
  },
  responseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  bankInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  bankName: {
    color: "#FFFFFF",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  newBadge: {
    backgroundColor: "#FFD700",
    color: "#000000",
  },
  representativeInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  representativeDetails: {
    flex: 1,
    marginLeft: 12,
  },
  representativeName: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  responseDate: {
    color: "#9E9E9E",
    fontSize: 12,
  },
  decisionSection: {
    borderLeftWidth: 4,
    paddingLeft: 12,
    marginTop: 8,
  },
  decision: {
    fontSize: 16,
    fontWeight: "500",
  },
  counterAmount: {
    color: "#FFFFFF",
    marginTop: 4,
  },
  dialog: {
    backgroundColor: "#2C2C2C",
  },
  dialogTitle: {
    flexDirection: "row",
    alignItems: "center",
    color: "#FFFFFF",
  },
  dialogTitleText: {
    color: "#FFFFFF",
    marginLeft: 8,
  },
  dialogContent: {
    color: "#FFFFFF",
  },
  icon: {
    marginBottom: 4,
  },
  purposeSection: {},
  responsesTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  clickableCard: {
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.3)",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  noMessagesContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1, // Ensure it takes the available space
  },
  lottieAnimation: {
    width: 150, // Adjust to your preferred size
    height: 120,
  },
  noMessagesText: {
    marginTop: 20,
    fontSize: 18,
    color: "#fff", // You can adjust the color
  },
});

export default LoanRequestDetails;
