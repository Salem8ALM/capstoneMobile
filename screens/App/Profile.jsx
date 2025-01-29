import React, { useState } from "react";
import {
  View,
  Button,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import { Buffer } from "buffer"; // Import the Buffer library
import { getToken } from "../../storage/TokenStorage";

// Define the getBase64 function with error handling
function getBase64(url, token) {
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token in the headers
      },
      responseType: "arraybuffer", // Fetch the image as binary data
    })
    .then((response) => Buffer.from(response.data, "binary").toString("base64")) // Convert binary to base64
    .catch((error) => {
      // Log the error for debugging
      console.error("Error fetching the image:", error);
      throw new Error("Error fetching image. Please try again later.");
    });
}

export function Profile() {
  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchImage = async () => {
    try {
      setIsLoading(true);
      const fileId = 1; // Replace with the actual file ID you want to fetch
      const token = await getToken("access");
      console.log(token);
      // Construct the URL to fetch the image
      const url = `http://192.168.2.143:8080/api/files/${5}`;

      // Fetch the base64 string of the imag
      const base64Data = await getBase64(url, token);

      // Update the URI to show the image from base64 data
      setImageUri(`data:image/png;base64,${base64Data}`);
    } catch (error) {
      console.error("Error fetching image:", error);
      // Show an error message to the user
      Alert.alert(
        "Error",
        error.message || "There was an error fetching the image."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Fetch Image" onPress={fetchImage} disabled={isLoading} />

      {isLoading && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loadingIndicator}
        />
      )}

      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default Profile;
