"use client";

import { useRef, useEffect, useState } from "react";
import { View, Animated, StyleSheet, Easing, ScrollView } from "react-native";
import { Button, Text, List } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NotificationBanner from "../../../utils/animations/NotificationBanner";
import { useNavigation } from "@react-navigation/native";
import Routes from "../../../utils/constants/routes";
import {
  handlePressIn,
  handlePressOut,
} from "../../../utils/animations/buttonAnimations";
import FinanceSymbol from "../../../utils/animations/FinanceSymbol";
import { useData } from "../../../context/DataContext";

const AnimatedListItem = ({ item, onPress, style }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  return (
    <Animated.View
      style={[
        {
          opacity: animatedValue,
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0],
              }),
            },
          ],
        },
        style,
      ]}
    >
      <List.Item
        title={item.label}
        onPress={onPress}
        titleStyle={styles.optionText}
        style={styles.listItem}
      />
    </Animated.View>
  );
};

const LoanRequestAmount = ({ navigation }) => {
  // const navigation = useNavigation();

  const { updateData } = useData(); // Destructure the update function
  const [input, setInput] = useState("");

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const nextAnim = useRef(new Animated.Value(1)).current;

  const [loanAmount, setLoanAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [repaymentPlan, setRepaymentPlan] = useState("");

  const [expandedLoanAmount, setExpandedLoanAmount] = useState(false);
  const [expandedLoanTerm, setExpandedLoanTerm] = useState(false);
  const [expandedRepaymentPlan, setExpandedRepaymentPlan] = useState(false);

  const [loanAmountValue, setLoanAmountValue] = useState("");
  const [loanTermValue, setLoanTermValue] = useState("");
  const [repaymentPlanValue, setRepaymentPlanValue] = useState("");

  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const symbols = [
    { icon: "cash-multiple", size: 30, color: "rgba(255, 215, 0, 0.02)" },
    {
      icon: "calendar-month-outline",
      size: 40,
      color: "rgba(255, 223, 0, 0.1)",
    },
    { icon: "bank", size: 60, color: "rgba(255, 230, 0, 0.02)" },
    {
      icon: "swap-horizontal-circle",
      size: 30,
      color: "rgba(255, 215, 0, 0.02)",
    },
    {
      icon: "wallet",
      size: 40,
      color: "rgba(255, 223, 0, 0.1)",
    },
    { icon: "chart-line", size: 60, color: "rgba(255, 230, 0, 0.02)" },
    { icon: "cash-multiple", size: 30, color: "rgba(255, 215, 0, 0.02)" },
    {
      icon: "calendar-month-outline",
      size: 40,
      color: "rgba(255, 223, 0, 0.1)",
    },
    { icon: "bank", size: 60, color: "rgba(255, 230, 0, 0.02)" },
    {
      icon: "swap-horizontal-circle",
      size: 30,
      color: "rgba(255, 215, 0, 0.02)",
    },
    {
      icon: "wallet",
      size: 40,
      color: "rgba(255, 223, 0, 0.1)",
    },
    { icon: "chart-line", size: 60, color: "rgba(255, 230, 0, 0.02)" },
    { icon: "cash-multiple", size: 30, color: "rgba(255, 215, 0, 0.02)" },
    {
      icon: "calendar-month-outline",
      size: 40,
      color: "rgba(255, 223, 0, 0.1)",
    },
    { icon: "bank", size: 60, color: "rgba(255, 230, 0, 0.02)" },
    {
      icon: "swap-horizontal-circle",
      size: 60,
      color: "rgba(255, 215, 0, 0.05)",
    },
    {
      icon: "wallet",
      size: 40,
      color: "rgba(255, 223, 0, 0.05)",
    },
    { icon: "chart-line", size: 30, color: "rgba(255, 230, 0, 0.2)" },
    { icon: "cash-multiple", size: 30, color: "rgba(255, 215, 0, 0.02)" },
    {
      icon: "calendar-month-outline",
      size: 40,
      color: "rgba(255, 223, 0, 0.1)",
    },
    { icon: "bank", size: 60, color: "rgba(255, 230, 0, 0.02)" },
    {
      icon: "swap-horizontal-circle",
      size: 30,
      color: "rgba(255, 215, 0, 0.02)",
    },
    {
      icon: "wallet",
      size: 40,
      color: "rgba(255, 223, 0, 0.1)",
    },
    { icon: "chart-line", size: 60, color: "rgba(255, 230, 0, 0.02)" },
    { icon: "cash-multiple", size: 30, color: "rgba(255, 215, 0, 0.02)" },
    {
      icon: "calendar-month-outline",
      size: 40,
      color: "rgba(255, 223, 0, 0.1)",
    },
    { icon: "bank", size: 60, color: "rgba(255, 230, 0, 0.02)" },
    {
      icon: "swap-horizontal-circle",
      size: 30,
      color: "rgba(255, 215, 0, 0.02)",
    },
    {
      icon: "wallet",
      size: 40,
      color: "rgba(255, 223, 0, 0.1)",
    },
    { icon: "chart-line", size: 60, color: "rgba(255, 230, 0, 0.02)" },
    { icon: "cash-multiple", size: 30, color: "rgba(255, 215, 0, 0.02)" },
    {
      icon: "calendar-month-outline",
      size: 40,
      color: "rgba(255, 223, 0, 0.1)",
    },
    { icon: "bank", size: 60, color: "rgba(255, 230, 0, 0.02)" },
    {
      icon: "swap-horizontal-circle",
      size: 60,
      color: "rgba(255, 215, 0, 0.05)",
    },
    {
      icon: "wallet",
      size: 40,
      color: "rgba(255, 223, 0, 0.05)",
    },
    { icon: "chart-line", size: 30, color: "rgba(255, 230, 0, 0.2)" },
    { icon: "cash-multiple", size: 30, color: "rgba(255, 215, 0, 0.02)" },
    {
      icon: "calendar-month-outline",
      size: 40,
      color: "rgba(255, 223, 0, 0.1)",
    },
    { icon: "bank", size: 60, color: "rgba(255, 230, 0, 0.02)" },
    {
      icon: "swap-horizontal-circle",
      size: 30,
      color: "rgba(255, 215, 0, 0.02)",
    },
    {
      icon: "wallet",
      size: 40,
      color: "rgba(255, 223, 0, 0.1)",
    },
    { icon: "chart-line", size: 60, color: "rgba(255, 230, 0, 0.02)" },
    { icon: "cash-multiple", size: 30, color: "rgba(255, 215, 0, 0.02)" },
    {
      icon: "calendar-month-outline",
      size: 40,
      color: "rgba(255, 223, 0, 0.1)",
    },
    { icon: "bank", size: 60, color: "rgba(255, 230, 0, 0.02)" },
    {
      icon: "swap-horizontal-circle",
      size: 30,
      color: "rgba(255, 215, 0, 0.02)",
    },
    {
      icon: "wallet",
      size: 40,
      color: "rgba(255, 223, 0, 0.1)",
    },
    { icon: "chart-line", size: 60, color: "rgba(255, 230, 0, 0.02)" },
    { icon: "cash-multiple", size: 30, color: "rgba(255, 215, 0, 0.02)" },
    {
      icon: "calendar-month-outline",
      size: 40,
      color: "rgba(255, 223, 0, 0.1)",
    },
    { icon: "bank", size: 60, color: "rgba(255, 230, 0, 0.02)" },
    {
      icon: "swap-horizontal-circle",
      size: 60,
      color: "rgba(255, 215, 0, 0.05)",
    },
    {
      icon: "wallet",
      size: 40,
      color: "rgba(255, 223, 0, 0.05)",
    },
    { icon: "chart-line", size: 30, color: "rgba(255, 230, 0, 0.2)" },
  ];

  const loanAmountList = [
    { label: "1,000 KWD", value: "1000" },
    { label: "2,500 KWD", value: "2500" },
    { label: "5,000 KWD", value: "5000" },
    { label: "10,000 KWD", value: "10000" },
    { label: "15,000 KWD", value: "15000" },
    { label: "20,000 KWD", value: "20000" },
    { label: "25,000 KWD", value: "25000" },
    { label: "50,000 KWD", value: "50000" },
    { label: "75,000 KWD", value: "75000" },
    { label: "100,000 KWD", value: "100000" },
  ];

  const loanTermList = [
    { label: "6 months", value: "SIX_MONTHS" },
    { label: "1 year", value: "ONE_YEAR" },
    { label: "2 years", value: "TWO_YEARS" },
    { label: "5 years", value: "FIVE_YEARS" },
  ];

  const repaymentPlanList = [
    { label: "Equal Installments", value: "EQUAL_INSTALLMENTS" },
    { label: "Balloon Payment", value: "BALLOON_PAYMENT" },
    { label: "Step Up", value: "STEP_UP" },
    { label: "Step Down", value: "STEP_DOWN" },
    { label: "Lump Sum", value: "LUMP_SUM" },
    { label: "Grace Period", value: "GRACE_PERIOD" },
    { label: "Revenue Based", value: "REVENUE_BASED" },
    { label: "Lease To Own", value: "LEASE_TO_OWN" },
  ];

  const handleNext = () => {
    if (!loanAmountValue || !loanTermValue || !repaymentPlanValue) {
      setNotificationMessage("Please fill in all fields.");
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000);
    } else {
      console.log("Loan Amount (User View):", loanAmount);
      console.log("Loan Amount (Backend Value):", loanAmountValue);

      console.log("Loan Term (User View):", loanTerm);
      console.log("Loan Term (Backend Value):", loanTermValue);

      console.log("Repayment Plan (User View):", repaymentPlan);
      console.log("Repayment Plan (Backend Value):", repaymentPlanValue);

      console.log("Proceeding to next step");

      updateData("amount", loanAmountValue); // Add new key-value pair to the body
      updateData("loanTerm", loanTermValue); // Add new key-value pair to the body
      updateData("repaymentPlan", repaymentPlanValue); // Add new key-value pair to the body

      navigation.navigate(Routes.LoanRequest.LoanRequestBankSelection, {
        loanAmount: loanAmount,
        loanTerm: loanTerm,
        repaymentPlan: repaymentPlan,
      });
    }
  };

  const handleOptionPress = (setLabel, setValue, setExpanded, option) => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setLabel(option.label); // Display value for user
    setValue(option.value); // Backend value
    setExpanded(false);
  };

  return (
    <View style={styles.container}>
      <NotificationBanner
        message={notificationMessage}
        visible={notificationVisible}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Step 2/3: Loan Amount & Terms</Text>
        <Text style={styles.subtitle}>
          Provide the loan details and repayment plan.
        </Text>

        <View style={styles.inputContainer}>
          <List.Accordion
            title={loanAmount || "Select Loan Amount"}
            expanded={expandedLoanAmount}
            onPress={() => setExpandedLoanAmount(!expandedLoanAmount)}
            style={[
              styles.dropdown,
              expandedLoanAmount && styles.dropdownExpanded,
              {
                borderColor: loanAmount !== "" ? "white" : "rgb(163, 163, 163)",
              },
            ]}
            titleStyle={[
              styles.dropdownTitle,
              loanAmount && styles.selectedTitle,
            ]}
            left={(props) => (
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="cash-multiple" // You can also try "calendar-check" or "calendar-month"
                  size={24}
                  color={
                    loanAmount !== "" ? "white" : "rgba(255, 255, 255, 0.3)"
                  }
                />
                <View style={styles.separator} />
              </View>
            )}
          >
            <ScrollView
              style={styles.scrollableOptionsContainer}
              nestedScrollEnabled={true}
            >
              {loanAmountList.map((option, index) => (
                <AnimatedListItem
                  key={option.value}
                  item={option}
                  onPress={() =>
                    handleOptionPress(
                      setLoanAmount,
                      setLoanAmountValue,
                      setExpandedLoanAmount,
                      option
                    )
                  }
                  style={{ delay: index * 100 }}
                />
              ))}
            </ScrollView>
          </List.Accordion>
        </View>

        <View style={styles.inputContainer}>
          <List.Accordion
            title={loanTerm || "Select Loan Term"}
            expanded={expandedLoanTerm}
            onPress={() => setExpandedLoanTerm(!expandedLoanTerm)}
            style={[
              styles.dropdown,
              expandedLoanTerm && styles.dropdownExpanded,
              {
                borderColor: loanTerm !== "" ? "white" : "rgb(163, 163, 163)",
              },
            ]}
            titleStyle={[
              styles.dropdownTitle,
              loanTerm && styles.selectedTitle,
            ]}
            left={(props) => (
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="calendar-clock" // You can also try "calendar-check" or "calendar-month"
                  size={24}
                  color={loanTerm !== "" ? "white" : "rgba(255, 255, 255, 0.3)"}
                />
                <View style={styles.separator} />
              </View>
            )}
          >
            <View style={styles.optionsContainer}>
              {loanTermList.map((option, index) => (
                <AnimatedListItem
                  key={option.value}
                  item={option}
                  onPress={() =>
                    handleOptionPress(
                      setLoanTerm,
                      setLoanTermValue,
                      setExpandedLoanTerm,
                      option
                    )
                  }
                  style={{ delay: index * 100 }}
                />
              ))}
            </View>
          </List.Accordion>
        </View>

        <View style={styles.inputContainer}>
          <List.Accordion
            title={repaymentPlan || "Select Repayment Plan"}
            expanded={expandedRepaymentPlan}
            onPress={() => setExpandedRepaymentPlan(!expandedRepaymentPlan)}
            style={[
              styles.dropdown,
              expandedRepaymentPlan && styles.dropdownExpanded,
              {
                borderColor:
                  repaymentPlan !== "" ? "white" : "rgb(163, 163, 163)",
              },
            ]}
            titleStyle={[
              styles.dropdownTitle,
              repaymentPlan && styles.selectedTitle,
            ]}
            left={(props) => (
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="timeline-clock" // You can also try "calendar-check" or "calendar-month"
                  size={24}
                  color={
                    repaymentPlan !== "" ? "white" : "rgba(255, 255, 255, 0.3)"
                  }
                />
                <View style={styles.separator} />
              </View>
            )}
          >
            <ScrollView
              style={styles.scrollableOptionsContainer}
              nestedScrollEnabled={true}
            >
              {repaymentPlanList.map((option, index) => (
                <AnimatedListItem
                  key={option.value}
                  item={option}
                  onPress={() =>
                    handleOptionPress(
                      setRepaymentPlan,
                      setRepaymentPlanValue,
                      setExpandedRepaymentPlan,
                      option
                    )
                  }
                  style={{ delay: index * 100 }}
                />
              ))}
            </ScrollView>
          </List.Accordion>
        </View>

        <Animated.View style={[{ transform: [{ scale: nextAnim }] }]}>
          <Button
            icon={({ color }) => (
              <MaterialCommunityIcons
                name="arrow-right"
                size={24}
                color={color}
              />
            )}
            mode="contained"
            onPress={handleNext}
            onPressIn={() => handlePressIn(nextAnim)}
            onPressOut={() => handlePressOut(nextAnim)}
            style={styles.submit}
            labelStyle={styles.buttonText}
          >
            Choose Banks
          </Button>
        </Animated.View>
      </View>
      {symbols.map((symbol, index) => (
        <FinanceSymbol style={styles.symbols} key={index} {...symbol} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    borderRadius: 5,
    overflow: "hidden",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },

  separator: {
    height: "100%",
    width: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Subtle separator line
    marginLeft: 10, // Adds space between the icon and text
  },

  dropdown: {
    backgroundColor: "#2a2a2a",
    borderWidth: 1,
    borderColor: "rgb(163, 163, 163)",
    borderRadius: 5,
    overflow: "hidden",
  },
  dropdownExpanded: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
  },
  dropdownTitle: {
    color: "rgba(255, 255, 255, 0.3)",
    fontSize: 16,
  },
  selectedTitle: {
    color: "white",
    fontWeight: "bold",
  },
  optionsContainer: {
    backgroundColor: "#2a2a2a",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: "hidden",
  },
  scrollableOptionsContainer: {
    maxHeight: 150,
    backgroundColor: "#2a2a2a",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  optionText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
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

export default LoanRequestAmount;
