import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import AuthNavigator from "./navigations/AuthNavigator";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { useState, useEffect } from "react";
import UserContext from "./context/UserContext";
import { checkToken } from "./storage/TokenStorage";
import AppNavigator from "./navigations/AppNavigator";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false); //keep track of the user status

  const checkToken = async () => {
    // check if the token exists
    const token = await getToken();
    // exists ? setAuth to true : null
    if (token) setAuthenticated(true);
  };

  useEffect(() => {
    checkToken();
  });

  // Do login:
  // https://github.com/aya-alsakkaf/RN-Auth-Demo/blob/auth-complete/src/screens/Auth/Login.js
  return (
    <NavigationContainer>
      <PaperProvider>
        <UserContext.Provider value={[authenticated, setAuthenticated]}>
          {authenticated ? <AppNavigator /> : <AuthNavigator />}
        </UserContext.Provider>
      </PaperProvider>
    </NavigationContainer>
  );
}
