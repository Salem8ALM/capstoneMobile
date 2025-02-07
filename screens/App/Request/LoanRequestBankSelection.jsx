import { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import { Button, Text } from "react-native-paper";
import BankList from "../../../components/BankList";
import LoanDetailsCard from "../../../components/LoanDetailsCard";
import { useNavigation } from "@react-navigation/native";
import {
  handlePressIn,
  handlePressOut,
} from "../../../utils/animations/buttonAnimations";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function LoanRequestBankSelection() {
  const [loanDetails, setLoanDetails] = useState(null);

  const handleNext = () => {
    console.log("Next button pressed");
  };

  const handleLoanDetailsSubmit = (details) => {
    setLoanDetails(details);
    setShowBankList(true);
  };

  const nextAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(nextAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [nextAnim]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Select your Bank</Text>
        </View>
        <View style={styles.description}>
          <Text>Please select the bank you would like to apply with.</Text>
        </View>
        <BankList loanDetails={loanDetails} />

        <Animated.View style={[{ transform: [{ scale: nextAnim }] }]}>
          <Button
            icon={({ color }) => (
              <MaterialCommunityIcons
                name="arrow-right"
                size={24}
                color={color}
              />
            )}
            mode="contained"
            onPress={handleNext}
            onPressIn={() => handlePressIn(nextAnim)}
            onPressOut={() => handlePressOut(nextAnim)}
            style={styles.submit}
            labelStyle={styles.buttonText}
          >
            Next
          </Button>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  content: {
    flex: 1,
    width: "100%",
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: height * 0.05, // 5% of screen height padding
  },

  symbols: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    zIndex: -1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginLeft: 10,
  },
  description: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  submit: {
    backgroundColor: "#FFD700",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
