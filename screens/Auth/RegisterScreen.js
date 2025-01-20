import React, { useState, useEffect, useRef } from "react";
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
import { useNavigation, CommonActions } from "@react-navigation/native";
import Routes from "../../utils/constants/routes";
import { StackActions, NavigationActions } from "@react-navigation/native";
import { InteractionManager } from "react-native";

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

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [civilId, setCivilId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [focusedField, setFocusedField] = useState("");

  const [signup, setSignup] = useState("Sign Up");

  const theme = useTheme();

  const checkToken = async () => {
    // check if the token exists
    const token = await getToken();
    // exists ? setAuth to true : null
    if (token) setAuthenticated(true);
  };
  useEffect(() => {
    checkToken();
  });

  const usernameAnim = useRef(new Animated.Value(0)).current;
  const firstNameAnim = useRef(new Animated.Value(0)).current;
  const lastNameAnim = useRef(new Animated.Value(0)).current;
  const civilIdAnim = useRef(new Animated.Value(0)).current;
  const mobileNumberAnim = useRef(new Animated.Value(0)).current;
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

  function submit() {
    setSignup("Signing Up...");
    const civilIdNumerics = civilId.replace(/[^0-9]/g, "");
    const mobileNumberNumerics = mobileNumber.replace(/[^0-9]/g, "");

    if (civilIdNumerics.length != 12) {
      Alert.alert("Civil Id", "Your Civil Id must be 12 numbers long.");
      setSignup("Sign Up");

      return;
    }

    if (mobileNumberNumerics.length != 8) {
      Alert.alert(
        "Mobile Number",
        "Your Mobile Number must be 8 numbers long."
      );
      setSignup("Sign Up");

      //Login with information
      return;
    }
  }

  const resetStackUntilTwoScreens = () => {
    // navigation.goBack();
    // navigation.setOptions({
    //   animation: "slide_from_left", // Set the animation for the pop action
    // });

    let screenName = Routes.Auth.Login;
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
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome back!</Text>
        <View style={styles.subtitle}>
          <Text style={{ color: "white" }}>Login below or </Text>
          <Text>
            <TouchableRipple
              onPress={() => {
                resetStackUntilTwoScreens();
              }}
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
            style={styles.input}
            textColor="white"
            left={
              <TextInput.Icon
                icon="account-circle-outline"
                color={
                  focusedField === "civilId"
                    ? "#FFD700"
                    : "rgba(255,255,255,0.2)"
                }
              />
            }
            onFocus={() => {
              setFocusedField("civilId");
              animateField(usernameAnim, 1);
            }}
            onBlur={() => {
              setFocusedField("");
              animateField(usernameAnim, 0);
            }}
            theme={{ colors: { primary: "#FFD700", background: "#2d2d2d" } }} // Dark background
          />
        </Animated.View>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
    flexDirection: "row",
    padding: 10,
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
    backgroundColor: "rgb(24, 24, 24)", // Dark background for input
    color: "#fff", // Set text color to white
    margin: 10,
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

  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
});

export default RegisterScreen;
