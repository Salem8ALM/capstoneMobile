import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import Routes from "../utils/constants/routes";
import { View, StyleSheet, Dimensions } from "react-native";
import DiagonalLines from "../utils/animations/DiagonalLines";
import { LinearGradient } from "expo-linear-gradient";
import RegisterScreenBasic from "../screens/Auth/RegisterScreenBasic";
import RegisterScreenAdvance from "../screens/Auth/RegisterScreenAdvance";

const Stack = createNativeStackNavigator();

const { width, height } = Dimensions.get("window");

const AuthNavigator = () => {
  return (
    <LinearGradient
      colors={["black", "rgb(38, 38, 31)", "black"]} // Gradient colors
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.container}>
        <DiagonalLines
          toValueSequence={[0.5, 0]}
          duration={2000000}
          outputRange={["45deg", "10000deg"]}
          lineSpacing={5}
          lineOffset={-300}
        />
        <DiagonalLines
          toValueSequence={[0.1, 0]}
          duration={3000000}
          outputRange={["40deg", "225000deg"]}
          lineSpacing={10}
          lineOffset={-200}
        />

        <Stack.Navigator detachInactiveScreens={false}>
          <Stack.Screen
            name={Routes.Auth.Login}
            component={LoginScreen}
            options={{
              animation: "fade",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={Routes.Auth.RegisterBasic}
            component={RegisterScreenBasic}
            options={{
              animation: "fade",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={Routes.Auth.RegisterAdvance}
            component={RegisterScreenAdvance}
            options={{
              animation: "fade",
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: width,
    height: height,
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
});

export default AuthNavigator;
