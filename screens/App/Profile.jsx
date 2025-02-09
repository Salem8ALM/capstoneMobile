"use client"

import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import AnimatedScreen from "../../components/AnimatedScreen"
import ImageFetcher from "../../components/ImageFetcher"
import { Feather } from "@expo/vector-icons"
import { useContext } from "react"
import UserContext from "../../context/UserContext"
import { deleteToken } from "../../storage/TokenStorage"

export function Profile() {
  const { setAuthenticated } = useContext(UserContext)

  const handleLogout = async () => {
    try {
      await deleteToken("access")
      setAuthenticated(false)
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  return (
    <AnimatedScreen>
      <View style={styles.container}>
        <ImageFetcher fileId={2} style={styles.profileImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>firstName lastName</Text>
          <Text style={styles.phone}>+965 9234 9321</Text>
        </View>

        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.button}>
            <View style={styles.buttonContent}>
              <Feather name="file-text" size={24} color="#FFD700" />
              <View style={styles.buttonTextContainer}>
                <Text style={styles.buttonText}>Business License</Text>
                <Text style={styles.buttonSubtext}>View your business documents</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={24} color="#FFD700" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <View style={styles.buttonContent}>
              <Feather name="bar-chart-2" size={24} color="#FFD700" />
              <View style={styles.buttonTextContainer}>
                <Text style={styles.buttonText}>Financial Statement</Text>
                <Text style={styles.buttonSubtext}>View your financial records</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={24} color="#FFD700" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
            <View style={styles.buttonContent}>
              <Feather name="log-out" size={24} color="#FF4444" />
              <View style={styles.buttonTextContainer}>
                <Text style={[styles.buttonText, styles.logoutText]}>Logout</Text>
                <Text style={styles.buttonSubtext}>Sign out of your account</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={24} color="#FF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </AnimatedScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#292933",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginTop: 40,
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  infoContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  phone: {
    fontSize: 16,
    color: "#A1A1AA",
  },
  buttonSection: {
    gap: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    padding: 16,
    borderRadius: 12,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  buttonTextContainer: {
    gap: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  buttonSubtext: {
    fontSize: 12,
    color: "#A1A1AA",
  },
  logoutButton: {
    backgroundColor: "rgba(255, 68, 68, 0.1)",
    marginTop: 20,
  },
  logoutText: {
    color: "#FF4444",
  }
})

export default Profile

