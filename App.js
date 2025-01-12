import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button, IconButton, useTheme } from "react-native-paper";
import { Provider as PaperProvider } from "react-native-paper";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme();

  function printInfo() {}
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={[styles.header, { color: theme.colors.primary }]}>
          Create an account
        </Text>
        <Text style={styles.subheader}>
          Enter your account details below or{" "}
          <Text style={{ color: theme.colors.primary }}>log in</Text>
        </Text>

        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Date of Birth"
          value={dob}
          onChangeText={setDob}
          mode="outlined"
          style={styles.input}
          placeholder="MM / DD / YYYY"
          right={<TextInput.Icon icon="calendar" />}
        />

        <TextInput
          label="Date of Birth"
          value={dob}
          onChangeText={setDob}
          mode="outlined"
          style={styles.input}
          placeholder="MM / DD / YYYY"
          right={<TextInput.Icon icon="calendar" />}
        />
        <TextInput
          label="Date of Birth"
          value={dob}
          onChangeText={setDob}
          mode="outlined"
          style={styles.input}
          placeholder="MM / DD / YYYY"
          right={<TextInput.Icon icon="calendar" />}
        />
        <TextInput
          label="Date of Birth"
          value={dob}
          onChangeText={setDob}
          mode="outlined"
          style={styles.input}
          placeholder="MM / DD / YYYY"
          right={<TextInput.Icon icon="calendar" />}
        />
        <TextInput
          label="Date of Birth"
          value={dob}
          onChangeText={setDob}
          mode="outlined"
          style={styles.input}
          placeholder="MM / DD / YYYY"
          right={<TextInput.Icon icon="calendar" />}
        />
        <TextInput
          label="Date of Birth"
          value={dob}
          onChangeText={setDob}
          mode="outlined"
          style={styles.input}
          placeholder="MM / DD / YYYY"
          right={<TextInput.Icon icon="calendar" />}
        />

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
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
        />

        <Button mode="contained" style={styles.button} onPress={printInfo}>
          Sign In
        </Button>

        <Text
          style={[styles.login, { color: theme.colors.primary }]}
          onPress={() => {}}
        >
          Login
        </Text>
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

export default CreateAccount;
