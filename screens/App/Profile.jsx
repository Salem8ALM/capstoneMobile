import React, { useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import ImageFetcher from "../../components/ImageFetcher";
import { deleteToken } from "../../storage/TokenStorage";
import UserContext from "../../context/UserContext";

export function Profile() {
  const { authenticated, setAuthenticated, onboarded, setOnboarded } =
    useContext(UserContext);

  return (
    <View style={styles.container}>
      <ImageFetcher
        fileId={1}
        style={styles.profileImage} // Optional custom styling
      />
      <View style={styles.infoContainer}>
        <TouchableOpacity
          onPress={async () => {
            setAuthenticated(false);
            await deleteToken("access");
          }}
          style={[styles.container, styles.absoluteTopLeft]}
        >
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>

        <Text>Name</Text>
        <Text>Email</Text>
        <Text>Phone</Text>
      </View>
    </AnimatedScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    alignItems: "center",
  },
  logout: {
    color: "white",
    fontSize: 20,
  },
  absoluteTopLeft: {
    position: "absolute",
    top: 40, // Adjust to your desired distance from the top
    left: 20, // Adjust to your desired distance from the left
    zIndex: 1, // Ensure it appears above other components if overlapping
  },
});

export default Profile

