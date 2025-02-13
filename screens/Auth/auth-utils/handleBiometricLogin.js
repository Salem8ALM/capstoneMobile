import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";

export const handleBiometricLogin = async () => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  if (!hasHardware) {
    Alert.alert(
      "Error",
      "Your device does not support biometric authentication."
    );
    return false;
  }
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (!isEnrolled) {
    Alert.alert(
      "Error",
      "No biometric credentials found. Please set up biometrics."
    );
    return false;
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Authenticate with Biometrics",
  });

  if (result.success) {
    return true;
  }
};
