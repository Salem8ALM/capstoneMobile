"use client";

import { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
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

const LoanRequestDetails = () => {
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
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

  return (
    <ScrollView style={styles.container}>
      <Animatable.View
        animation="fadeInDown"
        duration={1000}
        style={styles.header}
      >
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons
            name="file-document"
            size={24}
            color="#FFD700"
          />
          <Text style={styles.title}>Business Expansion Loan</Text>
          <Badge style={styles.statusBadge}>Await Response</Badge>
        </View>

        <Card style={styles.detailsCard}>
          <Card.Content>
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.label}>Loan Amount</Text>
                <Text style={styles.value}>50,000 KWD</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.label}>Loan Term</Text>
                <Text style={styles.value}>36 months</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.label}>Repayment Plan</Text>
                <Text style={styles.value}>Monthly</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.label}>Status Date</Text>
                <Text style={styles.value}>2025-02-09</Text>
              </View>
            </View>

            <Text style={styles.label}>Purpose/Description</Text>
            <Text style={styles.description}>
              Purchase new equipment for business expansion and modernization of
              current operations
            </Text>

            <Button
              mode="contained"
              onPress={() => setShowWithdrawDialog(true)}
              style={styles.withdrawButton}
              icon="close"
            >
              Withdraw Request
            </Button>
          </Card.Content>
        </Card>
      </Animatable.View>

      <View style={styles.responsesSection}>
        <Text style={styles.responsesTitle}>Loan Responses</Text>

        {responses.map((response, index) => (
          <Animatable.View
            key={response.id}
            animation="fadeInUp"
            delay={300 * index}
          >
            <Card style={styles.responseCard}>
              <Card.Content>
                <View style={styles.responseHeader}>
                  <View style={styles.bankInfo}>
                    <Avatar.Image size={30} source={{ uri: response.logo }} />
                    <Text style={styles.bankName}>{response.bankName}</Text>
                  </View>
                  {response.isNew && <Badge style={styles.newBadge}>NEW</Badge>}
                </View>

                <View style={styles.representativeInfo}>
                  <Avatar.Image size={40} source={{ uri: response.avatar }} />
                  <View style={styles.representativeDetails}>
                    <Text style={styles.representativeName}>
                      {response.representativeName}
                    </Text>
                    <Text style={styles.responseDate}>{response.date}</Text>
                  </View>
                  <IconButton
                    icon={getDecisionIcon(response.decision)}
                    iconColor={getDecisionColor(response.decision)}
                    size={24}
                  />
                </View>

                <View
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
                    {response.decision === "rejected" && "Application Rejected"}
                  </Text>
                  {response.decision === "counter" && (
                    <Text style={styles.counterAmount}>
                      Counter Amount: {response.counterAmount}
                    </Text>
                  )}
                </View>
              </Card.Content>
            </Card>
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
            Withdraw Loan Request?
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
            >
              Cancel
            </Button>
            <Button
              onPress={() => setShowWithdrawDialog(false)}
              textColor="#F44336"
            >
              Withdraw
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
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
    color: "#FFFFFF",
  },
  dialogContent: {
    color: "#FFFFFF",
  },
});

export default LoanRequestDetails;
