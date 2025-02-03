import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider, Text } from "react-native-paper";
import AuthNavigator from "./navigations/AuthNavigator";
import { useState, useEffect } from "react";
import UserContext from "./context/UserContext";
import AppNavigator from "./navigations/AppNavigator";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'react-native';

//-------- although not currently in use, they will be used for token storage
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import OnboardingNavigator from "./navigations/OnboardingNavigator";
import { deleteToken, getToken } from "./storage/TokenStorage";
import { getCompanyAPI } from "./api/Business";
//----------

export default function App() {
  const [authenticated, setAuthenticated] = useState(false); // User authentication status
  const [onboarded, setOnboarded] = useState(false); // User onboarding status

  // checking token and whether the user is onboarded
  const checkUserState = async () => {
    const token = await checkToken();
    await checkBusinessEntity(token);
  };

  const checkToken = async () => {
    const token = await getToken("access");
    console.log("INside check token" + token);

    if (token) {
      setAuthenticated(true);

      return token;
    } else {
      Alert.alert("Please log in again", "The session has timed out");
    }
  };

  const checkBusinessEntity = async (token) => {
    console.log(token);
    try {
      await getCompanyAPI(token);
      setOnboarded(true);
    } catch (error) {
      setOnboarded(false);
      console.log(error);
    }
  };

  useEffect(() => {
    checkUserState();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
      edges={[]}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
      />
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
                <View style={{ 
                  flex: 1,
                  backgroundColor: '#fff'
                }}>
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
    top: 40, // Adjust to your desired distance from the top
    left: 20, // Adjust to your desired distance from the left
    zIndex: 1, // Ensure it appears above other components if overlapping
  },
});
