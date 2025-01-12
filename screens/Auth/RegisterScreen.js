import React, { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import { Provider as PaperProvider } from "react-native-paper";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [civilId, setCivilId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [signup, setSignup] = useState("Sign Up");

  const theme = useTheme();

  function submit() {
    setSignup("Signing Up...");
    const civilIdNumerics = civilId.replace(/[^0-9]/g, "");
    const mobileNumberNumerics = mobileNumber.replace(/[^0-9]/g, "");

    if (civilIdNumerics.length != 12) {
      Alert.alert("Civil Id", "Your Civil Id must be 12 numbers long.");
      return;
    }

    if (mobileNumberNumerics.length != 8) {
      Alert.alert(
        "Mobile Number",
        "Your Mobile Number must be 8 numbers long."
      );

      //Login with information
      return;
    }
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={[styles.header, { color: theme.colors.primary }]}>
          Create an account
        </Text>
        <Text style={styles.subheader}>Enter your account details below</Text>

        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          mode="outlined"
          style={styles.input}
          left={<TextInput.Icon icon="account-circle-outline" />}
        />

        <TextInput
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          mode="outlined"
          style={styles.input}
          left={<TextInput.Icon icon="format-letter-case" />}
        />

        <TextInput
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
          mode="outlined"
          style={styles.input}
          left={<TextInput.Icon icon="format-letter-ends-with" />}
        />

        <TextInput
          label="Civil ID"
          value={civilId}
          onChangeText={setCivilId}
          mode="outlined"
          style={styles.input}
          keyboardType="numeric"
          left={<TextInput.Icon icon="account" />}
        />

        <TextInput
          label="Mobile Number"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          mode="outlined"
          style={styles.input}
          keyboardType="numeric"
          left={<TextInput.Icon icon="tablet-android" />}
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          style={styles.input}
          secureTextEntry={!showPassword}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          left={<TextInput.Icon icon="lock" />}
        />

        <Button mode="contained" style={styles.button} onPress={submit}>
          {signup}
        </Button>
      </View>
    </PaperProvider>
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
    textAlign: "center",
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
  login: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 16,
    textDecorationLine: "underline",
  },
});

export default RegisterScreen;
