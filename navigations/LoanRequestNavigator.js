import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Routes from "../utils/constants/routes";
import { View, StyleSheet } from "react-native";
import LoanRequestIntro from "../screens/App/Request/LoanRequestIntro";
import LoanRequestDetails from "../screens/App/Request/LoanRequestDetails";
import LoanRequestAmount from "../screens/App/Request/LoanRequestAmount";
import LoanRequestBankSelection from "../screens/App/Request/LoanRequestBankSelection";
import LoanRequestReivew from "../screens/App/Request/LoanRequestReivew";
import { DataProvider } from "../context/DataContext";
import LoanDashboard from "../screens/App/Request/LoanDashboard";
import LoanResponseViewAll from "../screens/App/Request/LoanResponseViewAll";

const Stack = createNativeStackNavigator();

const LoanRequestNavigator = () => {
  return (
    // DataProvider is better practice to form json body along each screen when filling loan request form
    <DataProvider>
      <View style={styles.container}>
        <Stack.Navigator
          detachInactiveScreens={false}
          screenOptions={{
            headerShown: false, // Optional: Hide the header if not needed
          }}
        >
          <Stack.Screen
            name={Routes.LoanRequest.LoanDashboard}
            component={LoanDashboard}
            options={{
              animation: "fade", // Apply the slide transition to all screens
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={Routes.LoanRequest.LoanResponseViewAll}
            component={LoanResponseViewAll}
            options={{
              animation: "fade", // Apply the slide transition to all screens
              headerShown: false,
            }}
          />
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
    </DataProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes up the full screen
    backgroundColor: "#1C1C1E",
  },
  logout: {
    padding: 20,
    fontSize: 20,
  },
});

export default LoanRequestNavigator;
