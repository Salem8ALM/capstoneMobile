import { useRef, useEffect, useContext, useState } from "react";
import { StyleSheet, View, Animated, Easing, Dimensions } from "react-native";
import { Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import UserContext from "../../../context/UserContext";
import {
  handlePressIn,
  handlePressOut,
} from "../../../utils/animations/buttonAnimations";
import Routes from "../../../utils/constants/routes";

const { width, height } = Dimensions.get("window");

const FinanceSymbol = ({ icon, size, color }) => {
  const [position] = useState({
    x: Math.random() * width,
    y: Math.random() * height,
  });
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    animateSymbol();
  }, []);

  const animateSymbol = () => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000 + Math.random() * 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000 + Math.random() * 1000,
        delay: 1000 + Math.random() * 2000,
        useNativeDriver: true,
      }),
    ]).start(() => animateSymbol());
  };

  return (
    <Animated.View
      style={[
        styles.symbol,
        {
          left: position.x,
          top: position.y,
          opacity,
        },
      ]}
    >
      <MaterialCommunityIcons name={icon} size={size} color={color} />
    </Animated.View>
  );
};

const LoanRequestIntro = () => {
  const navigation = useNavigation();
  const { authenticated, setAuthenticated } = useContext(UserContext);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const iconPulseAnim = useRef(new Animated.Value(1)).current;

  const symbols = [
    { icon: "cash", size: 30, color: "rgba(255, 215, 0, 0.05)" },
    { icon: "chart-line", size: 40, color: "rgba(255, 223, 0, 0.02)" },
    { icon: "bank", size: 35, color: "rgba(255, 230, 0, 0.02)" },
    { icon: "credit-card", size: 30, color: "rgba(255, 165, 0, 0.02)" },
    { icon: "currency-usd", size: 35, color: "rgba(255, 99, 0, 0.05)" },
    { icon: "calculator", size: 25, color: "rgba(255, 204, 0, 0.04)" },
    { icon: "chart-areaspline", size: 40, color: "rgba(255, 255, 0, 0.02)" },
    { icon: "cash", size: 30, color: "rgba(255, 215, 0, 0.05)" },
    { icon: "chart-line", size: 40, color: "rgba(255, 223, 0, 0.02)" },
    { icon: "bank", size: 35, color: "rgba(255, 230, 0, 0.02)" },
    { icon: "credit-card", size: 30, color: "rgba(255, 165, 0, 0.02)" },
    { icon: "currency-usd", size: 35, color: "rgba(255, 99, 0, 0.05)" },
    { icon: "calculator", size: 25, color: "rgba(255, 204, 0, 0.04)" },
    { icon: "chart-areaspline", size: 40, color: "rgba(255, 255, 0, 0.02)" },
    { icon: "cash", size: 30, color: "rgba(255, 215, 0, 0.05)" },
    { icon: "chart-line", size: 40, color: "rgba(255, 223, 0, 0.02)" },
    { icon: "bank", size: 35, color: "rgba(255, 230, 0, 0.02)" },
    { icon: "credit-card", size: 30, color: "rgba(255, 165, 0, 0.02)" },
    { icon: "currency-usd", size: 35, color: "rgba(255, 99, 0, 0.05)" },
    { icon: "calculator", size: 25, color: "rgba(255, 204, 0, 0.04)" },
    { icon: "chart-areaspline", size: 40, color: "rgba(255, 255, 0, 0.02)" },
    { icon: "cash", size: 30, color: "rgba(255, 215, 0, 0.05)" },
    { icon: "chart-line", size: 40, color: "rgba(255, 223, 0, 0.02)" },
    { icon: "bank", size: 35, color: "rgba(255, 230, 0, 0.02)" },
    { icon: "credit-card", size: 30, color: "rgba(255, 165, 0, 0.02)" },
    { icon: "currency-usd", size: 35, color: "rgba(255, 99, 0, 0.05)" },
    { icon: "calculator", size: 25, color: "rgba(255, 204, 0, 0.04)" },
    { icon: "chart-areaspline", size: 40, color: "rgba(255, 255, 0, 0.02)" },
    { icon: "cash", size: 30, color: "rgba(255, 215, 0, 0.05)" },
    { icon: "chart-line", size: 40, color: "rgba(255, 223, 0, 0.02)" },
    { icon: "bank", size: 35, color: "rgba(255, 230, 0, 0.02)" },
    { icon: "credit-card", size: 30, color: "rgba(255, 165, 0, 0.02)" },
    { icon: "currency-usd", size: 35, color: "rgba(255, 99, 0, 0.05)" },
    { icon: "calculator", size: 25, color: "rgba(255, 204, 0, 0.04)" },
    { icon: "chart-areaspline", size: 40, color: "rgba(255, 255, 0, 0.02)" },
    { icon: "cash", size: 30, color: "rgba(255, 215, 0, 0.05)" },
    { icon: "chart-line", size: 40, color: "rgba(255, 223, 0, 0.02)" },
    { icon: "bank", size: 35, color: "rgba(255, 230, 0, 0.02)" },
    { icon: "credit-card", size: 30, color: "rgba(255, 165, 0, 0.02)" },
    { icon: "currency-usd", size: 35, color: "rgba(255, 99, 0, 0.05)" },
    { icon: "calculator", size: 25, color: "rgba(255, 204, 0, 0.04)" },
    { icon: "chart-areaspline", size: 40, color: "rgba(255, 255, 0, 0.02)" },
    { icon: "cash", size: 30, color: "rgba(255, 215, 0, 0.05)" },
    { icon: "chart-line", size: 40, color: "rgba(255, 223, 0, 0.02)" },
    { icon: "bank", size: 35, color: "rgba(255, 230, 0, 0.02)" },
    { icon: "credit-card", size: 30, color: "rgba(255, 165, 0, 0.02)" },
    { icon: "currency-usd", size: 35, color: "rgba(255, 99, 0, 0.05)" },
    { icon: "calculator", size: 25, color: "rgba(255, 204, 0, 0.04)" },
    { icon: "chart-areaspline", size: 40, color: "rgba(255, 255, 0, 0.02)" },
  ];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(iconPulseAnim, {
          toValue: 1.1,
          duration: 800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(iconPulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim, scaleAnim, iconPulseAnim]); // Added dependencies

  return (
    <View style={styles.container}>
      {symbols.map((symbol, index) => (
        <FinanceSymbol key={index} {...symbol} />
      ))}

      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Animated.View
          style={[
            styles.iconWrapper,
            { transform: [{ scale: iconPulseAnim }] },
          ]}
        >
          <MaterialCommunityIcons
            name="cash-multiple"
            size={80}
            color="#FFD700"
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
            onPress={() => navigation.push(Routes.LoanDetailsScreen)}
          >
            Get Started
          </Button>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  symbol: {
    position: "absolute",
  },
  content: {
    alignItems: "center",
    padding: 20,
    zIndex: 2,
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

export default LoanRequestIntro;
