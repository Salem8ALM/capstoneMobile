import React, { useRef, useEffect, useContext, useState } from "react";
import { StyleSheet, View, Animated, Alert, Dimensions } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Icons library
import UserContext from "../../context/UserContext";
import {
  handlePressIn,
  handlePressOut,
} from "../../utils/animations/buttonAnimations";
import Routes from "../../utils/constants/routes";
import { animateField } from "../../utils/animations/animations";

const { width, height } = Dimensions.get("window");

const OnboardAddBusiness = () => {
  const navigation = useNavigation();

  const [businessName, setBusinessName] = useState("");
  const [businessLicense, setBusinessLicense] = useState("");

  const theme = useTheme();

  // use state for focused field
  const [focusedField, setFocusedField] = useState("");

  const { authenticated, setAuthenticated } = useContext(UserContext);

  const buttonAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  const pdfUploadAnim = useRef(new Animated.Value(1)).current;
  const scanAnim = useRef(new Animated.Value(1)).current;

  const businessNameAnim = useRef(new Animated.Value(0)).current;
  const businessLicesneAnim = useRef(new Animated.Value(0)).current;

  const checkToken = async () => {
    const token = await getToken("access");
    if (token) setAuthenticated(true);
  };

  useEffect(() => {
    checkToken();
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
                  scale: businessNameAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.05],
                  }),
                },
              ],
            },
          ]}
        >
          <TextInput
            label="Bussiness Name"
            value={businessName}
            onChangeText={setBusinessName}
            mode="outlined"
            keyboardType="default" // Default keyboard for mixed input
            textContentType="username" // Hints the type of input to autofill services
            left={
              <TextInput.Icon
                icon="account-circle-outline"
                color={
                  focusedField === "businessName"
                    ? "#FFD700"
                    : "rgba(255,255,255,0.2)"
                }
              />
            }
            style={styles.input}
            textColor="white"
            onFocus={() => {
              setFocusedField("businessName");
              animateField(businessNameAnim, 1);
            }}
            onBlur={() => {
              setFocusedField("");
              animateField(businessNameAnim, 0);
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
                  scale: businessLicesneAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.05],
                  }),
                },
              ],
            },
          ]}
        >
          <TextInput
            label="Bussiness License"
            value={businessLicense}
            onChangeText={setBusinessLicense}
            mode="outlined"
            keyboardType="default" // Default keyboard for mixed input
            textContentType="username" // Hints the type of input to autofill services
            left={
              <TextInput.Icon
                icon="account-circle-outline"
                color={
                  focusedField === "businessLicense"
                    ? "#FFD700"
                    : "rgba(255,255,255,0.2)"
                }
              />
            }
            style={styles.input}
            textColor="white"
            onFocus={() => {
              setFocusedField("businessLicense");
              animateField(businessLicesneAnim, 1);
            }}
            onBlur={() => {
              setFocusedField("");
              animateField(businessLicesneAnim, 0);
            }}
            theme={{ colors: { primary: "#FFD700" } }} // Dark background
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.buttonContainer,
            { transform: [{ scale: pdfUploadAnim }] },
          ]}
        >
          <Button
            icon={({ color }) => (
              <MaterialCommunityIcons
                name="file-upload"
                size={24}
                color={color}
              />
            )}
            mode="outlined"
            onPressIn={() => handlePressIn(pdfUploadAnim)}
            onPressOut={() => handlePressOut(pdfUploadAnim)}
            style={styles.secondaryButton}
            labelStyle={styles.secondaryButtonText}
            onPress={() => {
              navigation.goBack();
              //   navigation.push();
            }}
          >
            Attach financial Statement
          </Button>
        </Animated.View>
        <Animated.View
          style={[styles.buttonContainer, { transform: [{ scale: scanAnim }] }]}
        >
          <Button
            icon={({ color }) => (
              <MaterialCommunityIcons name="camera" size={24} color={color} />
            )}
            mode="outlined"
            onPressIn={() => handlePressIn(scanAnim)}
            onPressOut={() => handlePressOut(scanAnim)}
            style={styles.secondaryButton}
            labelStyle={styles.secondaryButtonText}
            onPress={() => {
              navigation.goBack();
              //   navigation.push();
            }}
          >
            {" "}
            Scan Financial Statement
          </Button>
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
            // onPress={submit}
            onPressIn={() => handlePressIn(buttonAnim)}
            onPressOut={() => handlePressOut(buttonAnim)}
            style={styles.submit}
            labelStyle={styles.buttonText}
          >
            {"Review"}
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
