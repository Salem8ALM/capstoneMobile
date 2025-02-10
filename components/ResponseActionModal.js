import React from "react";
import { StyleSheet, View, Animated } from "react-native";
import { Portal, Modal, Text, Button, IconButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

const ResponseActionModal = ({ visible, onDismiss, response, onAction }) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        <Animatable.View
          animation="slideInUp"
          duration={500}
          style={styles.content}
        >
          <View style={styles.header}>
            <IconButton
              icon="close"
              iconColor="#FFD700"
              size={24}
              onPress={onDismiss}
              style={styles.closeButton}
            />
          </View>

          <Animatable.View
            animation="bounceIn"
            delay={500}
            style={styles.bankInfo}
          >
            <View style={styles.logoContainer}>
              <MaterialCommunityIcons name="bank" size={40} color="#FFD700" />
            </View>
            <Text style={styles.bankName}>{response?.bankName}</Text>
          </Animatable.View>

          <Animatable.View
            animation="fadeInUp"
            delay={700}
            style={styles.offerDetails}
          >
            <MaterialCommunityIcons
              name={
                response?.decision === "approved"
                  ? "check-circle-outline"
                  : "refresh"
              }
              size={30}
              color="#FFD700"
              style={styles.offerIcon}
            />
            <Text style={styles.offerTitle}>
              {response?.decision === "approved"
                ? "Loan Approved"
                : "Counter Offer"}
            </Text>
            <Text style={styles.amount}>
              {response?.decision === "approved"
                ? response?.amount
                : response?.counterAmount}
            </Text>

            <View style={styles.detailsRow}>
              <MaterialCommunityIcons
                name="calendar-clock"
                size={20}
                color="#9E9E9E"
              />
              <Text style={styles.detailText}>
                Response received on {response?.date}
              </Text>
            </View>

            <View style={styles.detailsRow}>
              <MaterialCommunityIcons
                name="account-tie"
                size={20}
                color="#9E9E9E"
              />
              <Text style={styles.detailText}>
                Representative: {response?.representativeName}
              </Text>
            </View>
          </Animatable.View>

          <Animatable.View
            animation="fadeInUp"
            delay={900}
            style={styles.actions}
          >
            <Button
              mode="contained"
              style={[styles.actionButton, styles.acceptButton]}
              icon="check"
              onPress={() => onAction("accept")}
            >
              Accept Offer
            </Button>

            {response?.decision === "counter" && (
              <Button
                mode="contained"
                style={[styles.actionButton, styles.counterButton]}
                icon="refresh"
                onPress={() => onAction("counter")}
              >
                Make Counter Offer
              </Button>
            )}

            <Button
              mode="contained"
              style={[styles.actionButton, styles.rejectButton]}
              icon="close"
              onPress={() => onAction("reject")}
            >
              Reject Offer
            </Button>
          </Animatable.View>
        </Animatable.View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 20,
    backgroundColor: "transparent",
  },
  content: {
    backgroundColor: "#2C2C2C",
    borderRadius: 15,
    padding: 20,
    elevation: 5,
  },
  header: {
    alignItems: "flex-end",
  },
  closeButton: {
    margin: -8,
  },
  bankInfo: {
    alignItems: "center",
    marginBottom: 24,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  bankName: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  offerDetails: {
    alignItems: "center",
    marginBottom: 24,
  },
  offerIcon: {
    marginBottom: 8,
  },
  offerTitle: {
    color: "#FFD700",
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 8,
  },
  amount: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    color: "#9E9E9E",
    marginLeft: 8,
  },
  actions: {
    gap: 12,
  },
  actionButton: {
    marginVertical: 4,
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
  },
  counterButton: {
    backgroundColor: "#FFD700",
  },
  rejectButton: {
    backgroundColor: "#F44336",
  },
});

export default ResponseActionModal;
