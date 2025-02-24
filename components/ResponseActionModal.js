import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Animated, Image } from "react-native";
import { Portal, Modal, Text, Button, IconButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import UserContext from "../context/UserContext";
import { acceptOfferAPI, rejectOfferAPI } from "../api/LoanRequest";
import { getToken } from "../storage/TokenStorage";
import { createChatEntityAPI } from "../api/Chat";
import { useNavigation } from "@react-navigation/native";
import NotificationBanner from "../utils/animations/NotificationBanner";

async function capitalizeFirstLetter(input) {
  if (!input) return ""; // Return an empty string if input is falsy (undefined, null, etc.)
  return input
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const bankIcons = {
  BOUBYAN_BANK: require("../assets/bankIcons/Boubyan.png"),
  KUWAIT_INTERNATIONAL_BANK: require("../assets/bankIcons/KIB.png"),
  KUWAIT_FINANCE_HOUSE: require("../assets/bankIcons/KFH.png"),
  WARBA_BANK: require("../assets/bankIcons/Warba.png"),
};

const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return "Invalid date"; // Handle undefined/null cases

  const date = new Date(dateTimeString);
  if (isNaN(date.getTime())) return "Invalid date"; // Handle invalid date cases

  return date.toLocaleString(); // Formats to local date & time
};

const ResponseActionModal = ({
  visible,
  onDismiss,
  response,
  onAction,
  loanId,
}) => {
  const { loans } = useContext(UserContext);
  let loan = loans.find((loan) => loan.id === loanId);
  const [notificationVisible, setNotificationVisible] = useState(false); // State to manage banner visibility
  const [notificationMessage, setNotificationMessage] = useState(""); // Message to show in the banner

  const navigation = useNavigation();
  const accpetOffer = async (response) => {
    try {
      const token = await getToken("access");

      await acceptOfferAPI(token, loanId, response.id);
    } catch (error) {
      setNotificationMessage("Unable to accept at the moment. Try later");
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000); // Hide the banner after 3 seconds
    }
    onDismiss();
  };

  const rejectOffer = async (response) => {
    try {
      const token = await getToken("access");

      await rejectOfferAPI(token, loanId, response.id);
    } catch (error) {
      setNotificationMessage("Unable to reject the loan offer at the moment");
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000); // Hide the banner after 3 seconds
    }
    onDismiss();
  };

  const negotiateOffer = async (response) => {
    try {
      const token = await getToken("access");

      const bankerId = response.banker.id;

      const chatEntity = await createChatEntityAPI(token, bankerId);

      navigation.navigate("Chat", {
        screen: "ChatDetail",
        params: {
          itemId: chatEntity.id, // Pass bankerId as a parameter
        },
      });
    } catch (error) {
      setNotificationMessage("Unable to negotiate at the moment. Try later");
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000); // Hide the banner after 3 seconds
    }
    onDismiss();
  };

  return (
    <Portal>
      <NotificationBanner
        message={notificationMessage}
        visible={notificationVisible}
      />

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
            <Image
              source={
                response?.banker?.bank ? bankIcons[response?.banker.bank] : null
              }
              style={{
                width: 70,
                height: 70,
                borderRadius: 25, // Half of width/height to make it round
                overflow: "hidden", // Ensures it clips correctly
              }}
            />

            <Text style={styles.bankName}>
              {response?.banker?.bank
                ? capitalizeFirstLetter(response.banker.bank)
                : "No Bank"}
            </Text>
          </Animatable.View>

          <Animatable.View
            animation="fadeInUp"
            delay={700}
            style={styles.offerDetails}
          >
            <MaterialCommunityIcons
              name={
                response?.status === "APPROVED"
                  ? "check-circle-outline"
                  : "refresh"
              }
              size={30}
              color="#FFD700"
              style={styles.offerIcon}
            />
            <Text style={styles.offerTitle}>
              {response?.status === "APPROVED"
                ? "Loan Offered"
                : "Counter Offer"}
            </Text>
            <Text style={styles.amount}>
              {response?.status === "APPROVED" && loan?.amount
                ? loan.amount.toLocaleString()
                : null}

              {response?.status === "COUNTER_OFFER" && response?.amount
                ? response.amount.toLocaleString()
                : null}
            </Text>

            <View style={styles.detailsRow}>
              <MaterialCommunityIcons
                name="calendar-clock"
                size={20}
                color="#9E9E9E"
              />
              <Text style={styles.detailText}>
                Response received on {"\n"}
                {response?.statusDate
                  ? formatDateTime(response?.statusDate)
                  : "No status Date yet"}
              </Text>
            </View>

            <View style={styles.detailsRow}>
              <MaterialCommunityIcons
                name="account-tie"
                size={20}
                color="#9E9E9E"
              />
              <Text style={styles.detailText}>
                Representative:
                {response?.banker?.firstName
                  ? capitalizeFirstLetter(
                      "_" +
                        response?.banker.firstName +
                        "_" +
                        response?.banker.lastName
                    )
                  : "No one Assigned"}
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
              textColor="#4CAF50"
              style={[styles.actionButton, styles.acceptButton]}
              icon="check"
              onPress={() => accpetOffer(response)}
            >
              Accept Offer
            </Button>

            {response?.status === "COUNTER_OFFER" && (
              <Button
                mode="contained"
                textColor="#FFD700"
                style={[styles.actionButton, styles.counterButton]}
                icon="chat-processing"
                onPress={() => negotiateOffer(response)}
              >
                Negotiate
              </Button>
            )}

            <Button
              mode="contained"
              textColor="#F44336"
              style={[styles.actionButton, styles.rejectButton]}
              icon="close"
              onPress={() => rejectOffer(response)}
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
    borderColor: "white",
    borderWidth: 0.2,
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
    borderColor: "#4CAF50",
    borderWidth: 2,

    backgroundColor: "transparent",
  },
  counterButton: {
    backgroundColor: "transparent",
    borderWidth: 2,

    borderColor: "#FFD700",
  },
  rejectButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#F44336",
  },
});

export default ResponseActionModal;
