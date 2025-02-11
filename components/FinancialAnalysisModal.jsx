"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { View, Text, Modal, Animated, Easing, Dimensions } from "react-native";
import { Button, Portal, Provider, Surface } from "react-native-paper";
import LottieView from "lottie-react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

const { height } = Dimensions.get("window");

const FinancialAnalysisModal = ({ visible, onDismiss, analysisText }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [textArray, setTextArray] = useState([]);
  const [titleText, setTitleText] = useState("Researching");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fadeAnims = useRef([]).current;
  const slideAnims = useRef([]).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const backgroundOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(1)).current;

  // Title animation sequence
  const animateTitleOpacity = useCallback(() => {
    if (isAnalyzing) return;

    Animated.sequence([
      Animated.timing(titleOpacity, {
        toValue: 0.3,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (visible && !isAnalyzing) animateTitleOpacity();
    });
  }, [isAnalyzing, visible, titleOpacity]);

  // Title text animation sequence
  useEffect(() => {
    if (visible) {
      let currentIndex = 0;
      const titles = ["Researching", "Processing", "Analyzing"];

      const interval = setInterval(() => {
        if (currentIndex < titles.length - 1) {
          currentIndex++;
          setTitleText(titles[currentIndex]);
          if (titles[currentIndex] === "Analyzing") {
            setIsAnalyzing(true);
            clearInterval(interval);
          }
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [visible]);

  // Initialize animations for each character
  useEffect(() => {
    if (visible) {
      setDisplayedText("");
      setTextArray(analysisText.split(""));
      fadeAnims.length = 0;
      slideAnims.length = 0;

      analysisText.split("").forEach(() => {
        fadeAnims.push(new Animated.Value(0));
        slideAnims.push(new Animated.Value(20));
      });

      // Animate modal entrance
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.out(Easing.back(1.7)),
        }),
        Animated.timing(backgroundOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Animate each character
      textArray.forEach((_, index) => {
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(fadeAnims[index], {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(slideAnims[index], {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
              easing: Easing.out(Easing.back(1.7)),
            }),
          ]).start();
        }, index * 50);
      });

      // Start title opacity animation
      animateTitleOpacity();
    } else {
      // Reset states when modal is closed
      setTitleText("Researching");
      setIsAnalyzing(false);
      scaleAnim.setValue(0.9);
      backgroundOpacity.setValue(0);
    }
  }, [visible, analysisText, animateTitleOpacity, backgroundOpacity]); // Added backgroundOpacity to dependencies

  const renderAnimatedText = useCallback(() => {
    return textArray.map((char, index) => (
      <Animated.Text
        key={index}
        style={{
          fontSize: 16,
          color: "#fff",
          opacity: fadeAnims[index],
          transform: [{ translateY: slideAnims[index] }],
        }}
      >
        {char}
      </Animated.Text>
    ));
  }, [textArray, fadeAnims, slideAnims]);

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={onDismiss} transparent>
          <Animated.View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              opacity: backgroundOpacity,
            }}
          >
            <BlurView
              intensity={60}
              tint="dark"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            />
            <Animated.View
              style={{
                width: "90%",
                transform: [{ scale: scaleAnim }],
              }}
            >
              <Surface
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  elevation: 20,
                  borderWidth: 1,
                  borderColor: "rgba(255, 215, 0, 0.3)",
                }}
              >
                <LinearGradient
                  colors={["rgba(40, 40, 40, 0.95)", "rgba(20, 20, 20, 0.95)"]}
                  style={{ padding: 24 }}
                >
                  <LottieView
                    source={require("../assets/AI-animation-1.json")}
                    autoPlay
                    loop
                    style={{
                      width: 120,
                      height: 120,
                      alignSelf: "center",
                      marginBottom: 16,
                    }}
                  />

                  <Animated.View
                    style={{
                      opacity: isAnalyzing ? 1 : titleOpacity,
                      transform: [
                        {
                          scale: titleOpacity.interpolate({
                            inputRange: [0.3, 1],
                            outputRange: [0.95, 1],
                          }),
                        },
                      ],
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: "bold",
                        color: "#FFD700",
                        textAlign: "center",
                        marginBottom: 20,
                        textShadowColor: "rgba(255, 215, 0, 0.3)",
                        textShadowOffset: { width: 0, height: 2 },
                        textShadowRadius: 4,
                      }}
                    >
                      {titleText}
                    </Text>
                  </Animated.View>

                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      paddingHorizontal: 10,
                      minHeight: 100,
                    }}
                  >
                    {renderAnimatedText()}
                  </View>

                  <Button
                    mode="contained"
                    onPress={onDismiss}
                    style={{
                      marginTop: 24,
                      backgroundColor: "#FFD700",
                      borderRadius: 12,
                      elevation: 4,
                    }}
                    labelStyle={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#000",
                    }}
                  >
                    Close
                  </Button>
                </LinearGradient>
              </Surface>
            </Animated.View>
          </Animated.View>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default FinancialAnalysisModal;
