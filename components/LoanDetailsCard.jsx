import { useState, useRef } from "react"
import { View, Text, TextInput, StyleSheet, Animated, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import Icon from "react-native-vector-icons/FontAwesome"

export function LoanDetailsCard({ onSubmit }) {
  const [loanTitle, setLoanTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loanAmount, setLoanAmount] = useState("")
  const [loanTerm, setLoanTerm] = useState("")
  const [focusedField, setFocusedField] = useState("")

  // Animation values
  const titleAnim = useRef(new Animated.Value(0)).current
  const descriptionAnim = useRef(new Animated.Value(0)).current
  const amountAnim = useRef(new Animated.Value(0)).current
  const termAnim = useRef(new Animated.Value(0)).current

  const animateField = (anim: Animated.Value, toValue: number) => {
    Animated.spring(anim, {
      toValue,
      useNativeDriver: true,
    }).start()
  }

  const handleSubmit = () => {
    onSubmit({
      loanTitle,
      description,
      loanAmount,
      loanTerm,
    })
  }

  return (
    <LinearGradient colors={["rgba(217, 217, 217, 0.2)", "rgba(39, 39, 42, 0.5)"]} style={styles.container}>
      <Text style={styles.title}>Please enter the loan details</Text>

      {/* Loan Title Input */}
      <Animated.View
        style={[
          styles.inputContainer,
          {
            transform: [
              {
                scale: titleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.05],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.label}>Loan Title</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter loan title"
            placeholderTextColor="#71717A"
            value={loanTitle}
            onChangeText={setLoanTitle}
            onFocus={() => {
              setFocusedField("title")
              animateField(titleAnim, 1)
            }}
            onBlur={() => {
              setFocusedField("")
              animateField(titleAnim, 0)
            }}
          />
          <Icon name="tag" size={24} color="#ffffff" style={styles.inputIcon} />
        </View>
      </Animated.View>

      {/* Loan Description Input */}
      <Animated.View
        style={[
          styles.inputContainer,
          {
            transform: [
              {
                scale: descriptionAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.05],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.label}>Description</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter loan description"
            placeholderTextColor="#71717A"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            onFocus={() => {
              setFocusedField("description")
              animateField(descriptionAnim, 1)
            }}
            onBlur={() => {
              setFocusedField("")
              animateField(descriptionAnim, 0)
            }}
          />
          <Icon name="file-text-o" size={24} color="#ffffff" style={styles.inputIcon} />
        </View>
      </Animated.View>

      {/* Loan Amount Input */}
      <Animated.View
        style={[
          styles.inputContainer,
          {
            transform: [
              {
                scale: amountAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.05],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.label}>Loan Amount</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            placeholderTextColor="#71717A"
            keyboardType="numeric"
            value={loanAmount}
            onChangeText={setLoanAmount}
            onFocus={() => {
              setFocusedField("amount")
              animateField(amountAnim, 1)
            }}
            onBlur={() => {
              setFocusedField("")
              animateField(amountAnim, 0)
            }}
          />
          <Icon name="dollar" size={24} color="#ffffff" style={styles.inputIcon} />
        </View>
      </Animated.View>

      {/* Loan Term Input */}
      <Animated.View
        style={[
          styles.inputContainer,
          {
            transform: [
              {
                scale: termAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.05],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.label}>Loan Term</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter term in months"
            placeholderTextColor="#71717A"
            keyboardType="numeric"
            value={loanTerm}
            onChangeText={setLoanTerm}
            onFocus={() => {
              setFocusedField("term")
              animateField(termAnim, 1)
            }}
            onBlur={() => {
              setFocusedField("")
              animateField(termAnim, 0)
            }}
          />
          <Icon name="clock-o" size={24} color="#ffffff" style={styles.inputIcon} />
        </View>
      </Animated.View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
    width: '100%',
  },
  label: {
    color: '#ffffff',
    marginBottom: 5,
    fontSize: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    paddingVertical: 12,
    fontSize: 16,
  },
  inputIcon: {
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: "#FFD700",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
    alignSelf: "center",
    width: '80%',
  },
  submitButtonText: {
    color: "#292933",
    fontSize: 18,
    fontWeight: "600",
    textAlign: 'center',
  },
})

export default LoanDetailsCard

