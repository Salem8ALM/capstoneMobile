import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated, Pressable } from "react-native";
import { Card, Text, Badge } from "react-native-paper";
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
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.animatedContainer,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Card
          style={[
            styles.card,
            isNew && { borderLeftWidth: 4, borderLeftColor: "#FFD700" },
          ]}
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
                    style={styles.animatedIcon}
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
                style={styles.animatedIcon}
              />
            </View>
          </Card.Content>
        </Card>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    overflow: "hidden",
  },
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
  animatedIcon: {
    transform: [{ rotate: "0deg" }],
  },
});
