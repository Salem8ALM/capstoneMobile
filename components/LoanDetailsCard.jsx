import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

export function LoanDetailsCard() {
  const [loanAmount, setLoanAmount] = useState(''); // State for loan amount input
  const [loanTerm, setLoanTerm] = useState(''); // State for loan term input

  return (
    <LinearGradient
      colors={['rgba(217, 217, 217, 0.2)', 'rgba(39, 39, 42, 0.5)']}
      style={styles.container}
    >
      <Text style={styles.title}>
        Please enter the loan amount and term you prefer
      </Text>

      {/* Loan Amount Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Loan Amount</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            placeholderTextColor="#71717A"
            keyboardType="numeric"
            value={loanAmount}
            onChangeText={(text) => setLoanAmount(text)}
          />
          
          <Icon name="dollar" size={24} color="#ffffff" style={styles.inputIcon} />
        </View>
      </View>

      {/* Loan Term Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Loan Term</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter term in months"
            placeholderTextColor="#71717A"
            keyboardType="numeric"
            value={loanTerm}
            onChangeText={(text) => setLoanTerm(text)}
          />
          <Icon name="clock-o" size={24} color="#ffffff" style={styles.inputIcon} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
  
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#777777',
    padding: 20,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5, // For Android shadow
    width: '100%',
    height: '40%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    color: '#D1D1D6',
    marginBottom: 24,
    fontWeight: '400',
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 16,
    
  },
  label: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(75, 75, 90, 0.3)',
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 2,
    borderColor: '#777777',
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    paddingHorizontal: 8,
  },
  inputIcon: {
  },
});

export default LoanDetailsCard;