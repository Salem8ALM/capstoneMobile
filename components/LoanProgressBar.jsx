import { View, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const LoanProgressBar = ({ step, totalSteps }) => {
  const progress = (step / totalSteps) * 100;

  const animatedStyle = useAnimatedStyle(() => ({
    width: withSpring(`${progress}%`, {
      damping: 15,
      stiffness: 100,
    }),
  }));

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <Animated.View style={[styles.progressBarFill, animatedStyle]}>
          <LinearGradient
            colors={['#FFD700', '#FFA500']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          />
        </Animated.View>
      </View>
      <Text style={styles.progressText}>{`${step} of ${totalSteps} steps`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    marginBottom: 30,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#2C2C2E',
    borderRadius: 3,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
  },
  progressText: {
    color: '#A1A1AA',
    fontSize: 14,
  },
});

export default LoanProgressBar; 