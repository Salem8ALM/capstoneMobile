import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Animated,
  ScrollView,
} from "react-native";
import { Text, Button, Card, Divider } from "react-native-paper";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

export default function LoanRequestReview() {
  const reviewAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(reviewAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.header, { opacity: reviewAnim }]}>
        <Ionicons name="document-text-outline" size={40} color="#FFD700" />
        <Text style={styles.title}>Review Loan Request</Text>
      </Animated.View>

      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            {[
              {
                icon: "tag",
                label: "Loan Nickname",
                value: "Personal Growth Loan",
              },
              {
                icon: "file-document",
                label: "Loan Description",
                value: "For tuition and personal development expenses.",
              },
              {
                icon: "cash",
                label: "Loan Amount",
                value: "$10,000",
              },
              {
                icon: "calendar",
                label: "Loan Term",
                value: "5 Years",
              },
              {
                icon: "credit-card",
                label: "Repayment Plan",
                value: "Monthly Installments",
              },
              {
                icon: "bank",
                label: "Selected Banks",
                value: "Bank of America, Chase, CitiBank",
              },
            ].map((item, index) => (
              <View key={index}>
                <View style={styles.row}>
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={24}
                    color="#FFD700"
                    style={styles.icon}
                  />
                  <View>
                    <Text style={styles.label}>{item.label}</Text>
                    <Text style={styles.value}>{item.value}</Text>
                  </View>
                </View>
                {index < 5 && <Divider style={styles.divider} />}
              </View>
            ))}
          </Card.Content>
        </Card>

        <Button mode="contained" style={styles.submitButton}>
          Submit Request
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 20,

    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
  content: {
    alignItems: "center",
    paddingBottom: 40,
  },
  card: {
    width: "100%",
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    paddingVertical: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    color: "#fff",
  },
  divider: {
    marginBottom: 10,
    backgroundColor: "#444",
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: "#FFD700",
    width: "100%",
  },
});
