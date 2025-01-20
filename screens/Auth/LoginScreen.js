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

const { width, height } = Dimensions.get("window");

const DiagonalLines = () => {
  const backgroundAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const backgroundAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(backgroundAnim, {
          toValue: 0.7,
          duration: 10000,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundAnim, {
          toValue: 0.1,
          duration: 10000,
          useNativeDriver: true,
        }),
      ])
    );

    backgroundAnimation.start();

    return () => backgroundAnimation.stop();
  }, []);

  const rotate = backgroundAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["45deg", "225deg"],
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        {
          opacity: 0.1,
          transform: [{ rotate }],
        },
      ]}
    >
      {Array.from({ length: 200 }).map((_, i) => (
        <View key={i} style={[styles.diagonalLine, { left: i * 5 - 200 }]} />
      ))}
    </Animated.View>
  );
};

const DiagonalLines2 = () => {
  const backgroundAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const backgroundAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(backgroundAnim, {
          toValue: 0.1,
          duration: 10000,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundAnim, {
          toValue: 0,
          duration: 10000,
          useNativeDriver: true,
        }),
      ])
    );

    backgroundAnimation.start();

    return () => backgroundAnimation.stop();
  }, []);

  const rotate = backgroundAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["4deg", "225deg"],
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        {
          opacity: 0.1,
          transform: [{ rotate }],
        },
      ]}
    >
      {Array.from({ length: 200 }).map((_, i) => (
        <View key={i} style={[styles.diagonalLine, { left: i * 10 - 100 }]} />
      ))}
    </Animated.View>
  );
};

const LoginScreen = () => {
  const navigation = useNavigation();

  const [civilId, setCivilId] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const [login, setLogin] = useState("Login");

  const theme = useTheme();

  const [focusedField, setFocusedField] = useState("");

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
  const backgroundAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const backgroundAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(backgroundAnim, {
          toValue: 1,
          duration: 10000,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundAnim, {
          toValue: 0,
          duration: 10000,
          useNativeDriver: true,
        }),
      ])
    );
    backgroundAnimation.start();
    return () => backgroundAnimation.stop();
  }, []);

  const animateField = (anim, value) => {
    Animated.spring(anim, {
      toValue: value,
      useNativeDriver: true,
      friction: 8,
    }).start();
  };

  const handlePressIn = () => {
    Animated.spring(buttonAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  function handleLogin() {
    setLogin("Logging in");
    try {
    } catch (error) {}
    setLogin("Login");
    console.log("clicked");
  }
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
      setAuthenticated(true);
    } else {
      Alert.alert("Failed", "Biometric authentication failed.");
    }
  };

  return (
    <View style={styles.container}>
      <DiagonalLines />
      <DiagonalLines2 />

      <View style={styles.content}>
        <Text style={styles.title}>Welcome back!</Text>
        <View style={styles.subtitle}>
          <Text style={{ color: "white" }}>Login below or </Text>
          <Text>
            <TouchableRipple
              onPress={() => navigation.navigate(Routes.Auth.Register)}
              rippleColor="rgba(0, 0, 0, .32)"
            >
              <Text style={styles.link}>create an account</Text>
            </TouchableRipple>
          </Text>
        </View>

        <Animated.View
          style={[
            styles.inputContainer,
            {
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
            label="Civil Id"
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
            style={[styles.input]} // Set text color to white
            onFocus={() => {
              setFocusedField("civilId");
              animateField(civilIdAnim, 1);
            }}
            onBlur={() => {
              setFocusedField("");
              animateField(civilIdAnim, 0);
            }}
            theme={{ colors: { primary: "#FFD700", background: "#2d2d2d" } }} // Dark background
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
            style={[styles.input]} // Set text color to white
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
    textAlign: "center",
    marginBottom: 40,
    flexDirection: "row",
    padding: 10,
  },
  link: {
    color: "#FFD700",
    textDecorationLine: "underline",
    textDecorationLine: "underline",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "rgb(24, 24, 24)", // Dark background for input
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
  diagonalLine: {
    position: "absolute",
    width: 1,
    height: height * 2,
    backgroundColor: "#FFD700",
  },
  biometric: {
    alignSelf: "center",
    marginTop: 16,
  },
  biometricText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    color: "#666",
  },
});

export default LoginScreen;
