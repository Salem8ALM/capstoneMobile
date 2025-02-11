"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Animated,
  Pressable,
} from "react-native";
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

const LoanRequestDetails = ({ route }) => {
  const { loan } = route.params;

  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const [responses] = useState([
    {
      id: 1,
      bankName: "Global Finance Bank",
      representativeName: "Sarah Johnson",
      decision: "approved",
      amount: "50,000 KWD",
      date: "2025-02-09",
      isNew: true,
      avatar: "/placeholder.svg?height=40&width=40",
      logo: "/placeholder.svg?height=30&width=30",
    },
    {
      id: 2,
      bankName: "Investment Capital",
      representativeName: "Michael Chen",
      decision: "counter",
      counterAmount: "45,000 KWD",
      date: "2025-02-08",
      isNew: true,
      avatar: "/placeholder.svg?height=40&width=40",
      logo: "/placeholder.svg?height=30&width=30",
    },
    {
      id: 3,
      bankName: "National Bank",
      representativeName: "David Smith",
      decision: "rejected",
      date: "2025-02-07",
      isNew: false,
      avatar: "/placeholder.svg?height=40&width=40",
      logo: "/placeholder.svg?height=30&width=30",
    },
  ]);

  const handleResponsePress = (response) => {
    if (response.decision !== "rejected") {
      setSelectedResponse(response);
    }
  };

  const handleResponseAction = (action) => {
    // Handle the action (accept/counter/reject)
    console.log(`${action} offer from ${selectedResponse.bankName}`);
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
      case "approved":
        return "#4CAF50";
      case "counter":
        return "#FFC107";
      case "rejected":
        return "#F44336";
      default:
        return "#757575";
    }
  };

  const getDecisionIcon = (decision) => {
    switch (decision) {
      case "approved":
        return "check-circle";
      case "counter":
        return "refresh";
      case "rejected":
        return "close-circle";
      default:
        return "help-circle";
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
            <Badge style={styles.statusBadge}>Await Response</Badge>
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
          </Card.Content>
        </Card>
      </Animatable.View>

      <View style={styles.responsesSection}>
        <View style={styles.responsesTitleContainer}>
          {renderIcon("bank")}
          <Text style={styles.responsesTitle}>Loan Responses</Text>
        </View>

        {responses.map((response, index) => (
          <Animatable.View
            key={response.id}
            animation="fadeInUp"
            delay={300 * index}
          >
            <Pressable onPress={() => handleResponsePress(response)}>
              <Card
                style={[
                  styles.responseCard,
                  response.decision !== "rejected" && styles.clickableCard,
                ]}
              >
                <Card.Content>
                  <View style={styles.responseHeader}>
                    <View style={styles.bankInfo}>
                      <Avatar.Image size={30} source={{ uri: response.logo }} />
                      <Text style={styles.bankName}>{response.bankName}</Text>
                    </View>
                    {response.isNew && (
                      <Animatable.View
                        animation="pulse"
                        iterationCount="infinite"
                        duration={2000}
                      >
                        <Badge style={styles.newBadge}>NEW</Badge>
                      </Animatable.View>
                    )}
                  </View>

                  <View style={styles.representativeInfo}>
                    <Avatar.Image size={40} source={{ uri: response.avatar }} />
                    <View style={styles.representativeDetails}>
                      <Text style={styles.representativeName}>
                        {response.representativeName}
                      </Text>
                      <View style={styles.dateContainer}>
                        {renderIcon("clock-outline", "#9E9E9E")}
                        <Text style={styles.responseDate}>{response.date}</Text>
                      </View>
                    </View>
                    <Animatable.View
                      animation={response.isNew ? "bounce" : undefined}
                      iterationCount={response.isNew ? "infinite" : undefined}
                      duration={2000}
                    >
                      <IconButton
                        icon={getDecisionIcon(response.decision)}
                        iconColor={getDecisionColor(response.decision)}
                        size={24}
                      />
                    </Animatable.View>
                  </View>

                  <Animatable.View
                    animation="fadeIn"
                    style={[
                      styles.decisionSection,
                      { borderColor: getDecisionColor(response.decision) },
                    ]}
                  >
                    <Text
                      style={[
                        styles.decision,
                        { color: getDecisionColor(response.decision) },
                      ]}
                    >
                      {response.decision === "approved" && "Loan Approved"}
                      {response.decision === "counter" && "Counter Offer"}
                      {response.decision === "rejected" &&
                        "Application Rejected"}
                    </Text>
                    {response.decision === "counter" && (
                      <Text style={styles.counterAmount}>
                        Counter Amount: {response.counterAmount}
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
              onPress={() => setShowWithdrawDialog(false)}
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
    marginBottom: 16,
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
