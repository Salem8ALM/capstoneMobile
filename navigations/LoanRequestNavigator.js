import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Routes from "../utils/constants/routes";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import LoanRequestIntro from "../screens/App/Request/LoanRequestIntro";
import LoanRequestDetails from "../screens/App/Request/LoanRequestDetails";
import LoanRequestAmount from "../screens/App/Request/LoanRequestAmount";
import LoanRequestBankSelection from "../screens/App/Request/LoanRequestBankSelection";
import LoanRequestReivew from "../screens/App/Request/LoanRequestReivew";

const Stack = createNativeStackNavigator();

const LoanRequestNavigator = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator
        detachInactiveScreens={false}
        screenOptions={{
          headerShown: false, // Optional: Hide the header if not needed
        }}
      >
        <Stack.Screen
          name={Routes.LoanRequest.LoanRequestIntro}
          component={LoanRequestIntro}
          options={{
            animation: "fade", // Apply the slide transition to all screens
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={Routes.LoanRequest.LoanRequestDetails}
          component={LoanRequestDetails}
          options={{
            animation: "fade", // Apply the slide transition to all screens
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={Routes.LoanRequest.LoanRequestAmount}
          component={LoanRequestAmount}
          options={{
            animation: "fade", // Apply the slide transition to all screens
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={Routes.LoanRequest.LoanRequestBankSelection}
          component={LoanRequestBankSelection}
          options={{
            animation: "fade", // Apply the slide transition to all screens
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={Routes.LoanRequest.LoanRequestReview}
          component={LoanRequestReivew}
          options={{
            animation: "fade", // Apply the slide transition to all screens
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
    backgroundColor: "#1a1a1a",
  },
  logout: {
    padding: 20,
    fontSize: 20,
  },
});

export default LoanRequestNavigator;
