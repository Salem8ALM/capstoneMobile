import { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";
import LottieAnimation from "./LottieAnimation";
import MessageCycler from "./MessageCycler";
import ProgressBar from "./ProgressBar";

const { width, height } = Dimensions.get("window");

const animations = [
  // require("../assets/waiting.json"),
  require("../assets/add_business_2.json"),

  require("../assets/add_business_1.json"),
  require("../assets/add_business_3.json"),
  require("../assets/add_business_4.json"),
  require("../assets/responses_waiting.json"),
  require("../assets/responses_waiting.json"),
  require("../assets/no-message.json"),
];

const titles = [
  "Simplifying Your Loan Journey",
  "Empowering Your Business, One Loan at a Time",
  "Your Loan, Our Priority",
  "Making Business Loans Effortless",
  "Ready to Unlock New Opportunities",
  "Fast-Tracking Your Future",
  "The Smart Way to Apply for Loans",
  "Your Success Starts Here",
  "Streamlining Your Loan Process",
  "Building the Bridge to Your Business Growth",
];

const messages = [
  "Gathering the data to get you the best deal.",
  "Analyzing your financials for the perfect match.",
  "Helping you focus on your business while we handle the details.",
  "Processing your information securely and efficiently.",
  "Connecting with banks that suit your needs.",
  "Your financial future is about to get brighter.",
  "Letting AI do the heavy lifting to get you the best loan.",
  "All set to accelerate your business growth.",
  "AI-driven analysis to unlock your best loan options.",
  "We're just a few seconds away from making your loan application a breeze.",
];

const LoadingModal = ({ visible }) => {
  const [progress, setProgress] = useState(0);
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const animationTimer = setInterval(() => {
      setCurrentAnimationIndex(
        (prevIndex) => (prevIndex + 1) % animations.length
      );
    }, 7000);

    return () => clearInterval(animationTimer);
  }, []);

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.overlay}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <View style={styles.modalContent}>
          <LottieAnimation
            animations={animations}
            currentIndex={currentAnimationIndex}
            style={styles.animation}
          />
          <MessageCycler
            messages={titles}
            style={styles.title}
            interval={5000}
          />
          <MessageCycler
            messages={messages}
            style={styles.message}
            interval={7000}
          />
          <ProgressBar progress={progress} colors={["#FFD700", "#FFA500"]} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    justifyContent: "center",

    width: width * 0.85,
    backgroundColor: "rgba(28, 25, 8, 0.9)",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 0.2,
    borderColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    color: "#DDDDDD",
    textAlign: "center",
    marginBottom: 15,
  },
  animation: {
    width: 180,
    height: 180,
    marginBottom: 15,
  },
});

export default LoadingModal;
