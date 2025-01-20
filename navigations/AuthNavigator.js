import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import Routes from "../utils/constants/routes";
import { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";

import { CardStyleInterpolators } from "@react-navigation/stack";
import DiagonalLines from "../animations/DiagonalLines";

const Stack = createNativeStackNavigator();
const { width, height } = Dimensions.get("window");

const AuthNavigator = () => {
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

  return (
    <View style={styles.container}>
      <DiagonalLines
        toValueSequence={[0.7, 0.1]}
        duration={10000}
        outputRange={["45deg", "225deg"]}
        lineSpacing={5}
        lineOffset={-200}
      />
      <DiagonalLines
        toValueSequence={[0.1, 0]}
        duration={10000}
        outputRange={["4deg", "225deg"]}
        lineSpacing={10}
        lineOffset={-100}
      />
      <Stack.Navigator
        detachInactiveScreens={false}
        screenOptions={{
          animation: "slide_from_right", // Apply the slide transition to all screens
          cardStyle: { backgroundColor: "transparent" }, // Consistent background color
        }}
      >
        <Stack.Screen
          name={Routes.Auth.Login}
          component={LoginScreen}
          options={{
            animation: "slide_from_left", // Apply the slide transition to all screens

            headerShown: false,
          }}
        />
        <Stack.Screen
          name={Routes.Auth.Register}
          component={RegisterScreen}
          options={{
            headerShown: false,
            presentation: "transparentModal",
            CardStyleInterpolators:
              CardStyleInterpolators.goBackWithSlideFromLeft, // Default fade

            // Transparent modal
          }}
        />
      </Stack.Navigator>
    </View>
  );
};
export default AuthNavigator;
function goBackWithSlideFromLeft() {
  navigation.pop(); // Pop back to the previous screen
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes up the full screen
    backgroundColor: "#black", // Dark background color
  },

  diagonalLine: {
    position: "absolute",
    width: 1,
    height: height * 2, // Ensures lines cover the entire height of the screen
    backgroundColor: "#FFD700", // Golden color for the lines
  },
});
