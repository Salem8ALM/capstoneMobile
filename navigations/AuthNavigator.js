import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import Routes from "../utils/constants/routes";
import { View, StyleSheet, Dimensions } from "react-native";
import DiagonalLines from "../animations/DiagonalLines";

const Stack = createNativeStackNavigator();
const { width, height } = Dimensions.get("window");

const AuthNavigator = () => {
  return (
    <View style={styles.container}>
      {/* DiagonalLines: animation component */}
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

      <Stack.Navigator detachInactiveScreens={false}>
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
            animation: "slide_from_right", // Apply the slide transition to all screens
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes up the full screen
    backgroundColor: "#black", // Dark background color
  },
});

export default AuthNavigator;
