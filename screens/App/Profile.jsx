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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    // Custom image styling if needed
    width: 300,
    height: 300,
    borderRadius: 150, // Optional: makes the image circular
  },
  infoContainer: {
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

export default Profile;
