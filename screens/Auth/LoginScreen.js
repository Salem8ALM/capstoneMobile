import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Animated, Dimensions } from "react-native";
import { TextInput, Button, Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

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

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const theme = useTheme();

  const [focusedField, setFocusedField] = useState("");

  // Animation values
  const emailAnim = useRef(new Animated.Value(0)).current;
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

  return (
    <View style={styles.container}>
      <DiagonalLines />
      <DiagonalLines2 />

      <View style={styles.content}>
        <Text style={styles.title}>Welcome back!</Text>
        <Text style={styles.subtitle}>
          Login below or{" "}
          <Text style={styles.link} onPress={() => {}}>
            create an account
          </Text>
        </Text>

        <Animated.View
          style={[
            styles.inputContainer,
            {
              transform: [
                {
                  scale: emailAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.05],
                  }),
                },
              ],
            },
          ]}
        >
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            left={
              <TextInput.Icon
                icon="email"
                color={
                  focusedField === "email" ? "#FFD700" : "rgba(255,255,255,0.2)"
                }
              />
            }
            textColor="white"
            style={[styles.input]} // Set text color to white
            onFocus={() => {
              setFocusedField("email");
              animateField(emailAnim, 1);
            }}
            onBlur={() => {
              setFocusedField("");
              animateField(emailAnim, 0);
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
            onPress={() => {}}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            Sign In
          </Button>
        </Animated.View>

        <Text style={styles.forgotPassword} onPress={() => {}}>
          Forgot Password
        </Text>
      </View>
    </View>
  );
}

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
    color: "#fff",
    textAlign: "center",
    marginBottom: 40,
  },
  link: {
    color: "#FFD700",
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
});
