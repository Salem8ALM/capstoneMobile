import React, { useState, useRef, useEffect, useContext } from "react";
import { StyleSheet, View, Animated, Alert, Dimensions, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { IconButton, Text } from "react-native-paper";

import {
  TouchableRipple,
  TextInput,
  Button,
  useTheme,
} from "react-native-paper";

import { useNavigation } from "@react-navigation/native";
import Routes from "../../utils/constants/routes";
import UserContext from "../../context/UserContext";
import {
  handlePressIn,
  handlePressOut,
} from "../../utils/animations/buttonAnimations";
import { animateField } from "../../utils/animations/animations";
import { handleBiometricLogin } from "./auth-utils/handleBiometricLogin";
import { loginAPI, refreshTokenAPI } from "../../api/Auth";
import { setToken, getToken } from "../../storage/TokenStorage";
import { LinearGradient } from "expo-linear-gradient";
import MissingFieldPopup from "../../components/MissingFieldPopup"

const LoginScreen = () => {
  const navigation = useNavigation();

  // useStates for fields and password visibility
  const [civilId, setCivilId] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  // Text when clicking on login
  const [login, setLogin] = useState("Login");

  const theme = useTheme();

  // use state for focused field
  const [focusedField, setFocusedField] = useState("");

  // Used to change from AuthNavigator to AppNavigator after authenticatino
  const { authenticated, setAuthenticated, onboarded, setOnboarded } =
    useContext(UserContext);

  const [data, setData] = useState(null);

  // Animation values
  const civilIdAnim = useRef(new Animated.Value(0)).current;
  const passwordAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(1)).current;

  // Add these state declarations after other useState declarations
  const [notification, setNotification] = useState("")
  const [showNotification, setShowNotification] = useState(false)

  // check if token exists
  const checkToken = async () => {
    const token = await getToken("access");
    if (token) setAuthenticated(true);
  };
  useEffect(() => {
    checkToken();
  });

  // logic when "login" button is pressed
  const handleLogin = async () => {
    setLogin("Logging in");

    if (!civilId || !password) {
      setShowNotification(false)
      setTimeout(() => {
        setNotification("Please enter both your civil ID and password")
        setShowNotification(true)
      }, 100)
      setLogin("Login")
      return
    }

    try {
      const response = await loginAPI(civilId, password);
      setData(response); // Save the response data

      // Set new tokens
      await setToken(response.accessToken, "access");
      await setToken(response.refreshToken, "refresh");
    } catch (error) {
      setShowNotification(false)
      setTimeout(() => {
        setNotification("Incorrect credentials!")
        setShowNotification(true)
      }, 100)
    } finally {
      setLogin("Login");
    }
  };

  // biometric login
  const authenticate = async () => {
    // call function to check authentication

    const refreshToken = await getToken("refresh");

    try {
      if (refreshToken) {
        const status = await handleBiometricLogin();

        if (status) {
          // over here is where the refresh token will be used to obtain a new access token to login with
          // For now, "setAuthenticated" is turned true to hide "AuthNaviagtor" component without actually
          // retrieving any actual user information from backend

          const response = await refreshTokenAPI(refreshToken);

          await setToken(response.accessToken, "access");
          await setToken(response.refreshToken, "refresh");

          checkToken();
          // Alert.alert("Success", "Logged in successfully!");
        }
      } else {
        Alert.alert(
          "Biometric data not found.",
          "Login in at least once to have data stored"
        );
      }
    } catch (error) {
      Alert.alert(
        "Biometric data not found.",
        "Login in at least once to have data stored"
      );
    }
  };

  // temporary hack to ensure no duplicate screens are piled
  const resetStackUntilTwoScreens = () => {
    // Temprorary hack for navigating from LoginScreen to RegisterScreen WITH SLIDING ANIMATION in place.
    // For some reason, react navigation does not have animation for pop() function
    // Therefore, I am using push() function to get that transition but also resetting the stack to avoid creating duplicates of the
    // login and register screens. I am printing here the number of stacked screens to confirm its only two at the moment; login and register screens
    // Again, this is a hack, not ideal in any way
    // if you use pop()/goBack() with the 'presentation' defined as follows AuthNavigator:
    //
    // name={Routes.Auth.Register}
    // component={RegisterScreen}
    // options={{
    //   headerShown: false,
    //   presentation: transparentModal
    // }}
    // documentaion: https://reactnavigation.org/docs/stack-navigator/?config=dynamic#transparent-modals

    // It would be removed instantly with no animation...very ugly
    // If you don't include presentation and just use pop/goBack you will see white background during transition....Even uglier

    let screenName = Routes.Auth.Register;
    const navigationState = navigation.getState();
    let routes = navigationState.routes;

    console.log("Number of screens in the stack:", routes.length);

    // Filter out duplicates by ensuring only one instance of each screen name
    const uniqueRoutes = routes.filter(
      (route, index, self) =>
        index === self.findIndex((r) => r.name === route.name)
    );

    // If the screen is already in the unique routes, we need to handle it
    const isScreenInStack = uniqueRoutes.some(
      (route) => route.name === screenName
    );

    if (!isScreenInStack) {
      // If the screen is not in the stack, push it to the stack with animation
      navigation.push(screenName);
    } else {
      // If the screen is already in the stack, remove the duplicate and push it
      // Filter out the duplicate screen from the stack
      const filteredRoutes = routes.filter(
        (route) => route.name !== screenName
      );

      // Push the screen to the top of the stack
      navigation.reset({
        index: filteredRoutes.length, // Keep the first screen at the top
        routes: [...filteredRoutes, { name: screenName }],
      });
    }
  };

  return (
    <LinearGradient
      colors={["black", "rgba(14, 16, 12, 0.95)", "black"]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <MissingFieldPopup message={notification} visible={showNotification} />
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <Text style={styles.title}>Welcome back!</Text>
            <View style={styles.subtitle}>
              <Text style={{ color: "white" }}>Login below or </Text>
              <Text>
                <TouchableRipple
                  onPress={resetStackUntilTwoScreens}
                  rippleColor="rgba(255, 238, 0, 0.51)"
                >
                  <Text style={styles.link}>create an account</Text>
                </TouchableRipple>
              </Text>
            </View>
            {/* Animation for civil Id field when it becomes focused */}
            <Animated.View
              style={[
                styles.inputContainer,
                {
                  // scales up and down the field
                  transform: [
                    {
                      scale: civilIdAnim.interpolate({
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
                        focusedField === "civilId"
                          ? "#FFD700"
                          : "rgba(255,255,255,0.3)",
                    }}
                  >
                    Civil ID
                  </Text>
                }
                value={civilId}
                onChangeText={setCivilId}
                mode="outlined"
                left={
                  <TextInput.Icon
                    icon="account"
                    color={
                      focusedField === "civilId"
                        ? "#FFD700"
                        : "rgba(255,255,255,0.3)"
                    }
                  />
                }
                textColor="white"
                maxLength={12}
                inputMode="numeric"
                style={[styles.input]}
                onFocus={() => {
                  setFocusedField("civilId");
                  animateField(civilIdAnim, 1);
                }}
                onBlur={() => {
                  setFocusedField("");
                  animateField(civilIdAnim, 0);
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
                label={
                  <Text
                    style={{
                      color:
                        focusedField === "password"
                          ? "#FFD700"
                          : "rgba(255,255,255,0.3)",
                    }}
                  >
                    Password
                  </Text>
                }
                value={password}
                onChangeText={setPassword}
                secureTextEntry={secureTextEntry}
                mode="outlined"
                left={
                  <TextInput.Icon
                    icon="lock"
                    color={
                      focusedField === "password"
                        ? "#FFD700"
                        : "rgba(255,255,255,0.3)"
                    }
                  />
                }
                right={
                  <TextInput.Icon
                    icon={secureTextEntry ? "eye" : "eye-off"}
                    color={
                      focusedField === "password"
                        ? "#FFD700"
                        : "rgba(255,255,255,0.3)"
                    }
                    onPress={() => setSecureTextEntry(!secureTextEntry)}
                  />
                }
                textColor="white"
                autoCapitalize="none" // Disable auto-capitalization
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
                onPress={handleLogin}
                onPressIn={() => handlePressIn(buttonAnim)}
                onPressOut={() => handlePressOut(buttonAnim)}
                style={styles.button}
                labelStyle={styles.buttonText}
              >
                {login}
              </Button>
            </Animated.View>
            {/* This is only for astetics, lets not waste time on building the
          functionality */}
            <Text
              style={styles.forgotPassword}
              onPress={() => {
                Alert.alert("Forgot Password", "Forgot password link pressed");
              }}
            >
              Forgot Password
            </Text>
            {/* Biometric Login Button */}
            <IconButton
              icon="fingerprint"
              size={70}
              style={styles.biometric}
              onPress={authenticate}
              iconColor="gray" // Set the icon color to white
            />
            <Text style={styles.biometricText}>Login with Fingerprint</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1, // Ensures the gradient covers the entire screen
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
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
    fontSize: 16,
    marginBottom: 20,
    flexDirection: "row",
    padding: 10,
    justifyContent: "center", // Center align items horizontally
  },
  link: {
    color: "#FFD700",
    textDecorationLine: "underline",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "rgb(8, 8, 8)24)", // Dark background for input
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 5,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  forgotPassword: {
    color: "#FFD700",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  biometric: {
    alignSelf: "center",
    marginTop: 40,
  },
  biometricText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    color: "gray",
  },
});

export default LoginScreen;
