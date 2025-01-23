// Aya's repo for reference for token storage:
// https://github.com/aya-alsakkaf/RN-Auth-Demo/blob/auth-complete/src/screens/Auth/Login.js

import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider, Text } from "react-native-paper";
import AuthNavigator from "./navigations/AuthNavigator";
import { useState, useEffect } from "react";
import UserContext from "./context/UserContext";
import AppNavigator from "./navigations/AppNavigator";
import { StyleSheet, TouchableOpacity, View } from "react-native";

//-------- although not currently in use, they will be used for token storage
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import OnboardingNavigator from "./navigations/OnboardingNavigator";
import { deleteToken } from "./storage/TokenStorage";
import { SafeAreaView } from "react-native-safe-area-context";
//----------

export default function App() {
  const [authenticated, setAuthenticated] = useState(false); // User authentication status
  const [onboarded, setOnboarded] = useState(false); // User onboarding status

  const checkToken = async () => {
    // Check if the token exists
    const token = await getToken("access");
    // If token exists, set authentication to true
    if (token) setAuthenticated(true);
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <PaperProvider>
        <NavigationContainer>
          <UserContext.Provider
            value={{
              authenticated,
              setAuthenticated,
              onboarded,
              setOnboarded,
            }}
          >
            {authenticated ? (
              onboarded ? (
                <AppNavigator />
              ) : (
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    onPress={async () => {
                      setAuthenticated(false);
                      await deleteToken("access");
                    }}
                    style={[styles.container, styles.absoluteTopLeft]}
                  >
                    <Text style={styles.logout}>Logout</Text>
                  </TouchableOpacity>
                  <OnboardingNavigator />
                </View>
              )
            ) : (
              <AuthNavigator />
            )}
          </UserContext.Provider>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  logout: {
    fontSize: 20,
  },
  absoluteTopLeft: {
    position: "absolute",
    top: 10, // Adjust to your desired distance from the top
    left: 20, // Adjust to your desired distance from the left
    zIndex: 1, // Ensure it appears above other components if overlapping
  },
});
