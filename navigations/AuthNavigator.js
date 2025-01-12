import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "../screens/Auth/LoginScreen";
import RegisterPage from "../screens/Auth/RegisterScreen";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={LoginPage} />
      <Stack.Screen name="register" component={RegisterPage} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
