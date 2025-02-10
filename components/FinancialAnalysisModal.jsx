import React, { useState, useEffect } from "react";
import { View, Text, Modal, Animated } from "react-native";
import { Button, Card, Portal, Provider } from "react-native-paper";
import LottieView from "lottie-react-native";

const FinancialAnalysisModal = ({ visible, onDismiss, analysisText }) => {
  const [displayedText, setDisplayedText] = useState("");
  const fadeAnim = useState(new Animated.Value(1))[0]; // Set default opacity to 1

  useEffect(() => {
    if (visible) {
      setDisplayedText(""); // Reset text when modal opens
      fadeAnim.setValue(1); // Ensure text is visible
      let i = 0;
      const interval = setInterval(() => {
        if (i < analysisText.length) {
          setDisplayedText((prev) => prev + analysisText[i]);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50); // Speed of typing effect
      return () => clearInterval(interval);
    }
  }, [visible, analysisText]);

  return (
    <Provider>
      <Portal>
        <Modal
          transparent
          visible={visible}
          animationType="fade"
          onRequestClose={onDismiss}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              style={{
                width: "90%",
                padding: 20,
                backgroundColor: "#222",
                borderRadius: 15,
              }}
            >
              <LottieView
                source={require("../assets/AI-animation-1.json")} // Use a cool AI animation JSON file
                autoPlay
                loop
                style={{ width: 100, height: 100, alignSelf: "center" }}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#FFD700",
                  textAlign: "center",
                  marginBottom: 10,
                }}
              >
                AI Financial Analysis 📊
              </Text>
              <Animated.Text
                style={{
                  fontSize: 16,
                  color: "white",
                  textAlign: "center",
                  opacity: fadeAnim, // Keep text always visible
                }}
              >
                {displayedText}
              </Animated.Text>
              <Button
                mode="contained"
                onPress={onDismiss}
                style={{ marginTop: 20, backgroundColor: "#FFD700" }}
              >
                Close
              </Button>
            </Card>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default FinancialAnalysisModal;
