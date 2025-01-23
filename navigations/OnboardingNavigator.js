import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import Routes from "../utils/constants/routes";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import DiagonalLines from "../utils/animations/DiagonalLines";
import OnboardWelcome from "../screens/Onboard/OnboardWelcome";
import OnboardAddBusiness from "../screens/Onboard/OnboardAddBusiness";
import OnboardAnimations from "../utils/animations/OnboardAnimations";
import { Text } from "react-native-paper";

const Stack = createNativeStackNavigator();
const { width, height } = Dimensions.get("window");

const OnboardingNavigator = () => {
  return (
    <View style={styles.container}>
      <OnboardAnimations
        toValueSequence={[0.1, 0]}
        duration={10000}
        outputRange={["45deg", "450deg"]}
        lineSpacing={100}
        lineOffset={-100}
      />

      <Stack.Navigator
        detachInactiveScreens={false}
        screenOptions={{
          cardStyle: { backgroundColor: "transparent" }, // Set the background of the card to transparent
          headerShown: false, // Optional: Hide the header if not needed
        }}
      >
        <Stack.Screen
          name={Routes.Onboard.OnboardWelcome}
          component={OnboardWelcome}
          options={{
            animation: "fade", // Apply the slide transition to all screens
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={Routes.Onboard.OnboardAddBusiness}
          component={OnboardAddBusiness}
          options={{
            animation: "fade", // Apply the slide transition to all screens
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </View>
  );
};

// options={{

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a1a",
    flex: 1, // Ensures the container takes up the full screen
  },
  logout: {
    padding: 20,
    fontSize: 20,
  },
});

export default OnboardingNavigator;
