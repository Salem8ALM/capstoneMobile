"use client";

import { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Text,
  Modal,
  Dimensions,
} from "react-native";
import { ActivityIndicator, Surface } from "react-native-paper";
import LottieView from "lottie-react-native";

const { width } = Dimensions.get("window");

export default function ProcessModal({ visible, onClose, navigation }) {
  const [process, setProcess] = useState("processing");
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const lottieRef = useRef(null);

  useEffect(() => {
    if (visible) {
      handleProcess();
      startRotationAnimation();
    }
  }, [visible]);

  const handleProcess = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: false,
      }),
    ]).start();

    setTimeout(() => setProcess("sending"), 3000);
    setTimeout(() => {
      onClose();
      setTimeout(() => {
        navigation.popToTop();
      }, 0);
    }, 6000);
  };

  const startRotationAnimation = () => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width - 80],
  });

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Surface style={styles.surface}>
          <Animated.View
            style={[
              styles.centered,
              { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
            ]}
          >
            {process === "processing" && (
              <Animated.View
                style={[
                  styles.iconContainer,
                  { transform: [{ rotate: spin }] },
                ]}
              >
                <ActivityIndicator size={80} color="#FFD700" />
              </Animated.View>
            )}
            {process === "sending" && (
              <LottieView
                ref={lottieRef}
                source={require("../assets/confirmation-animation.json")}
                autoPlay
                loop={false}
                style={styles.lottieAnimation}
                colorFilters={[
                  {
                    keypath: "**",
                    color: "#FFD700",
                  },
                ]}
              />
            )}
            <Text style={styles.processText}>
              {process === "processing" ? "Processing" : "Sending Confirmation"}
            </Text>
            <Animated.View
              style={[styles.progressBar, { width: progressWidth }]}
            />
          </Animated.View>
        </Surface>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  surface: {
    padding: 20,
    height: 300,
    width: width - 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "#1E1E1E",
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginBottom: 20,
  },
  processText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD700",
    marginTop: 20,
  },
  lottieAnimation: {
    width: 200,
    height: 200,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#FFD700",
    borderRadius: 2,
    marginTop: 20,
  },
});
