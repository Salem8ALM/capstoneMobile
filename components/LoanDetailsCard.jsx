import { useState, useRef } from "react"
import { View, StyleSheet, Animated, Dimensions } from "react-native"
import { TextInput, Button, Text } from "react-native-paper"
import { LinearGradient } from "expo-linear-gradient"

const { width, height } = Dimensions.get("window")

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
  const buttonAnim = useRef(new Animated.Value(1)).current

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

  const handlePressIn = () => {
    Animated.spring(buttonAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(buttonAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }

  return (
    <LinearGradient
      colors={["rgba(217, 217, 217, 0.2)", "rgba(39, 39, 42, 0.5)"]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Loan Details</Text>

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
            <TextInput
              label={
                <Text
                  style={{
                    color: focusedField === "title" ? "#FFD700" : "rgba(255,255,255,0.3)",
                  }}
                >
                  Loan Title
                </Text>
              }
              value={loanTitle}
              onChangeText={setLoanTitle}
              mode="outlined"
              left={
                <TextInput.Icon icon="tag" color={focusedField === "title" ? "#FFD700" : "rgba(255,255,255,0.3)"} />
              }
              textColor="white"
              style={styles.input}
              onFocus={() => {
                setFocusedField("title")
                animateField(titleAnim, 1)
              }}
              onBlur={() => {
                setFocusedField("")
                animateField(titleAnim, 0)
              }}
              theme={{ colors: { primary: "#FFD700" } }}
            />
          </Animated.View>

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
            <TextInput
              label={
                <Text
                  style={{
                    color: focusedField === "description" ? "#FFD700" : "rgba(255,255,255,0.3)",
                  }}
                >
                  Description
                </Text>
              }
              value={description}
              onChangeText={setDescription}
              mode="outlined"
              left={
                <TextInput.Icon
                  icon="file-text-outline"
                  color={focusedField === "description" ? "#FFD700" : "rgba(255,255,255,0.3)"}
                />
              }
              textColor="white"
              style={styles.input}
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
              theme={{ colors: { primary: "#FFD700" } }}
            />
          </Animated.View>

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
            <TextInput
              label={
                <Text
                  style={{
                    color: focusedField === "amount" ? "#FFD700" : "rgba(255,255,255,0.3)",
                  }}
                >
                  Loan Amount
                </Text>
              }
              value={loanAmount}
              onChangeText={setLoanAmount}
              mode="outlined"
              left={
                <TextInput.Icon
                  icon="currency-usd"
                  color={focusedField === "amount" ? "#FFD700" : "rgba(255,255,255,0.3)"}
                />
              }
              textColor="white"
              keyboardType="numeric"
              style={styles.input}
              onFocus={() => {
                setFocusedField("amount")
                animateField(amountAnim, 1)
              }}
              onBlur={() => {
                setFocusedField("")
                animateField(amountAnim, 0)
              }}
              theme={{ colors: { primary: "#FFD700" } }}
            />
          </Animated.View>

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
            <TextInput
              label={
                <Text
                  style={{
                    color: focusedField === "term" ? "#FFD700" : "rgba(255,255,255,0.3)",
                  }}
                >
                  Loan Term (months)
                </Text>
              }
              value={loanTerm}
              onChangeText={setLoanTerm}
              mode="outlined"
              left={
                <TextInput.Icon icon="calendar" color={focusedField === "term" ? "#FFD700" : "rgba(255,255,255,0.3)"} />
              }
              textColor="white"
              keyboardType="numeric"
              style={styles.input}
              onFocus={() => {
                setFocusedField("term")
                animateField(termAnim, 1)
              }}
              onBlur={() => {
                setFocusedField("")
                animateField(termAnim, 0)
              }}
              theme={{ colors: { primary: "#FFD700" } }}
            />
          </Animated.View>

          <Animated.View style={[styles.buttonContainer, { transform: [{ scale: buttonAnim }] }]}>
            <Button
              mode="contained"
              onPress={handleSubmit}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              style={styles.button}
              labelStyle={styles.buttonText}
            >
              Submit
            </Button>
          </Animated.View>
        </View>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: width,
    height: height,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "rgba(41, 41, 51, 0.7)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: "#777777",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: "rgba(8, 8, 8, 0.5)",
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 5,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
})

export default LoanDetailsCard

