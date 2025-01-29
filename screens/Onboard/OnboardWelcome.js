import React, { useRef, useEffect, useContext } from "react";
import { StyleSheet, View, Animated, Alert } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Icons library
import UserContext from "../../context/UserContext";
import {
  handlePressIn,
  handlePressOut,
} from "../../utils/animations/buttonAnimations";
import Routes from "../../utils/constants/routes";
import { getCompanyAPI } from "../../api/Business";
import { getToken } from "../../storage/TokenStorage";

const OnboardWelcome = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  const { authenticated, setAuthenticated, onboarded, setOnboarded } =
    useContext(UserContext);

  const buttonAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  // checking token and whether the user is onboarded
  const checkUserState = async () => {
    const token = await checkToken();
    await checkBusinessEntity(token);
  };

  const checkToken = async () => {
    const token = await getToken("access");
    console.log("INside check token" + token);

    if (token) {
      setAuthenticated(true);

      return token;
    } else {
      Alert.alert("Please log in again", "The session has timed out");
    }
  };

  const checkBusinessEntity = async (token) => {
    console.log(token);
    try {
      await getCompanyAPI(token);
      setOnboarded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUserState();

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
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
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
