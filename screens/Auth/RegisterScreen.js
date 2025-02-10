"use client"

import { useState, useEffect, useRef, useContext } from "react"
import { View, StyleSheet, Text, Animated, Alert, Dimensions } from "react-native"
import { TextInput, Button, useTheme, TouchableRipple } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import Routes from "../../utils/constants/routes"
import UserContext from "../../context/UserContext"
import { animateField } from "../../utils/animations/animations"
import { handleBiometricLogin } from "./auth-utils/handleBiometricLogin"
import { handlePressIn, handlePressOut } from "../../utils/animations/buttonAnimations"
import { signupAPI } from "../../api/Auth"
import { setToken, getToken } from "../../storage/TokenStorage"
import { LinearGradient } from "expo-linear-gradient"
import MissingFieldPopup from "../../components/MissingFieldPopup"
import { SafeAreaView } from "react-native-safe-area-context"

const RegisterScreen = () => {
  const navigation = useNavigation()

  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [civilId, setCivilId] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const [signup, setSignup] = useState("Sign Up")

  const theme = useTheme()

  const [focusedField, setFocusedField] = useState("")

  const { authenticated, setAuthenticated, onboarded, setOnboarded } = useContext(UserContext)

  const [notification, setNotification] = useState("")
  const [showNotification, setShowNotification] = useState(false)

  const checkToken = async () => {
    const token = await getToken("access")
    if (token) setAuthenticated(true)
  }
  useEffect(() => {
    checkToken()
  }, [setAuthenticated]) // Added setAuthenticated to dependencies

  const usernameAnim = useRef(new Animated.Value(0)).current
  const firstNameAnim = useRef(new Animated.Value(0)).current
  const lastNameAnim = useRef(new Animated.Value(0)).current
  const civilIdAnim = useRef(new Animated.Value(0)).current
  const mobileNumberAnim = useRef(new Animated.Value(0)).current
  const passwordAnim = useRef(new Animated.Value(0)).current
  const buttonAnim = useRef(new Animated.Value(1)).current

  const submit = async () => {
    setSignup("Signing Up...")

    if (!username || !firstName || !lastName || !civilId || !mobileNumber || !password) {
      setShowNotification(false)
      setTimeout(() => {
        setNotification("Please fill in all required fields")
        setShowNotification(true)
      }, 100)
      setSignup("Sign Up")
      return
    }

    const civilIdNumerics = civilId.replace(/[^0-9]/g, "")
    const mobileNumberNumerics = mobileNumber.replace(/[^0-9]/g, "")

    if (civilIdNumerics.length !== 12) {
      setNotification("Civil ID must be exactly 12 digits")
      setShowNotification(true)
      setSignup("Sign Up")
      return
    }

    if (mobileNumberNumerics.length !== 8) {
      setNotification("Mobile number must be exactly 8 digits")
      setShowNotification(true)
      setSignup("Sign Up")
      return
    }

    const existingToken = await checkToken()
    if (existingToken) {
      Alert.alert(
        "Already a user!",
        "It seems you have previously logged in on this device. Would you like to replace the data of your previous account on this device with this new one?",
        [
          {
            text: "Replace",
            onPress: () => {
              Alert.alert(
                "Almost there!",
                "Authenticate biometrically to complete the sign up process.",
                [
                  {
                    text: "Authenticate",
                    onPress: async () => {
                      const status = await handleBiometricLogin()

                      if (status) {
                        resetStackUntilTwoScreens()

                        try {
                          const response = await signupAPI(
                            username,
                            firstName,
                            lastName,
                            civilId,
                            mobileNumber,
                            password,
                            "BUSINESS_OWNER",
                            "NOT_BANK",
                          )

                          await setToken(response.refreshToken, "refresh")
                        } catch (error) {
                          Alert.alert(
                            "Failed Signup",
                            "A user is already registered with your civil ID. Please login with your credentials!",
                          )
                          setSignup("Sign Up")
                          return
                        } finally {
                          setSignup("Sign Up")
                        }

                        Alert.alert(
                          "Successfully created Account!",
                          "Please login using your credentials or biometrically.",
                        )
                      } else {
                        Alert.alert("Failed creating Account!", "Please try again.")
                      }
                      setSignup("Sign Up")
                    },
                  },
                  {
                    text: "Cancel",
                    onPress: () => setSignup("Sign Up"),
                    style: "cancel",
                  },
                ],
                { cancelable: true },
              )
            },
          },
          {
            text: "Cancel",
            onPress: () => {
              setSignup("Sign Up")
              return
            },
            style: "cancel",
          },
        ],
      )
    }
  }

  const resetStackUntilTwoScreens = () => {
    const screenName = Routes.Auth.Login
    const navigationState = navigation.getState()
    const routes = navigationState.routes

    console.log("Number of screens in the stack:", routes.length)

    const uniqueRoutes = routes.filter((route, index, self) => index === self.findIndex((r) => r.name === route.name))

    const isScreenInStack = uniqueRoutes.some((route) => route.name === screenName)

    if (!isScreenInStack) {
      navigation.push(screenName)
    } else {
      const filteredRoutes = routes.filter((route) => route.name !== screenName)

      navigation.reset({
        index: filteredRoutes.length,
        routes: [...filteredRoutes, { name: screenName }],
      })
    }
  }

  return (
    <LinearGradient
      colors={["black", "rgba(14, 16, 12, 0.95)", "black"]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.container}>
        <MissingFieldPopup message={notification} visible={showNotification} />
        <View style={styles.content}>
          <Text style={styles.title}>Sign Up</Text>
          <View style={styles.subtitle}>
            <Text style={{ color: "white" }}>Sign up below or </Text>
            <TouchableRipple onPress={resetStackUntilTwoScreens} rippleColor="rgba(255, 238, 0, 0.51)">
              <Text style={styles.link}>Login with an Existing account</Text>
            </TouchableRipple>
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
              autoCapitalize="none"
              keyboardType="default"
              textContentType="username"
              left={
                <TextInput.Icon
                  icon="account-circle-outline"
                  color={focusedField === "username" ? "#FFD700" : "rgba(255,255,255,0.2)"}
                />
              }
              style={styles.input}
              textColor="white"
              onFocus={() => {
                setFocusedField("username")
                animateField(usernameAnim, 1)
              }}
              onBlur={() => {
                setFocusedField("")
                animateField(usernameAnim, 0)
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
              autoCapitalize="words"
              keyboardType="default"
              textContentType="name"
              style={styles.input}
              textColor="white"
              left={
                <TextInput.Icon
                  icon="format-letter-case"
                  color={focusedField === "firstName" ? "#FFD700" : "rgba(255,255,255,0.2)"}
                />
              }
              onFocus={() => {
                setFocusedField("firstName")
                animateField(firstNameAnim, 1)
              }}
              onBlur={() => {
                setFocusedField("")
                animateField(firstNameAnim, 0)
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
                  color={focusedField === "lastName" ? "#FFD700" : "rgba(255,255,255,0.2)"}
                />
              }
              autoCapitalize="words"
              keyboardType="default"
              textContentType="name"
              textColor="white"
              style={[styles.input]}
              onFocus={() => {
                setFocusedField("lastName")
                animateField(lastNameAnim, 1)
              }}
              onBlur={() => {
                setFocusedField("")
                animateField(lastNameAnim, 0)
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
                  color={focusedField === "civilId" ? "#FFD700" : "rgba(255,255,255,0.2)"}
                />
              }
              maxLength={12}
              inputMode="numeric"
              textColor="white"
              style={[styles.input]}
              onFocus={() => {
                setFocusedField("civilId")
                animateField(civilIdAnim, 1)
              }}
              onBlur={() => {
                setFocusedField("")
                animateField(civilIdAnim, 0)
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
                  color={focusedField === "mobileNumber" ? "#FFD700" : "rgba(255,255,255,0.2)"}
                />
              }
              maxLength={8}
              inputMode="numeric"
              textColor="white"
              style={[styles.input]}
              onFocus={() => {
                setFocusedField("mobileNumber")
                animateField(mobileNumberAnim, 1)
              }}
              onBlur={() => {
                setFocusedField("")
                animateField(mobileNumberAnim, 0)
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
                <TextInput.Icon icon="lock" color={focusedField === "password" ? "#FFD700" : "rgba(255,255,255,0.2)"} />
              }
              right={
                <TextInput.Icon
                  icon={secureTextEntry ? "eye" : "eye-off"}
                  color={focusedField === "password" ? "#FFD700" : "rgba(255,255,255,0.2)"}
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                />
              }
              autoCapitalize="none"
              textContentType="password"
              textColor="white"
              style={[styles.input]}
              onFocus={() => {
                setFocusedField("password")
                animateField(passwordAnim, 1)
              }}
              onBlur={() => {
                setFocusedField("")
                animateField(passwordAnim, 0)
              }}
              theme={{
                colors: { primary: "#FFD700" },
              }}
            />
          </Animated.View>

          <Animated.View style={[styles.buttonContainer, { transform: [{ scale: buttonAnim }] }]}>
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
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  gradient: {
    flex: 1,
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
    justifyContent: "center",
  },
  link: {
    color: "#FFD700",
    textDecorationLine: "underline",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
    backgroundColor: "rgb(8, 8, 8)",
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
  buttonContainer: {
    marginTop: 20,
  },
})

export default RegisterScreen

