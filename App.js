import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import AuthNavigator from "./navigations/AuthNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <AuthNavigator />
      </PaperProvider>
    </NavigationContainer>
  );
}
