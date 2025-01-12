import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { TextInput, Button, IconButton, useTheme } from "react-native-paper";
import * as LocalAuthentication from "expo-local-authentication";

import { TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Routes from "../../utils/constants/routes";
import UserContext from "../../context/UserContext";

const LoginScreen = () => {
  const navigation = useNavigation();

  const [civilId, setCivilId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [login, setLogin] = useState("Login");

  const theme = useTheme();
  const [authenticated, setAuthenticated] = useContext(UserContext);

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
      <Text style={[styles.header, { color: theme.colors.primary }]}>
        Welcome back!
      </Text>
      <View
        style={{
          flexDirection: "row",
          padding: 10,
        }}
      >
        <Text>Login below or </Text>
        <Text>
          <TouchableRipple
            onPress={() => navigation.navigate(Routes.Auth.Register)}
            rippleColor="rgba(0, 0, 0, .32)"
          >
            <Text
              style={{
                color: theme.colors.primary,
                textDecorationLine: "underline",
              }}
            >
              create an account
            </Text>
          </TouchableRipple>
        </Text>
      </View>

      {/* Email Input */}
      <TextInput
        label="Civil ID"
        value={civilId}
        onChangeText={setCivilId}
        mode="outlined"
        style={styles.input}
        keyboardType="numeric"
        left={<TextInput.Icon icon="account" />}
      />

      {/* Password Input */}
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        style={styles.input}
        secureTextEntry={!showPassword}
        left={<TextInput.Icon icon="lock" />}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />

      {/* Sign In Button */}
      <Button mode="contained" style={styles.button} onPress={handleLogin}>
        {login}
      </Button>

      {/* Forgot Password Link */}
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
        size={32}
        style={styles.biometric}
        onPress={handleBiometricLogin}
      />
      <Text style={styles.biometricText}>Login with Fingerprint</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subheader: {
    fontSize: 14,
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  forgotPassword: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 16,
    textDecorationLine: "underline",
    color: "#666",
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
