import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Animated, Text, Modal } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ProcessModal({ visible, onClose, navigation }) {
  const [process, setProcess] = useState("processing"); // Track current process state
  const [dots, setDots] = useState(""); // Track dots animation
  const fadeAnim = useRef(new Animated.Value(0)).current; // Fade animation
  const scaleAnim = useRef(new Animated.Value(0.5)).current; // Scale animation

  useEffect(() => {
    if (visible) {
      handleProcess();
    }
  }, [visible]);

  const handleProcess = () => {
    setTimeout(() => {
      setProcess("sending");
      setDots("");
    }, 1000);

    setTimeout(() => {
      setProcess("processing");
      setDots("...");
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        setProcess("sending");
      }, 2000);

      setTimeout(() => {
        setProcess("confirmation");
        setTimeout(() => {
          onClose(); // Close modal after confirmation
          setTimeout(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Dashboard" }],
            });
          }, 0);
        }, 2000); // Keep confirmation for 2 seconds before navigating
      }, 4000);
    }, 2000); // Delay before starting processing
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Background Animation or Visuals */}
        <View style={styles.backgroundContainer}>
          <Text style={styles.backgroundText}>Processing Your Request...</Text>
        </View>

        {/* Animated processing screen */}
        <Animated.View
          style={[
            styles.centered,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          {process === "processing" && (
            <View style={styles.processContainer}>
              <MaterialCommunityIcons
                name="loading"
                size={100}
                color="#FFD700"
              />
              <Text style={styles.processText}>Processing{dots}</Text>
            </View>
          )}
          {process === "sending" && (
            <View style={styles.processContainer}>
              <MaterialCommunityIcons name="send" size={100} color="#FFD700" />
              <Text style={styles.processText}>Sending...</Text>
            </View>
          )}
          {process === "confirmation" && (
            <View style={styles.processContainer}>
              <MaterialCommunityIcons
                name="check-circle"
                size={100}
                color="#FFD700"
              />
              <Text style={styles.processText}>Confirmation</Text>
            </View>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent background
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
    opacity: 0.5, // Add some transparency
    borderRadius: 10,
    zIndex: -1, // Send the background behind the animated content
  },
  backgroundText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
  processContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  processText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFD700",
    marginTop: 10,
  },
});
