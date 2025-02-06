import React, { useRef, useEffect, useState } from "react";
import { View, Animated, StyleSheet, Alert } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { animateField } from "../../../utils/animations/animations";
import { useNavigation } from "@react-navigation/native";
import Routes from "../../../utils/constants/routes";
import {
  handlePressIn,
  handlePressOut,
} from "../../../utils/animations/buttonAnimations";
import NotificationBanner from "../../../utils/animations/NotificationBanner";

const LoanRequestDetails = () => {
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const [loanTitle, setLoanTitle] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");

  const [focusedField, setFocusedField] = useState("");
  const [notificationVisible, setNotificationVisible] = useState(false); // State to manage banner visibility
  const [notificationMessage, setNotificationMessage] = useState(""); // Message to show in the banner

  const loanTitleAnim = useRef(new Animated.Value(0)).current;
  const loanPurposeAnim = useRef(new Animated.Value(0)).current;

  const handleNext = async () => {
    if (!loanTitle || !loanPurpose) {
      // Show banner if fields are missing
      setNotificationMessage("Please fill in both fields.");
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000); // Hide the banner after 3 seconds
    } else {
      // Proceed if both fields are filled
      console.log("Proceeding to next step");
      navigation.push(Routes.LoanRequest.LoanRequestAmount);
    }
  };

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
      <View style={styles.content}>
        <Text style={styles.title}>Step 1/5: Loan Details</Text>
        <Text style={styles.subtitle}>
          Give your loan a nickname and a purpose.
        </Text>

        <Animated.View
          style={[
            styles.inputContainer,
            {
              transform: [
                {
                  scale: loanTitleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.05],
                  }),
                },
              ],
            },
          ]}
        >
          <TextInput
            label={
              <Text
                style={{
                  color:
                    focusedField === "loanTitle"
                      ? "#FFD700"
                      : "rgba(255,255,255,0.3)",
                }}
              >
                Loan Title
              </Text>
            }
            value={loanTitle}
            onChangeText={setLoanTitle}
            mode="outlined"
            left={
              <TextInput.Icon
                icon="pencil-outline"
                color={
                  focusedField === "loanTitle"
                    ? "#FFD700"
                    : "rgba(255, 255, 255, 0.3)"
                }
              />
            }
            style={styles.input}
            textColor="white"
            onFocus={() => {
              setFocusedField("loanTitle");
              animateField(loanTitleAnim, 1);
            }}
            onBlur={() => {
              setFocusedField("");
              animateField(loanTitleAnim, 0);
            }}
            theme={{ colors: { primary: "#FFD700" } }}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.inputContainer,
            {
              transform: [
                {
                  scale: loanPurposeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.05],
                  }),
                },
              ],
            },
          ]}
        >
          <TextInput
            label={
              <Text
                style={{
                  color:
                    focusedField === "loanPurpose"
                      ? "#FFD700"
                      : "rgba(255,255,255,0.3)",
                }}
              >
                Loan Purpose
              </Text>
            }
            value={loanPurpose}
            onChangeText={setLoanPurpose}
            mode="outlined"
            left={
              <TextInput.Icon
                icon="clipboard-text-outline"
                color={
                  focusedField === "loanPurpose"
                    ? "#FFD700"
                    : "rgba(255, 255, 255, 0.3)"
                }
              />
            }
            style={styles.input}
            textColor="white"
            onFocus={() => {
              setFocusedField("loanPurpose");
              animateField(loanPurposeAnim, 1);
            }}
            onBlur={() => {
              setFocusedField("");
              animateField(loanPurposeAnim, 0);
            }}
            theme={{ colors: { primary: "#FFD700" } }}
          />
        </Animated.View>

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
  },
  input: {
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  submit: {
    backgroundColor: "#FFD700",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default LoanRequestDetails;
