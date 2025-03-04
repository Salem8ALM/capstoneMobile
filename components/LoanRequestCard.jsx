import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated, Pressable } from "react-native";
import { Card, Text, Badge } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const screenWidth = Dimensions.get("window").width;

const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return "Invalid date"; // Handle undefined/null cases

  const date = new Date(dateTimeString);
  if (isNaN(date.getTime())) return "Invalid date"; // Handle invalid date cases

  return date.toLocaleString(); // Formats to local date & time
};

export const LoanRequestCard = ({
  loanTitle = "No title provided",
  loanPurpose = "No purpose specified",
  status = "Unknown",
  amount = 0,
  loanTerm = "N/A",
  repaymentPlan = "N/A",
  statusDate = "N/A",
  isNew = false,
  onPress = () => {},
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const translateXAnim = useRef(new Animated.Value(-screenWidth * 1.5)).current;

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
    <View>
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
              {
                borderColor:
                  status === "NEW RESPONSE" ? "rgb(96, 96, 96)" : "#333",
                backgroundColor:
                  status === "NEW RESPONSE" ? "rgb(53, 53, 53)" : "#2a2a2a",
              },
              false && { borderLeftWidth: 4, borderLeftColor: "#FFD700" },
            ]}
          >
            <Card.Content>
              <View style={styles.header}>
                <View style={styles.titleContainer}>
                  <MaterialCommunityIcons
                    name="file-document"
                    size={20}
                    color="#FFD700"
                  />

                  <Text variant="titleMedium" style={styles.title}>
                    {loanTitle ? loanTitle : "no title provided"}
                  </Text>
                </View>
                <Badge
                  style={[
                    styles.statusBadge,
                    {
                      borderColor:
                        status === "NEW RESPONSE" ? "#FFD700" : "#666",
                    },
                  ]}
                >
                  {status ? status : ""}
                </Badge>
              </View>

              <Text variant="bodySmall" style={styles.purpose}>
                {loanPurpose ? loanPurpose : "no purpose provided"}
              </Text>

              <View style={styles.detailsGrid}>
                <View style={styles.detailItem}>
                  <Text variant="bodySmall" style={styles.label}>
                    Loan Amount
                  </Text>
                  <View style={styles.amountContainer}>
                    <Text variant="bodyMedium" style={styles.value}>
                      {amount
                        ? amount.toLocaleString() + " KWD"
                        : "No amount provided"}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailItem}>
                  <Text variant="bodySmall" style={styles.label}>
                    Loan Term
                  </Text>
                  <Text variant="bodyMedium" style={styles.value}>
                    {loanTerm ? loanTerm : "No term provided"}
                  </Text>
                </View>

                <View style={styles.detailItem}>
                  <Text variant="bodySmall" style={styles.label}>
                    Repayment Plan
                  </Text>
                  <Text variant="bodyMedium" style={styles.value}>
                    {repaymentPlan
                      ? repaymentPlan
                      : "No Repayment plan is provided"}
                  </Text>
                </View>

                <View style={styles.detailItem}>
                  <Text variant="bodySmall" style={styles.label}>
                    Last Updated
                  </Text>
                  <Text variant="bodyMedium" style={styles.value}>
                    {statusDate ? formatDateTime(statusDate) : "No status Date"}
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
            {status === "NEW RESPONSE" && (
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
          </Card>
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    overflow: "hidden",
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

  card: {
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden",
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
    marginLeft: 8,
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
