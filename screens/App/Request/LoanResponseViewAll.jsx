import React from "react";
import { View, ScrollView, StyleSheet, Image, Text } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Button,
  Avatar,
  useTheme,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from "react-native-animatable";

const LoanRequestDetails = ({ navigation }) => {
  const loanDetails = {
    title: "Business Expansion Loan",
    purpose: "Purchase new equipment",
    term: "36 months",
    amount: "50,000 KWD",
    repaymentPlan: "Monthly",
    status: "Awaiting Response",
    statusDate: "2/8/2024",
  };

  const responses = [
    {
      id: 1,
      avatar: require("../../../assets/avatar2.png"),
      bankName: "Bank of Kuwait",
      representative: "John Doe",
      avatar: require("../../../assets/avatar2.png"),
      decision: "Approved",
      date: "2/9/2024",
      isNew: true,
    },
    {
      id: 2,
      avatar: require("../../../assets/avatar2.png"),
      bankName: "Gulf Bank",
      representative: "Jane Smith",
      avatar: require("../../../assets/avatar2.png"),
      decision: "Counter Offer",
      date: "2/8/2024",
      isNew: false,
    },
    // Add more responses as needed
  ];

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.loanCard}>
        <Card.Content>
          <Title style={styles.title}>{loanDetails.title}</Title>
          <Paragraph style={styles.detail}>
            Purpose: {loanDetails.purpose}
          </Paragraph>
          <Paragraph style={styles.detail}>
            Loan Term: {loanDetails.term}
          </Paragraph>
          <Paragraph style={styles.detail}>
            Loan Amount: {loanDetails.amount}
          </Paragraph>
          <Paragraph style={styles.detail}>
            Repayment Plan: {loanDetails.repaymentPlan}
          </Paragraph>
          <Paragraph style={styles.detail}>
            Status: {loanDetails.status}
          </Paragraph>
          <Paragraph style={styles.detail}>
            Status Date: {loanDetails.statusDate}
          </Paragraph>
          <Button
            mode="contained"
            onPress={() => {}}
            style={styles.withdrawButton}
            labelStyle={styles.buttonLabel}
          >
            Withdraw Loan Request
          </Button>
        </Card.Content>
      </Card>

      <Title style={styles.responseTitle}>Bank Responses</Title>
      {responses.map((response) => (
        <Animatable.View animation="fadeInUp" duration={1000} key={response.id}>
          <Card style={styles.responseCard}>
            <Card.Content style={styles.responseContent}>
              <Image source={response.bankLogo} style={styles.bankLogo} />
              <View style={styles.bankInfo}>
                <Text style={styles.bankName}>{response.bankName}</Text>
                <Text style={styles.representative}>
                  {response.representative}
                </Text>
              </View>
              <Avatar.Image source={response.avatar} size={40} />
              <View style={styles.decisionContainer}>
                <Text style={styles.decision}>{response.decision}</Text>
                <Text style={styles.responseDate}>{response.date}</Text>
              </View>
              {response.isNew && (
                <Icon
                  name="star"
                  size={20}
                  color="#FFD700"
                  style={styles.newIcon}
                />
              )}
            </Card.Content>
          </Card>
        </Animatable.View>
      ))}
    </ScrollView>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.background,
    },
    loanCard: {
      marginBottom: 16,
      backgroundColor: colors.surface,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
    },
    detail: {
      fontSize: 16,
      marginVertical: 4,
      color: colors.text,
    },
    withdrawButton: {
      marginTop: 16,
      backgroundColor: colors.error,
    },
    buttonLabel: {
      color: colors.onError,
    },
    responseTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 16,
      color: colors.text,
    },
    responseCard: {
      marginBottom: 16,
      backgroundColor: colors.surface,
    },
    responseContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    bankLogo: {
      width: 50,
      height: 50,
    },
    bankInfo: {
      flex: 1,
      marginLeft: 16,
    },
    bankName: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
    },
    representative: {
      fontSize: 14,
      color: colors.secondary,
    },
    decisionContainer: {
      alignItems: "flex-end",
    },
    decision: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
    },
    responseDate: {
      fontSize: 14,
      color: colors.secondary,
    },
    newIcon: {
      marginLeft: 8,
    },
  });

export default LoanRequestDetails;
