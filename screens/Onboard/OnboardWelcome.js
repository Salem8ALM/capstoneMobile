import React, { useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Alert,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Icons library
import UserContext from "../../context/UserContext";
import {
  handlePressIn,
  handlePressOut,
} from "../../utils/animations/buttonAnimations";
import Routes from "../../utils/constants/routes";
import { deleteToken } from "../../storage/TokenStorage";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const OnboardWelcome = () => {
  const { setAuthenticated, setOnboarded } = useContext(UserContext);

  const navigation = useNavigation();
  const theme = useTheme();

  const buttonAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start bouncing animation when the component mounts
    Animated.loop(
      Animated.sequence([
        Animated.spring(bounceAnim, {
          toValue: 1,
          tension: 150,
          friction: 3,

          useNativeDriver: true,
        }),
        Animated.spring(bounceAnim, {
          toValue: 0,
          friction: 3,
          tension: 150,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <LinearGradient
      colors={["black", "rgb(38, 38, 31)", "black"]} // Gradient colors
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={async () => {
            setAuthenticated(false);
            await deleteToken("access");
            setOnboarded(false);
          }}
          style={[styles.container, styles.absoluteTopLeft]}
        >
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
        <View style={styles.content}>
          <Animated.View
            style={[
              styles.iconWrapper,
              {
                transform: [
                  {
                    translateY: bounceAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -20], // Bounce up
                    }),
                  },
                ],
              },
            ]}
          >
            <MaterialCommunityIcons
              name="rocket-launch"
              size={80}
              color="#FFD700"
              style={styles.icon}
            />
          </Animated.View>
          <Text style={styles.title}>Let's Get Started!</Text>
          <Text style={styles.subtitle}>
            Set up your business profile to unlock personalized loan offers.
          </Text>

          <Animated.View
            style={[
              styles.buttonContainer,
              { transform: [{ scale: buttonAnim }] },
            ]}
          >
            <Button
              mode="outlined"
              onPressIn={() => handlePressIn(buttonAnim)}
              onPressOut={() => handlePressOut(buttonAnim)}
              style={styles.secondaryButton}
              labelStyle={styles.secondaryButtonText}
              onPress={() => navigation.push(Routes.Onboard.OnboardAddBusiness)}
            >
              Start
            </Button>
          </Animated.View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  logout: {
    color: "white",
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    top: 20,
  },
  gradient: {
    flex: 1,
    width: width,
    height: height,
  },
  absoluteTopLeft: {
    position: "absolute",
    top: 20, // Adjust to your desired distance from the top
    left: 20, // Adjust to your desired distance from the left
    zIndex: 1, // Ensure it appears above other components if overlapping
  },
  container: {
    flex: 1,
    // backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    padding: 20,
  },
  iconWrapper: {
    marginBottom: 20,
  },
  icon: {
    marginBottom: 10,
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

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  secondaryButton: {
    marginTop: 10,
    borderColor: "#FFD700",
    borderWidth: 2,
    borderRadius: 8,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700",
    paddingVertical: 10,
  },
});

export default OnboardWelcome;
