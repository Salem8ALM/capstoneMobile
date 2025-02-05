import React, { useRef, useEffect, useState } from "react";
import { View, Animated, StyleSheet, Easing } from "react-native";
import { Button, Text, List } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NotificationBanner from "../../../components/NotificationBanner";
import { useNavigation } from "@react-navigation/native";
import Routes from "../../../utils/constants/routes";
import {
  handlePressIn,
  handlePressOut,
} from "../../../utils/animations/buttonAnimations";

const AnimatedListItem = ({ item, onPress, style }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [animatedValue]); // Added animatedValue to dependencies

  return (
    <Animated.View
      style={[
        {
          opacity: animatedValue,
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
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

const LoanRequestAmount = () => {
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const [loanAmount, setLoanAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [repaymentPlan, setRepaymentPlan] = useState("");

  const [expandedLoanAmount, setExpandedLoanAmount] = useState(false);
  const [expandedLoanTerm, setExpandedLoanTerm] = useState(false);
  const [expandedRepaymentPlan, setExpandedRepaymentPlan] = useState(false);

  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const loanAmountList = [
    { label: "$1,000", value: "1000" },
    { label: "$5,000", value: "5000" },
    { label: "$10,000", value: "10000" },
  ];

  const loanTermList = [
    { label: "1 year", value: "1 year" },
    { label: "3 years", value: "3 years" },
    { label: "5 years", value: "5 years" },
  ];

  const repaymentPlanList = [
    { label: "Monthly", value: "Monthly" },
    { label: "Quarterly", value: "Quarterly" },
    { label: "Annually", value: "Annually" },
  ];

  const handleNext = async () => {
    if (!loanAmount || !loanTerm || !repaymentPlan) {
      setNotificationMessage("Please fill in all fields.");
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000);
    } else {
      console.log("Proceeding to next step");
      navigation.navigate(Routes.LoanRequest.LoanRequestReview);
    }
  };

  const handleOptionPress = (setValue, setExpanded, value) => {
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

    setValue(value);
    setExpanded(false);
  };

  return (
    <View style={styles.container}>
      <NotificationBanner
        message={notificationMessage}
        visible={notificationVisible}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Step 2/5: Loan Amount & Terms</Text>
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
            ]}
            titleStyle={[
              styles.dropdownTitle,
              loanAmount && styles.selectedTitle,
            ]}
          >
            <View style={styles.optionsContainer}>
              {loanAmountList.map((option, index) => (
                <AnimatedListItem
                  key={option.value}
                  item={option}
                  onPress={() =>
                    handleOptionPress(
                      setLoanAmount,
                      setExpandedLoanAmount,
                      option.label
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
            title={loanTerm || "Select Loan Term"}
            expanded={expandedLoanTerm}
            onPress={() => setExpandedLoanTerm(!expandedLoanTerm)}
            style={[
              styles.dropdown,
              expandedLoanTerm && styles.dropdownExpanded,
            ]}
            titleStyle={[
              styles.dropdownTitle,
              loanTerm && styles.selectedTitle,
            ]}
          >
            <View style={styles.optionsContainer}>
              {loanTermList.map((option, index) => (
                <AnimatedListItem
                  key={option.value}
                  item={option}
                  onPress={() =>
                    handleOptionPress(
                      setLoanTerm,
                      setExpandedLoanTerm,
                      option.label
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
            ]}
            titleStyle={[
              styles.dropdownTitle,
              repaymentPlan && styles.selectedTitle,
            ]}
          >
            <View style={styles.optionsContainer}>
              {repaymentPlanList.map((option, index) => (
                <AnimatedListItem
                  key={option.value}
                  item={option}
                  onPress={() =>
                    handleOptionPress(
                      setRepaymentPlan,
                      setExpandedRepaymentPlan,
                      option.label
                    )
                  }
                  style={{ delay: index * 100 }}
                />
              ))}
            </View>
          </List.Accordion>
        </View>

        <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
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
            onPressIn={() => handlePressIn(scaleAnim)}
            onPressOut={() => handlePressOut(scaleAnim)}
            style={styles.submit}
            labelStyle={styles.buttonText}
          >
            Next
          </Button>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
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
    borderRadius: 12,
    overflow: "hidden",
  },
  dropdown: {
    backgroundColor: "#2a2a2a",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 0,
  },
  dropdownExpanded: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
  },
  dropdownTitle: {
    color: "#999",
    fontSize: 16,
  },
  selectedTitle: {
    color: "#FFD700",
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
  optionText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
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
