"use client";
import { View, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

const ProgressBar = ({ progress, colors }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(`${progress}%`, { duration: 300 }),
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progressContainer, animatedStyle]}>
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.6,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressContainer: {
    height: "100%",
  },
  gradient: {
    flex: 1,
  },
});

export default ProgressBar;
