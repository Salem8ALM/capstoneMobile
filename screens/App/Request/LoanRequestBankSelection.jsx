import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Dimensions, Animated, Easing } from "react-native";
import { Button, Text } from "react-native-paper";
import BankList from "../../../components/BankList";
import {
  handlePressIn,
  handlePressOut,
} from "../../../utils/animations/buttonAnimations";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NotificationBanner from "../../../utils/animations/NotificationBanner";
import Routes from "../../../utils/constants/routes";
import { useData } from "../../../context/DataContext";
import LoanProgressBar from "../../../components/LoanProgressBar";

const { height } = Dimensions.get("window");

export default function LoanRequestBankSelection({ navigation, route }) {
  const { loanAmount, loanTerm, repaymentPlan } = route.params; // Accessing passed params

  const [banksSelected, setBanksSelected] = useState(null);

  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const { updateData } = useData(); // Destructure the update function
  const { data } = useData(); // Destructure the update function

  const handleReview = () => {
    console.log("review button pressed");

    // ensure the bank selection is not empty
    if (!banksSelected || banksSelected.length === 0) {
      setNotificationMessage("Select at least one bank");
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000);
    } else {
      updateData("selectedBanks", banksSelected); // Add new key-value pair to the body

      // for verification
      console.log(`loan Amount: ${loanAmount}`);
      console.log(`loan Term: ${loanTerm}`);
      console.log(`repayment Plan: ${repaymentPlan}`);
      console.log(`Data stored: ${JSON.stringify(data)}`);
      console.log(`Data stored: ${data.loanTitle}`);

      navigation.navigate(Routes.LoanRequest.LoanRequestReview, {
        loanAmount: loanAmount,
        loanTerm: loanTerm,
        repaymentPlan: repaymentPlan,
      });
    }
  };

  const reviewAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(reviewAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [reviewAnim]);

  return (
    <View style={styles.container}>
      <NotificationBanner
        message={notificationMessage}
        visible={notificationVisible}
      />
      <View style={styles.content}>
        <LoanProgressBar step={3} totalSteps={3} />
        <Text style={styles.subtitle}>
          Select the banks you'd like to receive offers from.
        </Text>

        <BankList
          setBanksSelected={setBanksSelected}
          setNotificationMessage={setNotificationMessage}
          setNotificationVisible={setNotificationVisible}
        />

        <Animated.View style={[{ transform: [{ scale: reviewAnim }] }]}>
          <Button
            icon={({ color }) => (
              <MaterialCommunityIcons
                name="arrow-right"
                size={24}
                color={color}
              />
            )}
            mode="contained"
            onPress={handleReview}
            onPressIn={() => handlePressIn(reviewAnim)}
            onPressOut={() => handlePressOut(reviewAnim)}
            style={styles.submit}
            labelStyle={styles.buttonText}
          >
            Review
          </Button>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1E",
  },
  content: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: height * 0.05, // 5% of screen height padding
  },
  subtitle: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 10,
  },
  symbols: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    zIndex: -1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginLeft: 10,
  },
  description: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  submit: {
    backgroundColor: "#FFD700",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 8,
    margin: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  progressContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  progressBar: {
    width: "100%",
    height: 6,
    backgroundColor: "#2C2C2E",
    borderRadius: 3,
    marginBottom: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FFD700",
    borderRadius: 3,
  },
  progressText: {
    color: "#A1A1AA",
    fontSize: 14,
  },
});
