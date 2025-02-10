import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider, Text } from "react-native-paper";
import AuthNavigator from "./navigations/AuthNavigator";
import { useState, useEffect } from "react";
import UserContext from "./context/UserContext";
import AppNavigator from "./navigations/AppNavigator";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import OnboardingNavigator from "./navigations/OnboardingNavigator";
import { getToken } from "./storage/TokenStorage";
import { getCompanyAPI } from "./api/Business";
//----------

export default function App() {
  const [authenticated, setAuthenticated] = useState(false); // User authentication status
  const [onboarded, setOnboarded] = useState(false); // User onboarding status

  // checking token and whether the user is onboarded
  const checkUserState = async () => {
    await checkToken();
  };

  const checkToken = async () => {
    const token = await getToken("access");
    await checkBusinessEntity(token);
    console.log("INside check token" + token);
    if (token) {
      setAuthenticated(true);
      return token;
    } else {
      Alert.alert("Please log in again", "The session has timed out");
    }
  };

  const checkBusinessEntity = async (token) => {
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
        backgroundColor: "#292933",
      }}
      edges={[]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#292933" />
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
                <OnboardingNavigator />
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
