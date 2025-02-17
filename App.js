import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider, Text } from "react-native-paper";
import AuthNavigator from "./navigations/AuthNavigator";
import { useState, useEffect } from "react";
import UserContext from "./context/UserContext";
import AppNavigator from "./navigations/AppNavigator";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import OnboardingNavigator from "./navigations/OnboardingNavigator";
import { getToken } from "./storage/TokenStorage";
import { getCompanyAPI } from "./api/Business";
import { NotificationsProvider } from "./context/NotificationsContext";
import TabBarProvider from "./navigations/TabBarProvider";
//----------

export default function App() {
  const [authenticated, setAuthenticated] = useState(false); // User authentication status
  const [onboarded, setOnboarded] = useState(false); // User onboarding status
  const [business, setBusiness] = useState(null); // Company data
  const [businessAvatar, setBusinessAvatar] = useState(null); // Company data
  const [loans, setLoans] = useState([]); // Company data

  // checking token and whether the user is onboarded
  const checkUserState = async () => {
    await checkToken();
  };

  const checkToken = async () => {
    const token = await getToken("access");

    const businessData = await checkBusinessEntity(token);
    if (token) {
      if (businessData) {
        setAuthenticated(true);
        setBusiness(businessData); // Store business data in state
      }
      return token;
    } else {
      Alert.alert("Please log in again", "The session has timed out");
    }
  };

  const checkBusinessEntity = async (token) => {
    try {
      const response = await getCompanyAPI(token);
      setOnboarded(true);
      return response; // Return the company data
    } catch (error) {
      setOnboarded(false);
      return null; // Return null if no company data found
    }
  };

  useEffect(() => {
    checkUserState();
  }, []);

  return (
    <TabBarProvider>
      {/* Wrap your app with the TabBarProvider */}
      <NotificationsProvider>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#121212", // Dark background
          }}
          edges={[]}
        >
          <StatusBar barStyle="light-content" backgroundColor="#1C1C1E" />
          <PaperProvider>
            <NavigationContainer>
              <UserContext.Provider
                value={{
                  authenticated,
                  setAuthenticated,
                  onboarded,
                  setOnboarded,
                  business, // Provide company data here
                  setBusiness, // You can provide a setter function for modifying the company data
                  businessAvatar,
                  setBusinessAvatar,
                  loans,
                  setLoans,
                }}
              >
                {authenticated ? (
                  onboarded ? (
                    <AppNavigator />
                  ) : (
                    <OnboardingNavigator />
                  )
                ) : (
                  <AuthNavigator />
                )}
              </UserContext.Provider>
            </NavigationContainer>
          </PaperProvider>
        </SafeAreaView>
      </NotificationsProvider>
    </TabBarProvider>
  );
}
const styles = StyleSheet.create({
  logout: {
    color: "white",
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  absoluteTopLeft: {
    position: "absolute",
    top: 50, // Adjust to your desired distance from the top
    left: 20, // Adjust to your desired distance from the left
    zIndex: 1, // Ensure it appears above other components if overlapping
  },
});
