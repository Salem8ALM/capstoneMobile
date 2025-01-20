import React, { useState, useRef, useEffect, useContext } from "react";
import { StyleSheet, View, Animated, Dimensions, Alert } from "react-native";
import { IconButton, Text } from "react-native-paper";

import {
  TouchableRipple,
  TextInput,
  Button,
  useTheme,
} from "react-native-paper";

import { useNavigation } from "@react-navigation/native";
import * as LocalAuthentication from "expo-local-authentication";
import Routes from "../../utils/constants/routes";
import UserContext from "../../context/UserContext";

const LoginScreen = () => {
  const navigation = useNavigation();

  // useStates for fields and password visibility
  const [civilId, setCivilId] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  // Text when clicking on login
  const [login, setLogin] = useState("Login");

  const theme = useTheme();

  // animation when field is focused
  const [focusedField, setFocusedField] = useState("");

  // Used to change from AuthNavigator to AppNavigator after authenticatino
  const [authenticated, setAuthenticated] = useContext(UserContext);

  const checkToken = async () => {
    // check if the token exists
    const token = await getToken();
    // exists ? setAuth to true : null
    if (token) setAuthenticated(true);
  };
  useEffect(() => {
    checkToken();
  });

  // Animation values
  const civilIdAnim = useRef(new Animated.Value(0)).current;
  const passwordAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(1)).current;

  const animateField = (anim, value) => {
    Animated.spring(anim, {
      toValue: value,
      useNativeDriver: true,
      friction: 4,
      tension: 10,
    }).start();
  };

  // Press hold
  const handlePressIn = () => {
    Animated.spring(buttonAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  // Press let go
  const handlePressOut = () => {
    Animated.spring(buttonAnim, {
      toValue: 1,
      friction: 3, // Make the animation a bit bouncy
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  // logic when "login" button is pressed
  function handleLogin() {
    console.log("clicked");
    setLogin("Logging in");
    try {
      // logic for fetching
    } catch (error) {}

    // this is currently not visible since nothing is fetched, but this should be here
    setLogin("Login");
  }

  // biometric login
  const handleBiometricLogin = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      Alert.alert(
        "Error",
        "Your device does not support biometric authentication."
      );
      return;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      Alert.alert(
        "Error",
        "No biometric credentials found. Please set up biometrics."
      );
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login with Biometrics",
    });

    if (result.success) {
      Alert.alert("Success", "Logged in successfully!");

      // over here is where the refresh token will be used to obtain a new access token to login with
      // For now, "setAuthenticated" is turned true to hide "AuthNaviagtor" component without actually
      // retrieving any actual user information from backend
      setAuthenticated(true);
    } else {
      Alert.alert("Failed", "Biometric authentication failed.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome back!</Text>
        <View style={styles.subtitle}>
          <Text style={{ color: "white" }}>Login below or </Text>
          <Text>
            <TouchableRipple
              onPress={() => {
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
              }}
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
            label="Civil ID"
            value={civilId}
            onChangeText={setCivilId}
            mode="outlined"
            left={
              <TextInput.Icon
                icon="account"
                color={
                  focusedField === "civilId"
                    ? "#FFD700"
                    : "rgba(255,255,255,0.2)"
                }
              />
            }
            textColor="white"
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
            label="Password"
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
            onPress={handleLogin}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            {login}
          </Button>
        </Animated.View>
        This is only for astetics, lets not waste time on building the functionality 
        <Text
          style={styles.forgotPassword}
          onPress={() =>
            Alert.alert("Forgot Password", "Forgot password link pressed")
          }
        >
          Forgot Password
        </Text>
        {/* Biometric Login Button */}
        <IconButton
          icon="fingerprint"
          size={70}
          style={styles.biometric}
          onPress={handleBiometricLogin}
          iconColor="gray" // Set the icon color to white
        />
        <Text style={styles.biometricText}>Login with Fingerprint</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
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
    backgroundColor: "rgba(0, 0, 0, 0.86)24)", // Dark background for input
    color: "#fff", // Set text color to white
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
