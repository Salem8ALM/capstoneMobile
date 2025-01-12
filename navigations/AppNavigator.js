import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import Routes from "../utils/constants/routes";
import DashboardScreen from "../screens/DashboardScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.App.DashboardScreen}
        component={DashboardScreen}
      />
    </Stack.Navigator>
  );
};
export default AppNavigator;
