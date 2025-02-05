import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Animated, {
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

const screenWidth = Dimensions.get("window").width;

const HomeScreen = () => {
  const scale = useSharedValue(1);
  const iconTranslateY = useSharedValue(0);

  // Looping animation for icons
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

      {/* Business Card */}
      <Card
        style={{
          backgroundColor: "#2A2A2E",
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
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

      {/* Financial Score */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ color: "#fff", fontSize: 16 }}>Financial Score:</Text>
        <View
          style={{
            height: 8,
            backgroundColor: "#444",
            borderRadius: 4,
            overflow: "hidden",
            marginTop: 5,
          }}
        >
          <View
            style={{ width: "80%", height: "100%", backgroundColor: "#FFD700" }}
          />
        </View>
      </View>

      {/* AI Analysis Card with Bouncing Icons */}
      <Card
        style={{
          backgroundColor: "#2A2A2E",
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Animated.View style={iconAnimatedStyle}>
            <MaterialIcons name="insights" size={30} color="yellow" />
          </Animated.View>
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 10,
            }}
          >
            AI Financial Analysis
          </Text>
        </View>
        <Text style={{ color: "#aaa", marginTop: 5 }}>
          Get real-time insights and personalized loan options using AI.
        </Text>
      </Card>

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

      {/* Apply for Loan Button */}
      <TouchableOpacity onPress={handlePress} style={{ marginTop: 20 }}>
        <Animated.View
          style={[
            {
              backgroundColor: "#FFD700",
              padding: 15,
              borderRadius: 10,
              alignItems: "center",
            },
            animatedStyle,
          ]}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Apply for a Loan
          </Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;