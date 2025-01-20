import React, { useState, useEffect, useRef, useContext } from "react";
import { View, StyleSheet, Text, Animated, Alert } from "react-native";
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

const RegisterScreen = () => {
  const navigation = useNavigation();

  // useStates for fields and password visibility
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [civilId, setCivilId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  // Text when clicking on login
  const [signup, setSignup] = useState("Sign Up");

  const theme = useTheme();

  // use state for focused field
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
  const usernameAnim = useRef(new Animated.Value(0)).current;
  const firstNameAnim = useRef(new Animated.Value(0)).current;
  const lastNameAnim = useRef(new Animated.Value(0)).current;
  const civilIdAnim = useRef(new Animated.Value(0)).current;
  const mobileNumberAnim = useRef(new Animated.Value(0)).current;
  const passwordAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(1)).current;
  const backgroundAnim = useRef(new Animated.Value(0)).current;

  // function to submit account creation
  const submit = async () => {
    setSignup("Signing Up...");
    const civilIdNumerics = civilId.replace(/[^0-9]/g, "");
    const mobileNumberNumerics = mobileNumber.replace(/[^0-9]/g, "");

    // Ensure civil id is exactly 12 digits long
    if (civilIdNumerics.length != 12) {
      Alert.alert("Civil Id", "Your Civil Id must be 12 numbers long.");
      setSignup("Sign Up");

      return;
    }

    // Ensure the number entered is exactly 8 numbers long
    if (mobileNumberNumerics.length != 8) {
      Alert.alert(
        "Mobile Number",
        "Your Mobile Number must be 8 numbers long."
      );
      setSignup("Sign Up");
    }
    Alert.alert(
      "Almost there!",
      "Authenticate biometrically to complete the sign up process.",
      [
        {
          text: "Authenticate",
          onPress: async () => {
            const status = await handleBiometricLogin();

            if (status) {
              resetStackUntilTwoScreens();
              Alert.alert(
                "Successfully created Account!",
                "Please login using your credientals or biometrically."
              );
            } else {
              setSignup("Sign Up");
              Alert.alert("Failed creating Account!", "Please try again.");
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
    setSignup("Sign Up");
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
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.subtitle}>
          <Text style={{ color: "white" }}>Sign up below or </Text>
          <Text>
            <TouchableRipple
              onPress={resetStackUntilTwoScreens}
              rippleColor="rgba(0, 0, 0, .32)"
            >
              <Text style={styles.link}>Login with an Existing account</Text>
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
              // scales up and down the field
              transform: [
                {
                  scale: mobileNumberAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.05],
                  }),
                },
              ],
            },
          ]}
        >
          <TextInput
            label="Mobile Number"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            mode="outlined"
            left={
              <TextInput.Icon
                icon="tablet-android"
                color={
                  focusedField === "mobileNumber"
                    ? "#FFD700"
                    : "rgba(255,255,255,0.2)"
                }
              />
            }
            textColor="white"
            style={[styles.input]}
            onFocus={() => {
              setFocusedField("mobileNumber");
              animateField(mobileNumberAnim, 1);
            }}
            onBlur={() => {
              setFocusedField("");
              animateField(mobileNumberAnim, 0);
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
    marginBottom: 20,
    backgroundColor: "rgb(8, 8, 8)24)", // Dark background for input
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
