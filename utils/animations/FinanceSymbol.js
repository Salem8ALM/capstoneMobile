import React, { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const FinanceSymbol = ({ icon, size, color }) => {
  const [position] = useState({
    x: Math.random() * 300,
    y: Math.random() * 600,
  });

  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateSymbol();
  }, []);

  const animateSymbol = () => {
    translateX.setValue(0);
    translateY.setValue(0);

    const randomX = (Math.random() - 0.5) * 100;
    const randomY = (Math.random() - 0.5) * 100;

    Animated.parallel([
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000 + Math.random() * 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000 + Math.random() * 1000,
          delay: 2000 + Math.random() * 2000,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(translateX, {
        toValue: randomX,
        duration: 4000 + Math.random() * 2000,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: randomY,
        duration: 4000 + Math.random() * 2000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(animateSymbol, Math.random() * 1000);
    });
  };

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        opacity,
        transform: [{ translateX }, { translateY }],
      }}
    >
      <MaterialCommunityIcons name={icon} size={size} color={color} />
    </Animated.View>
  );
};

export default FinanceSymbol;
