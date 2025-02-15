import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Alert,
  Dimensions,
} from "react-native";
import {
  TextInput,
  Button,
  useTheme,
  TouchableRipple,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Routes from "../../utils/constants/routes";
import UserContext from "../../context/UserContext";
import { animateField } from "../../utils/animations/animations";
import { handleBiometricLogin } from "./auth-utils/handleBiometricLogin";
import {
  handlePressIn,
  handlePressOut,
} from "../../utils/animations/buttonAnimations";
import { signupAPI } from "../../api/Auth";
import { setToken, getToken } from "../../storage/TokenStorage";
import { LinearGradient } from "expo-linear-gradient";
import NotificationBanner from "../../utils/animations/NotificationBanner";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

const RegisterScreenAdvance = ({ route }) => {
  const navigation = useNavigation();
  const { mobileNumber, civilId } = route.params;

  // useStates for fields and password visibility
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  // Text when clicking on login
  const [signup, setSignup] = useState("Sign Up");

  const [showAnimation, setShowAnimation] = useState(false);

  const theme = useTheme();
  const inputRef = useRef(null);

  // use state for focused field
  const [focusedField, setFocusedField] = useState("");

  const [notificationVisible, setNotificationVisible] = useState(false); // State to manage banner visibility
  const [notificationMessage, setNotificationMessage] = useState(""); // Message to show in the banner

  // Used to change from AuthNavigator to AppNavigator after authenticatino
  const { authenticated, setAuthenticated, onboarded, setOnboarded } =
    useContext(UserContext);

  // check if token exists
  const checkToken = async () => {
    const token = await getToken("access");
    if (token) setAuthenticated(true);
  };
  useEffect(() => {
    checkToken();
  });

  // Animation values
  const usernameAnim = useRef(new Animated.Value(0)).current;
  const firstNameAnim = useRef(new Animated.Value(0)).current;
  const lastNameAnim = useRef(new Animated.Value(0)).current;
  const passwordAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(1)).current;
  const backgroundAnim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);

  // function to submit account creation
  const submit = async () => {
    if (inputRef.current) {
      inputRef.current.blur(); // Unfocus the TextInput
    }
    setFocusedField("");

    if (!password || !username || !firstName || !lastName) {
      setNotificationMessage("Please ensure all fields are filled!");
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000); // Hide the banner after 3 seconds
    } else {
      const existingToken = checkToken();
      if (existingToken) {
        Alert.alert(
          "Already a user!",
          "It seems you have previously logged in on this device. Would you like to replace the data of your previous account on this device with this new one?",
          [
            {
              text: "Replace",
              onPress: () => {
                Alert.alert(
                  "Almost there!",
                  "Authenticate biometrically to complete the sign up process.",
                  [
                    {
                      text: "Authenticate",
                      onPress: async () => {
                        let status = await handleBiometricLogin();

                        if (status) {
                          try {
                            setSignup("Signing Up...");

                            const response = await signupAPI(
                              username,
                              firstName,
                              lastName,
                              civilId,
                              mobileNumber,
                              password,
                              "BUSINESS_OWNER",
                              "NOT_BANK"
                            );

                            await setToken(response.refreshToken, "refresh");
                            setShowAnimation(true);

                            setTimeout(() => {
                              setShowAnimation(false);
                              navigation.popToTop(); // Move navigation here
                              Alert.alert(
                                "Successfully created Account!",
                                "Please login using your credientals or biometrically."
                              );
                            }, 3000);
                          } catch (error) {
                            setNotificationMessage(
                              "Your civil Id is already registered with."
                            );

                            setNotificationVisible(true);
                            setTimeout(() => {
                              setNotificationVisible(false);
                            }, 3000); // Hide the banner after 3 seconds

                            setSignup("Sign Up");
                            return;
                          }
                        } else {
                          setNotificationMessage(
                            "Failed creating account! Try again."
                          );
                          setNotificationVisible(true);
                          setTimeout(() => {
                            setNotificationVisible(false);
                          }, 3000); // Hide the banner after 3 seconds
                        }
                        setSignup("Sign Up");
                      },
                    },
                    {
                      text: "Cancel",
                      onPress: () => setSignup("Sign Up"),
                      style: "cancel",
                    },
                  ],
                  { cancelable: true } // Allows dismissing the alert by tapping outside
                );
              },
            },
            {
              text: "Cancel",
              onPress: () => {
                setSignup("Sign Up");
                return;
              },

              style: "cancel",
            },
          ]
        );
      } else {
        setNotificationMessage(
          "Failed signing up. Ensure you're connected to internet"
        );
        setNotificationVisible(true);
        setTimeout(() => {
          setNotificationVisible(false);
        }, 3000); // Hide the banner after 3 seconds
      }
    }
    setSignup("Sign Up");
  };

  return (
    <LinearGradient
      colors={["black", "rgb(38, 38, 31)", "black"]} // Gradient colors
      style={styles.gradient} // Full-screen gradient
      start={{ x: 0, y: 0 }} // Gradient starts at the top
      end={{ x: 0, y: 1 }} // Gradient ends at the bottom
    >
      <NotificationBanner
        message={notificationMessage}
        visible={notificationVisible}
      />

      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Almost there!</Text>
          <View style={styles.subtitle}>
            <Text style={{ color: "white" }}>
              Lastly, We'll need the following details for banks
            </Text>
          </View>

          <Animated.View
            style={[
              styles.inputContainer,
              {
                transform: [
                  {
                    scale: usernameAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.05],
                    }),
                  },
                ],
              },
            ]}
          >
            <TextInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              mode="outlined"
              ref={inputRef}
              autoCapitalize="none" // Disable auto-capitalization
              keyboardType="default" // Default keyboard for mixed input
              textContentType="username" // Hints the type of input to autofill services
              left={
                <TextInput.Icon
                  icon="account-circle-outline"
                  color={
                    focusedField === "username"
                      ? "#FFD700"
                      : "rgba(255,255,255,0.2)"
                  }
                />
              }
              style={styles.input}
              textColor="white"
              onFocus={() => {
                setFocusedField("username");
                animateField(usernameAnim, 1);
              }}
              onBlur={() => {
                setFocusedField("");
                animateField(usernameAnim, 0);
              }}
              theme={{ colors: { primary: "#FFD700" } }} // Dark background
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.inputContainer,
              {
                transform: [
                  {
                    scale: firstNameAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.05],
                    }),
                  },
                ],
              },
            ]}
          >
            <TextInput
              label="First Name"
              value={firstName}
              onChangeText={setFirstName}
              mode="outlined"
              ref={inputRef}
              autoCapitalize="words" // Automatically capitalize the first letter of each word
              keyboardType="default" // Standard keyboard
              textContentType="name" // Hint for autofill services
              style={styles.input}
              textColor="white"
              left={
                <TextInput.Icon
                  icon="format-letter-case"
                  color={
                    focusedField === "firstName"
                      ? "#FFD700"
                      : "rgba(255,255,255,0.2)"
                  }
                />
              }
              onFocus={() => {
                setFocusedField("firstName");
                animateField(firstNameAnim, 1);
              }}
              onBlur={() => {
                setFocusedField("");
                animateField(firstNameAnim, 0);
              }}
              theme={{ colors: { primary: "#FFD700" } }} // Dark background
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.inputContainer,
              {
                // scales up and down the field
                transform: [
                  {
                    scale: lastNameAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.05],
                    }),
                  },
                ],
              },
            ]}
          >
            <TextInput
              label="Last Name"
              value={lastName}
              onChangeText={setLastName}
              mode="outlined"
              ref={inputRef}
              left={
                <TextInput.Icon
                  icon="format-letter-ends-with"
                  color={
                    focusedField === "lastName"
                      ? "#FFD700"
                      : "rgba(255,255,255,0.2)"
                  }
                />
              }
              autoCapitalize="words" // Automatically capitalize the first letter of each word
              keyboardType="default" // Standard keyboard
              textContentType="name" // Hint for autofill services
              textColor="white"
              style={[styles.input]}
              onFocus={() => {
                setFocusedField("lastName");
                animateField(lastNameAnim, 1);
              }}
              onBlur={() => {
                setFocusedField("");
                animateField(lastNameAnim, 0);
              }}
              theme={{ colors: { primary: "#FFD700" } }} // Dark background
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.inputContainer,
              {
                transform: [
                  {
                    scale: passwordAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.05],
                    }),
                  },
                ],
              },
            ]}
          >
            {/* Text input Field for password */}
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secureTextEntry}
              mode="outlined"
              ref={inputRef}
              left={
                <TextInput.Icon
                  icon="lock"
                  color={
                    focusedField === "password"
                      ? "#FFD700"
                      : "rgba(255,255,255,0.2)"
                  }
                />
              }
              right={
                <TextInput.Icon
                  icon={secureTextEntry ? "eye" : "eye-off"}
                  color={
                    focusedField === "password"
                      ? "#FFD700"
                      : "rgba(255,255,255,0.2)"
                  }
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                />
              }
              autoCapitalize="none" // Avoid capitalization
              textContentType="password" // Help autofill services recognize it as a password
              textColor="white"
              style={[styles.input]}
              onFocus={() => {
                setFocusedField("password");
                animateField(passwordAnim, 1);
              }}
              onBlur={() => {
                setFocusedField("");
                animateField(passwordAnim, 0);
              }}
              theme={{
                colors: { primary: "#FFD700" },
              }}
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.buttonContainer,
              { transform: [{ scale: buttonAnim }] },
            ]}
          >
            <Button
              mode="contained"
              onPress={submit}
              onPressIn={() => handlePressIn(buttonAnim)}
              onPressOut={() => handlePressOut(buttonAnim)}
              style={styles.button}
              labelStyle={styles.buttonText}
            >
              {signup}
            </Button>
          </Animated.View>
        </View>
      </View>
      {showAnimation && (
        <View style={styles.overlay}>
          <LottieView
            ref={animationRef}
            source={require("../../assets/accountCreation.json")}
            autoPlay
            loop={false}
            style={styles.animation}
          />
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.9)", // Semi-transparent black
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: 350,
    height: 350,
  },
  gradient: {
    flex: 1, // Ensures the gradient covers the entire screen
    width: width,
    height: height,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 20,

    fontSize: 16,
    textAlign: "center",
    flexDirection: "row",
    padding: 10,
    justifyContent: "center", // Center align items horizontally
  },
  link: {
    color: "#FFD700",
    textDecorationLine: "underline",
    textDecorationLine: "underline",
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subheader: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "rgb(8, 8, 8)24)", // Dark background for input
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 5,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },

  login: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 16,
    textDecorationLine: "underline",
  },

  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
});

export default RegisterScreenAdvance;
