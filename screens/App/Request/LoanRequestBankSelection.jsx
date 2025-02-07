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
import NotificationBanner from "../../../utils/animations/NotificationBanner";

export default function LoanRequestBankSelection() {
  const [banksSelected, setBanksSelected] = useState(null);

  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleReview = () => {
    console.log("review button pressed");
    console.log(banksSelected);
  };

  const reviewAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(reviewAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [reviewAnim]);

  return (
    <View style={styles.container}>
      <NotificationBanner
        message={notificationMessage}
        visible={notificationVisible}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Step 4/5: Select Banks</Text>
        <Text style={styles.subtitle}>
          Select all the banks you wish to request this to.
        </Text>
        <BankList setBanksSelected={setBanksSelected} />

        <Animated.View style={[{ transform: [{ scale: reviewAnim }] }]}>
          <Button
            icon={({ color }) => (
              <MaterialCommunityIcons
                name="arrow-right"
                size={24}
                color={color}
              />
            )}
            mode="contained"
            onPress={handleReview}
            onPressIn={() => handlePressIn(reviewAnim)}
            onPressOut={() => handlePressOut(reviewAnim)}
            style={styles.submit}
            labelStyle={styles.buttonText}
          >
            Next
          </Button>
        </Animated.View>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    marginBottom: 50,
  },
  content: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: height * 0.05, // 5% of screen height padding
  },
  subtitle: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 10,
  },
  symbols: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    zIndex: -1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
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
    margin: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
