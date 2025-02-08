import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Badge, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const LoanRequestCard = ({
  title,
  purpose,
  status,
  amount,
  term,
  repaymentPlan,
  dateUpdated,
  isNew,
  onPress,
}) => {
  const theme = useTheme();

  return (
    <Card
      style={[
        styles.card,
        isNew && { borderLeftWidth: 4, borderLeftColor: "#FFD700" },
      ]}
      onPress={onPress}
    >
      <Card.Content>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text variant="titleMedium" style={styles.title}>
              {title}
            </Text>
            {isNew && <Badge style={styles.newBadge}>NEW</Badge>}
          </View>
          <Badge
            style={[
              styles.statusBadge,
              { borderColor: isNew ? "#FFD700" : "#666" },
            ]}
          >
            {status}
          </Badge>
        </View>

        <Text variant="bodySmall" style={styles.purpose}>
          {purpose}
        </Text>

        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Text variant="bodySmall" style={styles.label}>
              Loan Amount
            </Text>
            <View style={styles.amountContainer}>
              <MaterialCommunityIcons
                name="currency-usd"
                size={16}
                color="#FFD700"
              />
              <Text variant="bodyMedium" style={styles.value}>
                {amount.toLocaleString()}
              </Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <Text variant="bodySmall" style={styles.label}>
              Loan Term
            </Text>
            <Text variant="bodyMedium" style={styles.value}>
              {term}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Text variant="bodySmall" style={styles.label}>
              Repayment Plan
            </Text>
            <Text variant="bodyMedium" style={styles.value}>
              {repaymentPlan}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Text variant="bodySmall" style={styles.label}>
              Last Updated
            </Text>
            <Text variant="bodyMedium" style={styles.value}>
              {new Date(dateUpdated).toLocaleDateString()}
            </Text>
          </View>
        </View>

        <View style={styles.viewDetails}>
          <Text style={styles.viewDetailsText}>View Details</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color="#FFD700"
          />
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2a2a2a",
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  title: {
    color: "white",
    marginRight: 8,
  },
  newBadge: {
    backgroundColor: "#FFD700",
    color: "black",
  },
  statusBadge: {
    backgroundColor: "transparent",
    borderWidth: 1,
    color: "#FFD700",
  },
  purpose: {
    color: "#999",
    marginBottom: 16,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -8,
  },
  detailItem: {
    width: "50%",
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  label: {
    color: "#999",
    marginBottom: 4,
  },
  value: {
    color: "white",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  viewDetailsText: {
    color: "#FFD700",
    marginRight: 4,
  },
});
