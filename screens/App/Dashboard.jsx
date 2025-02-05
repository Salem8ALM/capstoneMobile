import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { Card } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const screenWidth = Dimensions.get("window").width;

const HomeScreen = () => {
  const scale = useSharedValue(1);
  const iconTranslateY = useSharedValue(0);
  const translateX = useRef(new Animated.Value(-screenWidth)).current;

  useEffect(() => {
    translateX.setValue(-screenWidth);

    const animation = Animated.loop(
      Animated.timing(translateX, {
        toValue: screenWidth * 2,
        duration: 2500,
        useNativeDriver: true,
      })
    );
    animation.start();

    return () => animation.stop();
  }, []);

  useEffect(() => {
    iconTranslateY.value = withRepeat(
      withTiming(10, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: iconTranslateY.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(1.2, { damping: 2 }, () => {
      scale.value = withSpring(1);
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#1C1C1E", padding: 20 }}>
      {/* Welcome Message */}
      <Text
        style={{
          color: "#fff",
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        👋 Welcome, User!
      </Text>

      {/* Financial Score */}
      <View>
        <Text style={{ color: "#fff", fontSize: 16 }}>Financial Score:</Text>
        <View
          style={{
            height: 8,
            backgroundColor: "#444",
            borderRadius: 4,
            overflow: "hidden",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <View
            style={{ width: "80%", height: "100%", backgroundColor: "#FFD700" }}
          />
        </View>
      </View>

      {/* Business Card */}
      <Card
        style={{
          backgroundColor: "#2A2A2E",
          padding: 15,
          borderRadius: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: "https://via.placeholder.com/50" }}
            style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15 }}
          />
          <View>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
              Your Business
            </Text>
            <Text style={{ color: "#aaa" }}>
              Business License ID: #12345678
            </Text>
          </View>
        </View>
      </Card>

      <View style={styles.card}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.title}>AI Financial Analysis</Text>
          {/* AI Icon */}
        </View>
        <Text style={styles.description}>
          Gain deep insights with AI-driven reports.
        </Text>

        {/* Full Coverage Gradient Shine Effect */}
        <Animated.View
          style={[styles.shineWrapper, { transform: [{ translateX }] }]}
        >
          <LinearGradient
            colors={[
              "rgba(255,255,255,0.1)",
              "rgba(255, 255, 255, 0.4)",
              "rgba(255,255,255,0.1)",
            ]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.shine}
          />
        </Animated.View>
      </View>

      {/* Apply for Loan Button with Gradient */}
      <TouchableOpacity
        onPress={handlePress}
        style={{ marginTop: 20, marginBottom: 30 }}
      >
        <Animated.View
          style={[
            {
              padding: 12,
              borderRadius: 10,
              alignItems: "center",
              backgroundColor: "#FFD700",
            },
            animatedStyle,
          ]}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Apply for a Loan
          </Text>
        </Animated.View>
      </TouchableOpacity>

      {/* Financial Chart */}
      <Text
        style={{
          color: "#fff",
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        Financial Statement
      </Text>
      <LineChart
        data={{
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [{ data: [400, 450, 420, 500, 520, 600] }],
        }}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: "#2A2A2E",
          backgroundGradientFrom: "#1C1C1E",
          backgroundGradientTo: "#2A2A2E",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 215, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        style={{ borderRadius: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2E2E2E",
    padding: 20,
    borderRadius: 15,
    overflow: "hidden",
    position: "relative",
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  description: {
    fontSize: 14,
    color: "#AAA",
    marginTop: 5,
  },
  shineWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "200%",
    overflow: "hidden",
  },
  shine: {
    width: "100%",
    height: "100%",
    opacity: 0.6,
  },
});

export default HomeScreen;
