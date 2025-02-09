import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function LoanApplicationCard() {
  return (
    <View style={styles.container}>
      {/* Rectangle 1 */}
      <View style={styles.cardBackground} />

      {/* Frame 2 */}
      <View >
        <Text style={styles.title}>Apply For A Loan:</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>
        Start financing your business and see what other banks are offering:
        </Text>
      </View>

      {/* Group 21 (Button with Plus Icon) */}
      <View  style={styles.ellipse}>
        <View style={styles.plus}>
          <View style={styles.verticalLine} />
          <View style={styles.horizontalLine} />
        </View>
      </View>
    </View>
  );
}

export default LoanApplicationCard;

const styles = StyleSheet.create({
  container: {
    width: 377,
    height: 150,
    padding: 18,
  },
  cardBackground: {
    position: 'absolute',
    width: 377,
    height: 170,
    backgroundColor: '#3D3D47',
     borderRadius: 24,
    borderWidth: 1,
    borderColor: '#505059', // Optional for styling,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 28,
    color: '#FFFFFF',
  },
  ellipse: {
    position: 'absolute',
    width: 76,
    height: 76,
    left: 290,
    top: 42, // Adjusted relative to the container
    backgroundColor: '#FFD700',
    borderRadius: 38,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    shadowColor: '#4A5568',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  plus: {
    width: 38,
    height: 38,
    position: 'relative',
  },
  verticalLine: {
    position: 'absolute',
    width: 3,
    height: '100%',
    backgroundColor: '#292933',
    left: '50%',
    transform: [{ translateX: -1.5 }],
  },
  horizontalLine: {
    position: 'absolute',
    height: 3,
    width: '100%',
    backgroundColor: '#292933',
    top: '50%',
    transform: [{ translateY: -1.5 }],
  },
  text: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 20,
    color: '#D1D1D6',

  },
  textContainer: {
    width: 250,
    top: 30,
    
  },
});
