import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import Routes from "../utils/constants/routes";
import { View, StyleSheet, Dimensions } from "react-native";
import DiagonalLines from "../utils/animations/DiagonalLines";

const Stack = createNativeStackNavigator();
const { width, height } = Dimensions.get("window");

const AuthNavigator = () => {
  return (
    <View style={styles.container}>
      {/* DiagonalLines: animation component */}
      <DiagonalLines
        toValueSequence={[0.5, 0]}
        duration={250000}
        outputRange={["45deg", "25000deg"]}
        lineSpacing={5}
        lineOffset={-300}
      />
      <DiagonalLines
        toValueSequence={[0.1, 0]}
        duration={500000}
        outputRange={["40deg", "225000deg"]}
        lineSpacing={10}
        lineOffset={-200}
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
