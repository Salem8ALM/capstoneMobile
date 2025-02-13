import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Alert,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
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
import { signupAPI } from "../../api/Auth";
import { setToken, getToken } from "../../storage/TokenStorage";
import { LinearGradient } from "expo-linear-gradient";
import NotificationBanner from "../../utils/animations/NotificationBanner";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";

const { width, height } = Dimensions.get("window");

const RegisterScreenBasic = () => {
  const navigation = useNavigation();

  const [civilId, setCivilId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const theme = useTheme();

  // use state for focused field
  const [focusedField, setFocusedField] = useState("");

  const [notificationVisible, setNotificationVisible] = useState(false); // State to manage banner visibility
  const [notificationMessage, setNotificationMessage] = useState(""); // Message to show in the banner

  // Animation values
  const civilIdAnim = useRef(new Animated.Value(0)).current;
  const mobileNumberAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(1)).current;
  const backgroundAnim = useRef(new Animated.Value(0)).current;

  const avatarAnim = useRef(new Animated.Value(0)).current;
  const [avatar, setAvatar] = useState(null);
  const [avatarIcon, setAvatarIcon] = useState("account");
  const inputRef = useRef(null);

  const [uploadText, setUploadText] = useState("Attach financial Statement"); // Default button text
  const [uploadIcon, setUploadIcon] = useState("file-upload"); // Default button text

  const pressIn = () => {
    Animated.sequence([
      Animated.timing(avatarAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const pressOut = () => {
    Animated.sequence([
      Animated.timing(avatarAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // for both financial statement pdf upload and
  const pickFile = async (setSelected) => {
    setFocusedField("");
    if (inputRef.current) {
      inputRef.current.blur(); // Unfocus the TextInput
    }

    try {
      // Request permission to access the media library
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        setNotificationMessage(
          "You need to allow access to appp to pick files"
        );
        setNotificationVisible(true);
        setTimeout(() => {
          setNotificationVisible(false);
        }, 3000); // Hide the banner after 3 seconds

        return;
      }

      // Launch the image picker
      let result = await ImagePicker.launchImageLibraryAsync({
        // mediaTypes: ImagePicker.mediaTypes, // Specify media type
        allowsEditing: true,
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        // Extract the file name from the URI
        const selectedAsset = result.assets[0];

        // Update state
        setSelected(selectedAsset.uri);
      }
    } catch (error) {
      setNotificationMessage("Something went wrong while picking the file");
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000); // Hide the banner after 3 seconds
    }
  };

  const submit = () => {
    if (!civilId || !mobileNumber) {
      setNotificationMessage("Please ensure both fields are filled!");
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000); // Hide the banner after 3 seconds
    } else {
      if (civilId.length != 12) {
        setNotificationMessage("Your Civil Id must be 12 numbers long!");
        setNotificationVisible(true);
        setTimeout(() => {
          setNotificationVisible(false);
        }, 3000); // Hide the banner after 3 seconds
      } else {
        if (mobileNumber.length != 8) {
          setNotificationMessage("Your phone number must be 6 digits long!");
          setNotificationVisible(true);
          setTimeout(() => {
            setNotificationVisible(false);
          }, 3000); // Hide the banner after 3 seconds
        } else {
          navigation.navigate(Routes.Auth.RegisterAdvance);
        }
      }
    }
  };
  return (
    <LinearGradient
      colors={["black", "rgb(31, 31, 22)", "black"]} // Gradient colors
      style={styles.gradient} // Full-screen gradient
      start={{ x: 0, y: 0 }} // Gradient starts at the top
      end={{ x: 0, y: 1 }} // Gradient ends at the bottom
    >
      <NotificationBanner
        message={notificationMessage}
        visible={notificationVisible}
      />

      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Sign Up</Text>
          <View style={styles.subtitle}>
            <Text style={{ color: "white" }}>Sign up below or </Text>
            <Text>
              <TouchableRipple
                onPress={() => navigation.pop()}
                rippleColor="rgba(255, 238, 0, 0.51)"
              >
                <Text style={styles.link}>Login with an Existing account</Text>
              </TouchableRipple>
            </Text>
          </View>

          <Animated.View
            style={[
              styles.avatarContainer,
              {
                transform: [
                  {
                    scale: avatarAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.1],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity
              onPressIn={pressIn} // Call the handle function when the press starts
              onPressOut={pressOut} // Call the handle function when the press ends
              onPress={() => pickFile(setAvatar)}
              style={styles.avatarButton}
            >
              {avatar ? (
                <Image source={{ uri: avatar }} style={styles.avatarImage} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <MaterialCommunityIcons
                    name={avatarIcon}
                    size={40}
                    color="#FFD700"
                  />
                </View>
              )}
            </TouchableOpacity>
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
              maxLength={12}
              inputMode="numeric"
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
                  icon="phone"
                  color={
                    focusedField === "mobileNumber"
                      ? "#FFD700"
                      : "rgba(255,255,255,0.2)"
                  }
                />
              }
              right={<TextInput.Affix text="+965" />}
              maxLength={8}
              inputMode="numeric"
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
              styles.buttonContainer,
              { transform: [{ scale: buttonAnim }] },
            ]}
          >
            <Button
              mode="contained"
              onPress={submit}
              icon={({ color }) => (
                <MaterialCommunityIcons
                  name="page-next"
                  size={24}
                  color={color}
                />
              )}
              onPressIn={() => handlePressIn(buttonAnim)}
              onPressOut={() => handlePressOut(buttonAnim)}
              style={styles.button}
              labelStyle={styles.buttonText}
            >
              Next
            </Button>
          </Animated.View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  gradient: {
    flex: 1, // Ensures the gradient covers the entire screen
    width: width,
    height: height,
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
    marginTop: 20,
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
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarPlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 215, 0, 0.1)",
  },
  avatarText: {
    marginTop: 10,
    color: "#FFD700",
    fontSize: 16,
  },
});

export default RegisterScreenBasic;
