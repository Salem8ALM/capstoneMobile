import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Routes from "../utils/constants/routes";
import { View, StyleSheet, Dimensions } from "react-native";
import OnboardWelcome from "../screens/Onboard/OnboardWelcome";
import OnboardAddBusiness from "../screens/Onboard/OnboardAddBusiness";
import OnboardAnimations from "../utils/animations/OnboardAnimations";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const Stack = createNativeStackNavigator();

const OnboardingNavigator = () => {
  return (
    <LinearGradient
      colors={["black", "rgb(38, 38, 31)", "black"]} // Gradient colors
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes up the full screen

    // backgroundColor: "#1a1a1a",
  },
  logout: {
    padding: 20,
    fontSize: 20,
  },
  gradient: {
    flex: 1,
    width: width,
    height: height,
  },
});

export default OnboardingNavigator;
