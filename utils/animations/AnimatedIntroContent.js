import React, { useEffect, useRef } from "react";
import { Animated, Text, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Routes from "../constants/routes";
import { handlePressIn, handlePressOut } from "./buttonAnimations";
import LottieView from "lottie-react-native";

const AnimatedIntroContent = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const iconPulseAnim = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(iconPulseAnim, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(iconPulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim, scaleAnim, iconPulseAnim]);

  return (
    <Animated.View
      style={[
        styles.content,
        { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
      ]}
    >
      <Animated.View
        style={[styles.iconWrapper, { transform: [{ scale: iconPulseAnim }] }]}
      >
        {/* <MaterialCommunityIcons
          name="cash-multiple"
          size={80}
          color="#FFD700"
        /> */}

        <LottieView
          source={require("../../assets/loanDetails.json")}
          autoPlay
          loop
          style={styles.lottieAnimation}
        />
      </Animated.View>
      <Text style={styles.title}>Your Loan, Your Future</Text>
      <Text style={styles.subtitle}>
        Secure funding for your dreams with ease. Be clear, precise, and
        confident, and take the next step toward your goal.
      </Text>

      <Animated.View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          onPressIn={() => handlePressIn(scaleAnim)}
          onPressOut={() => handlePressOut(scaleAnim)}
          style={styles.primaryButton}
          labelStyle={styles.primaryButtonText}
          onPress={() => navigation.push(Routes.LoanRequest.LoanRequestDetails)}
        >
          Get Started
        </Button>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    padding: 20,
    zIndex: 2,
  },
  lottieAnimation: {
    width: 200, // Adjust to your preferred size
    height: 200,
    alignSelf: "center",
  },
  iconWrapper: {
    marginBottom: 20,
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
    paddingHorizontal: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  primaryButton: {
    marginTop: 10,
    borderColor: "#FFD700",
    borderWidth: 2,
    borderRadius: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700",
    paddingVertical: 10,
  },
});

export default AnimatedIntroContent;
