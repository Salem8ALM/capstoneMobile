import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import {
  Text,
  Surface,
  Button,
  Portal,
  Modal,
  PaperProvider,
} from "react-native-paper";
import { Svg, Polyline } from "react-native-svg";
import { captureRef } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import LottieView from "lottie-react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  Easing,
} from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTabBar } from "../../../navigations/TabBarProvider";
import { acceptOfferAPI } from "../../../api/LoanRequest";
import { getToken } from "../../../storage/TokenStorage";
import { useNavigation } from "@react-navigation/native";
import NotificationBanner from "../../../utils/animations/NotificationBanner";

const { width } = Dimensions.get("window");

async function capitalizeFirstLetter(input) {
  if (!input) return ""; // Return an empty string if input is falsy (undefined, null, etc.)
  return input
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function LoanAcceptance({ route }) {
  const [lines, setLines] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const svgRef = useRef(null);
  const animationRef = useRef(null);
  const [modalTimeout, setModalTimeout] = useState(null);

  const { loanId, response } = route.params;
  const navigation = useNavigation();

  const [notificationVisible, setNotificationVisible] = useState(false); // State to manage banner visibility
  const [notificationMessage, setNotificationMessage] = useState(""); // Message to show in the banner

  // Loan details would come from route.params in a real app
  const loanDetails = {
    amount: response?.amount.toLocaleString() ?? "Not defined",
    term: response?.loanTerm ?? "Not defined",
    bank: response?.banker?.bank ?? "Not defined",

    repaymentPlan: response?.repaymentPlan ?? "Not defined",
    counterOffer: response?.amount ?? "Not defined",
  };

  const handleStartDraw = (e) => {
    const { locationX, locationY } = e.nativeEvent;
    setLines((prevLines) => [
      ...prevLines,
      { points: [{ x: locationX, y: locationY }], color: "#FFFFFF" },
    ]);
  };

  const handleMoveDraw = (e) => {
    if (lines.length > 0) {
      const { locationX, locationY } = e.nativeEvent;
      setLines((prevLines) => {
        const newLines = [...prevLines];
        const currentLine = { ...newLines[newLines.length - 1] };
        currentLine.points = [
          ...currentLine.points,
          { x: locationX, y: locationY },
        ];
        newLines[newLines.length - 1] = currentLine;
        return newLines;
      });
    }
  };

  const handleClearCanvas = () => {
    setLines([]);
  };

  const { setShowTabBar } = useTabBar();

  useEffect(() => {
    // Delay the tab bar hiding to give the animation a chance to play
    const hideTabBarTimeout = setTimeout(() => {
      setShowTabBar(false);
    }, 100); // Adjust delay as necessary to allow animation time

    // Reset the tab bar visibility when leaving the screen
    return () => {
      clearTimeout(hideTabBarTimeout); // Clear the timeout to prevent unnecessary calls
      setShowTabBar(true);
    };
  }, []); // Empty dependency array ensures this runs only once when the screen is mounted

  const handleSubmit = async () => {
    if (lines.length === 0) {
      setNotificationMessage("Please sign before submitting!");
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000); // Hide the banner after 3 seconds

      return;
    }

    try {
      const uri = await captureRef(svgRef, {
        format: "png",
        quality: 1.0,
      });

      setShowSuccess(true);
      if (animationRef.current) {
        animationRef.current.play();
      }

      const token = await getToken("access");
      await acceptOfferAPI(token, loanId, response.id);

      const timeout = setTimeout(() => {
        setShowSuccess(false);
        navigation.pop(); // Now it pops after the timeout
      }, 3000); // Adjust duration as needed

      setModalTimeout(timeout);
    } catch (error) {
      setNotificationMessage("Failed to process signature. Try again later.");
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000); // Hide the banner after 3 seconds
    }
  };

  return (
    <View style={styles.container}>
      <NotificationBanner
        message={notificationMessage}
        visible={notificationVisible}
      />
      <PaperProvider>
        <Animated.View
          entering={FadeInDown.duration(800).easing(Easing.ease)}
          style={styles.header}
        >
          <Text style={styles.title}>Loan Offer Acceptance</Text>
          <Surface style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <MaterialCommunityIcons name="cash" size={24} color="#FFD700" />
              <Text style={styles.detailLabel}>Amount:</Text>
              <Text style={styles.detailValue}>
                {loanDetails?.amount ? loanDetails.amount : "Not defined"}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <MaterialCommunityIcons
                name="calendar-clock"
                size={24}
                color="#FFD700"
              />
              <Text style={styles.detailLabel}>Term:</Text>
              <Text style={styles.detailValue}>
                {loanDetails?.term
                  ? capitalizeFirstLetter(loanDetails.term)
                  : "Not defined"}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <MaterialCommunityIcons name="bank" size={24} color="#FFD700" />
              <Text style={styles.detailLabel}>Bank:</Text>
              <Text style={styles.detailValue}>
                {loanDetails?.term
                  ? capitalizeFirstLetter(loanDetails.bank)
                  : "Not defined"}
              </Text>
            </View>
          </Surface>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.duration(800).delay(400)}
          style={styles.signatureContainer}
        >
          <Text style={styles.signatureLabel}>
            Sign below to accept the offer
          </Text>
          <Surface style={styles.canvas}>
            <Svg
              ref={svgRef}
              style={styles.svg}
              onStartShouldSetResponder={() => true}
              onMoveShouldSetResponder={() => true}
              onResponderGrant={handleStartDraw}
              onResponderMove={handleMoveDraw}
            >
              {lines.map((line, index) => (
                <Polyline
                  key={index}
                  points={line.points.map((p) => `${p.x},${p.y}`).join(" ")}
                  stroke="#FFFFFF"
                  strokeWidth={2}
                  fill="none"
                />
              ))}
            </Svg>
          </Surface>

          <View style={styles.buttonContainer}>
            <Button
              mode="outlined"
              onPress={handleClearCanvas}
              style={styles.clearButton}
              textColor="#FFD700"
            >
              Clear Signature
            </Button>
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.submitButton}
              buttonColor="#FFD700"
              textColor="#000000"
            >
              Submit Acceptance
            </Button>
          </View>
        </Animated.View>

        <Portal>
          <Modal
            visible={showSuccess}
            dismissable={false}
            contentContainerStyle={styles.modal}
          >
            <LottieView
              ref={animationRef}
              source={require("../../../assets/acceptOffer.json")}
              style={styles.lottie}
              autoPlay={true}
              loop={true}
            />
            <Text style={styles.successText}>
              Loan Accepted! The banker will get in contact with you
            </Text>
          </Modal>
        </Portal>
      </PaperProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  detailsCard: {
    padding: 16,
    backgroundColor: "#2C2C2C",
    borderRadius: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  detailLabel: {
    color: "#FFFFFF",
    marginLeft: 8,
    fontSize: 16,
    width: 80,
  },
  detailValue: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "500",
  },
  signatureContainer: {
    flex: 1,
  },
  signatureLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 12,
    textAlign: "center",
  },
  canvas: {
    flex: 1,
    backgroundColor: "#2C2C2C",
    borderRadius: 12,
    overflow: "hidden",
    borderColor: "rgba(151, 151, 151, 0.64)",
    borderWidth: 0.2,
  },
  svg: {
    flex: 1,
    backgroundColor: "transparent",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  clearButton: {
    marginRight: 8,
    borderColor: "#FFD700",
  },
  submitButton: {
    flex: 2,
    marginLeft: 8,
  },
  modal: {
    backgroundColor: "#2C2C2C",
    padding: 20,
    margin: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  lottie: {
    width: 300,
    height: 300,
  },
  successText: {
    color: "#FFD700",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
  },
});
