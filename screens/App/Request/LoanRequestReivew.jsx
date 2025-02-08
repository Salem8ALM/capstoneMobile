import React, { useRef, useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Animated,
  ScrollView,
} from "react-native";
import { Text, Button, Card, Divider } from "react-native-paper";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import {
  handlePressIn,
  handlePressOut,
} from "../../../utils/animations/buttonAnimations";
import { useNavigation } from "@react-navigation/native";
import Routes from "../../../utils/constants/routes";
import ProcessModal from "../../../components/ProcessModal";
import { useData } from "../../../context/DataContext";
import { getToken } from "../../../storage/TokenStorage";
import { sendLoanRequest } from "../../../api/LoanRequest";
import UserContext from "../../../context/UserContext";
import NotificationBanner from "../../../utils/animations/NotificationBanner";
import FinanceSymbol from "../../../utils/animations/FinanceSymbol";

export default function LoanRequestReview({ navigation, route }) {
  const { loanAmount, loanTerm, repaymentPlan } = route.params; // Accessing passed params

  const { authenticated, setAuthenticated, onboarded, setOnboarded } =
    useContext(UserContext);

  const [Send, setSend] = useState("Send");

  const { data } = useData(); // Destructure the update function

  const reviewAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const symbols = [
    { icon: "check-circle", size: 30, color: "rgba(255, 215, 0, 0.02)" },
    { icon: "clipboard-check", size: 40, color: "rgba(255, 223, 0, 0.1)" },
    { icon: "file-check", size: 60, color: "rgba(255, 230, 0, 0.02)" },
    { icon: "account-check", size: 30, color: "rgba(255, 215, 0, 0.02)" },
    { icon: "check-decagram", size: 40, color: "rgba(255, 223, 0, 0.1)" },
    { icon: "calendar-check", size: 60, color: "rgba(255, 230, 0, 0.02)" },
    { icon: "note-check", size: 30, color: "rgba(255, 215, 0, 0.02)" },
    { icon: "bookmark-check", size: 40, color: "rgba(255, 223, 0, 0.1)" },
    {
      icon: "checkbox-marked-circle",
      size: 60,
      color: "rgba(255, 230, 0, 0.02)",
    },
    { icon: "shield-check", size: 40, color: "rgba(255, 223, 0, 0.1)" },
    { icon: "lock-check", size: 60, color: "rgba(255, 230, 0, 0.02)" },
    { icon: "certificate", size: 30, color: "rgba(255, 215, 0, 0.02)" },
    { icon: "clipboard-check", size: 60, color: "rgba(255, 230, 0, 0.02)" },
    { icon: "signature", size: 60, color: "rgba(255, 215, 0, 0.05)" },
    {
      icon: "file-check",
      size: 40,
      color: "rgba(255, 223, 0, 0.05)",
    },
    { icon: "form-select", size: 30, color: "rgba(255, 230, 0, 0.2)" },
  ];
  const checkToken = async () => {
    const token = await getToken("access");
    console.log("INside check token " + token);

    if (token) {
      setAuthenticated(true);

      return token;
    } else {
      Alert.alert("Please log in again", "The session has timed out");
    }
  };

  const handleOpenModal = async () => {
    setSend("Sending Loan Request ...");

    try {
      const token = await checkToken();
      const response = await sendLoanRequest(token, data);
      console.log(response);
      setIsModalVisible(true);
    } catch (error) {
      setNotificationMessage("Error Sending loan Request. Please try again");
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000);

      console.log(error);
      setSend("Send");
    }

    setSend("Send");
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    Animated.timing(reviewAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim]);

  return (
    <View style={styles.container}>
      <NotificationBanner
        message={notificationMessage}
        visible={notificationVisible}
      />
      <Animated.View style={[styles.header, { opacity: reviewAnim }]}>
        <Ionicons name="document-text-outline" size={40} color="#FFD700" />
        <Text style={styles.title}>Review Loan Request</Text>
      </Animated.View>

      <View contentContainerStyle={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            {[
              {
                icon: "tag",
                label: "Loan Nickname",
                value: data.loanTitle,
              },
              {
                icon: "file-document",
                label: "Loan Description",
                value: data.loanPurpose,
              },
              {
                icon: "cash",
                label: "Loan Amount",
                value: loanAmount,
              },
              {
                icon: "calendar",
                label: "Loan Term",
                value: loanTerm,
              },
              {
                icon: "credit-card",
                label: "Repayment Plan",
                value: repaymentPlan,
              },
              {
                icon: "bank",
                label: "Selected Banks",
                value: data.selectedBanks
                  .map(
                    (bank) =>
                      bank
                        .toLowerCase() // Convert to lowercase
                        .replace(/_/g, " ") // Replace underscores with spaces
                        .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize first letter
                  )
                  .join(", "), // Join the transformed strings into a single string
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

        <Animated.View style={[{ transform: [{ scale: reviewAnim }] }]}>
          <View style={{ width: "100%" }}>
            <Button
              icon={({ color }) => (
                <MaterialCommunityIcons name="send" size={24} color={color} />
              )}
              mode="contained"
              onPress={handleOpenModal}
              onPressIn={() => handlePressIn(reviewAnim)}
              onPressOut={() => handlePressOut(reviewAnim)}
              style={styles.submit}
              labelStyle={styles.buttonText}
            >
              {Send}
            </Button>
          </View>
        </Animated.View>
      </View>
      {/* ProcessModal Component */}
      <ProcessModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        navigation={navigation}
      />
      {symbols.map((symbol, index) => (
        <FinanceSymbol style={styles.symbols} key={index} {...symbol} />
      ))}
    </View>
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
    paddingTop: 30,

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

  submit: {
    backgroundColor: "#FFD700",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
