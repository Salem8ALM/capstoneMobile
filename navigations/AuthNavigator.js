import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import Routes from "../utils/constants/routes";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.Auth.Login}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name={Routes.Auth.Register} component={RegisterScreen} />
    </Stack.Navigator>
  );
};
export default AuthNavigator;
