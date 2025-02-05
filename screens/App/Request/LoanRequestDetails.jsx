import React, { useRef, useEffect, useContext, useState } from "react";
import { StyleSheet, View, Animated, Alert } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Icons library
import * as ImagePicker from "expo-image-picker";
import UserContext from "../../../context/UserContext";
import { animateField } from "../../../utils/animations/animations";

const OnboardAddLoan = () => {
  const navigation = useNavigation();

  const [loanTitle, setLoanTitle] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");

  // use state for focused field
  const [focusedField, setFocusedField] = useState("");

  const { authenticated, setAuthenticated, onboarded, setOnboarded } =
    useContext(UserContext);

  const buttonAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  const loanTitleAnim = useRef(new Animated.Value(0)).current;
  const loanPurposeAnim = useRef(new Animated.Value(0)).current;

  const checkUserState = async () => {
    const token = await checkToken();
    await checkBusinessEntity(token);
  };

  const checkToken = async () => {
    const token = await getToken("access");
    console.log("Inside check token " + token);

    if (token) {
      setAuthenticated(true);

      return token;
    } else {
      Alert.alert("Please log in again", "The session has timed out");
    }
  };

  const checkBusinessEntity = async (token) => {
    console.log(token);
    try {
      await getCompanyAPI(token);
      setOnboarded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = async () => {
    console.log("next hit");
  };

  useEffect(() => {
    checkUserState();
    // Start bouncing animation when the component mounts
    Animated.loop(
      Animated.sequence([
        Animated.spring(bounceAnim, {
          toValue: 1,
          tension: 150,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.spring(bounceAnim, {
          toValue: 0,
          friction: 3,
          tension: 150,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Step 1/5: Loan Details</Text>
        <Text style={styles.subtitle}>
          Let's start by giving your loan a short nickname for your convenience
          and a short description to convince the banker why you need it.
        </Text>

        <Animated.View
          style={[
            styles.inputContainer,
            {
              transform: [
                {
                  scale: loanTitleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.05],
                  }),
                },
              ],
            },
          ]}
        >
          <TextInput
            label="Loan Title"
            value={loanTitle}
            onChangeText={setLoanTitle}
            mode="outlined"
            keyboardType="default"
            textContentType="none"
            left={
              <TextInput.Icon
                icon="bookmark-outline"
                color={
                  focusedField === "loanTitle"
                    ? "#FFD700"
                    : "rgba(255,255,255,0.2)"
                }
              />
            }
            style={styles.input}
            textColor="white"
            onFocus={() => {
              setFocusedField("loanTitle");
              animateField(loanTitleAnim, 1);
            }}
            onBlur={() => {
              setFocusedField("");
              animateField(loanTitleAnim, 0);
            }}
            theme={{ colors: { primary: "#FFD700" } }}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.inputContainer,
            {
              transform: [
                {
                  scale: loanPurposeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.05],
                  }),
                },
              ],
            },
          ]}
        >
          <TextInput
            label="Loan Purpose"
            value={loanPurpose}
            onChangeText={setLoanPurpose}
            mode="outlined"
            keyboardType="default"
            textContentType="none"
            left={
              <TextInput.Icon
                icon="note-outline"
                color={
                  focusedField === "loanPurpose"
                    ? "#FFD700"
                    : "rgba(255,255,255,0.2)"
                }
              />
            }
            style={styles.input}
            textColor="white"
            onFocus={() => {
              setFocusedField("loanPurpose");
              animateField(loanPurposeAnim, 1);
            }}
            onBlur={() => {
              setFocusedField("");
              animateField(loanPurposeAnim, 0);
            }}
            theme={{ colors: { primary: "#FFD700" } }}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.buttonContainer,
            { transform: [{ scale: buttonAnim }] },
          ]}
        >
          <Button
            icon={({ color }) => (
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={color}
              />
            )}
            mode="contained"
            onPressIn={() => handlePressIn(buttonAnim)}
            onPressOut={() => handlePressOut(buttonAnim)}
            style={styles.submit}
            labelStyle={styles.buttonText}
            onPress={handleNext}
          >
            Next
          </Button>
        </Animated.View>
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 20,
    backgroundColor: "rgb(8, 8, 8)",
  },
  inputContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  submit: {
    backgroundColor: "#FFD700",
    padding: 5,
    borderRadius: 8,
    marginTop: 40,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default OnboardAddLoan;
