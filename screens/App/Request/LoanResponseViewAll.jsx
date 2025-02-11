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

const statusPriority = {
  APPROVED: 1,
  "COUNTER OFFER": 2,
  REJECTED: 3,
  RESCINDED: 3,
};

const LoanRequestDetails = ({ route, navigation }) => {
  const { loanId } = route.params;

  const { loans, setLoans } = useContext(UserContext);

  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  let loan = loans.find((loan) => loan.id === loanId);
  const [responses, setResponses] = useState([]);

  const withdrawRequest = async () => {
    try {
      const token = await getToken("access");
      const response = await withdrawLoanRequestAPI(token, loanId);
      await getAllRequests();

      console.log("did everything");
      navigation.pop();
    } catch (error) {
      console.error("Unable to retrieve loan requests:", error);
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
      console.error("Unable to retrieve loan requests:", error);
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

    // Set up interval to fetch every 3 seconds
    const interval = setInterval(() => {
      getAllRequests();
    }, 3000);

    // Cleanup function to clear interval on unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loan = loans.find((loan) => loan.id === loanId);
    setResponses(loan ? loan.loanResponses : []);
  }, [loans, loanId]); // <- This ensures responses update when loans change

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
    const date = new Date(dateTimeString);
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
      style={styles.icon}
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
          <Text style={styles.title}>{loan.loanTitle}</Text>
          <Animatable.View
            animation="pulse"
            iterationCount="infinite"
            duration={2000}
          >
            <Badge style={styles.statusBadge}>{loan.status}</Badge>
          </Animatable.View>
        </Animated.View>

        <Card style={styles.detailsCard}>
          <Card.Content>
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                {renderIcon("cash-multiple")}
                <Text style={styles.label}>Loan Amount</Text>
                <Text
                  style={styles.value}
                >{`${loan.amount.toLocaleString()} KWD`}</Text>
              </View>
              <View style={styles.detailItem}>
                {renderIcon("calendar-clock")}
                <Text style={styles.label}>Loan Term</Text>
                <Text style={styles.value}>{loan.loanTerm}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                {renderIcon("calendar-sync")}
                <Text style={styles.label}>Repayment Plan</Text>
                <Text style={styles.value}>{loan.repaymentPlan}</Text>
              </View>
              <View style={styles.detailItem}>
                {renderIcon("clock-outline")}
                <Text style={styles.label}>Status Date</Text>
                <Text style={styles.value}>
                  {formatDateTime(loan.statusDate)}
                </Text>
              </View>
            </View>

            <View style={styles.purposeSection}>
              {renderIcon("text-box-outline")}
              <Text style={styles.label}>Purpose/Description</Text>
              <Text style={styles.description}>{loan.loanPurpose}</Text>
            </View>

            {loan.status !== "APPROVED" && (
              <Animatable.View animation="pulse" iterationCount={3}>
                <Button
                  mode="contained"
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
                        <Badge style={styles.newBadge}>{response.status}</Badge>
                      </Animatable.View>
                    )}
                  </View>

                  <View style={styles.representativeInfo}>
                    <Image
                      source={bankIcons[response.banker.bank]}
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
                      <View style={styles.dateContainer}>
                        {renderIcon("clock-outline", "#9E9E9E")}
                        <Text style={styles.responseDate}>
                          {formatDateTime(response.statusDate)}
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
                      {response.status === "COUNTER_OFFER" && "Counter Offer"}
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
                </Card.Content>
              </Card>
            </Pressable>
          </Animatable.View>
        ))}
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
            <Button
              onPress={() => withdrawRequest()}
              textColor="#F44336"
              icon="check"
            >
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
    backgroundColor: "#1E1E1E",
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
    marginBottom: 16,
  },
  responseCard: {
    backgroundColor: "#2C2C2C",
    marginBottom: 12,
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
  purposeSection: {
    marginTop: 16,
  },
  responsesTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  clickableCard: {
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.3)",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default LoanRequestDetails;
