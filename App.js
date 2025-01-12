import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import AuthNavigator from "./navigations/AuthNavigator";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        {/* <QueryClientProvider client={queryClient}> */}
        <AuthNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
