import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function ProgressBar() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Financial score: </Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressFill} />
        </View>
      </View>
    </View>
  );
}

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    width: 377,
    height: 65,
    backgroundColor: '#3D3D47',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#FFD700', // Optional for styling
    padding: 11,
    // left: '52%',
    // transform: [{ translateX: -400 }],
    // marginTop: 70,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 20,
  },
  progressContainer: {
    height: 12,
    backgroundColor: '#292933',
    borderRadius: 20,
    marginTop: 4,
    overflow: 'hidden',
  },
  progressFill: {
    width: '50%', // This represents the progress (change dynamically if needed)
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 4,
  },
});
