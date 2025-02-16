import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Routes from "../utils/constants/routes";
import { View, StyleSheet, Dimensions } from "react-native";
import DashboardHome from "../screens/dashboard/DashboardHome";
import DahsboardAnalysis from "../screens/dashboard/DahsboardAnalysis";

const Stack = createNativeStackNavigator();

const DashboardNavigator = () => {
  return (
    <Stack.Navigator detachInactiveScreens={false}>
      <Stack.Screen
        name={Routes.Dashboard.DashboardHome}
        component={DashboardHome}
        options={{
          animation: "fade",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Routes.Dashboard.DashboardAnalysis}
        component={DahsboardAnalysis}
        options={{
          animation: "fade",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
});

export default DashboardNavigator;
