import React, { useRef, useEffect, useContext, useState } from "react";
import { StyleSheet, View, Animated, Alert } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Icons library
import * as ImagePicker from "expo-image-picker";
import UserContext from "../../../context/UserContext";
import { animateField } from "../../../utils/animations/animations";

const OnboardAddBusiness = () => {
  const navigation = useNavigation();

  const [businessNickname, setBusinessNickname] = useState("");

  // use state for focused field
  const [focusedField, setFocusedField] = useState("");

  const { authenticated, setAuthenticated, onboarded, setOnboarded } =
    useContext(UserContext);

  const buttonAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  const businessNicknameAnim = useRef(new Animated.Value(0)).current;

  // checking token and whether the user is onboarded
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
        <Text style={styles.title}>Add Your Business</Text>
        <Text style={styles.subtitle}>Please fill in all fields </Text>

        <Animated.View
          style={[
            styles.inputContainer,
            {
              transform: [
                {
                  scale: businessNicknameAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.05],
                  }),
                },
              ],
            },
          ]}
        >
          <TextInput
            label="Bussiness Nickname"
            value={businessNickname}
            onChangeText={setBusinessNickname}
            mode="outlined"
            keyboardType="default" // Default keyboard for mixed input
            textContentType="username" // Hints the type of input to autofill services
            left={
              <TextInput.Icon
                icon="account-circle-outline"
                color={
                  focusedField === "businessNickname"
                    ? "#FFD700"
                    : "rgba(255,255,255,0.2)"
                }
              />
            }
            style={styles.input}
            textColor="white"
            onFocus={() => {
              setFocusedField("businessNickname");
              animateField(businessNicknameAnim, 1);
            }}
            onBlur={() => {
              setFocusedField("");
              animateField(businessNicknameAnim, 0);
            }}
            theme={{ colors: { primary: "#FFD700" } }} // Dark background
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
                name="check-circle"
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
  container2: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  container: {
    flex: 1,

    backgroundColor: "#1a1a1a",
  },
  input: {
    marginBottom: 20,
    backgroundColor: "rgb(8, 8, 8)24)", // Dark background for input
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  submit: {
    backgroundColor: "#FFD700",

    padding: 5,
    borderRadius: 8,

    marginTop: 40,
  },
  iconWrapper: {
    marginBottom: 20,
  },
  icon: {
    marginBottom: 10,
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
  buttonContainer: {
    flexDirection: "rows",
    marginBottom: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FFD700",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  secondaryButton: {
    marginTop: 10,
    borderColor: "#FFD700",
    borderWidth: 2,
    borderRadius: 8,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700",
    paddingVertical: 10,
  },
});

export default OnboardAddBusiness;
