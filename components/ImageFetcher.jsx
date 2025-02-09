import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Button,
} from 'react-native';
import axios from 'axios';
import { Buffer } from 'buffer';
import { getToken } from '../storage/TokenStorage';

function getBase64(url, token) {
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'arraybuffer',
    })
    .then((response) => Buffer.from(response.data, 'binary').toString('base64'))
    .catch((error) => {
      console.error('Error fetching the image:', error);
      throw new Error('Error fetching image. Please try again later.');
    });
}

export function ImageFetcher({ fileId = 2, style }) {
  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchImage = async () => {
    try {
      setIsLoading(true);
      const token = await getToken('access');
      const url = `http://172.20.10.2:8080/api/files/${fileId}`;
      const base64Data = await getBase64(url, token);
      setImageUri(`data:image/png;base64,${base64Data}`);
    } catch (error) {
      Alert.alert(
        'Error',
        error.message || 'There was an error fetching the image.'
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

      {imageUri && (
        <Image 
          source={{ uri: imageUri }} 
          style={[styles.image, style]} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
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

export default ImageFetcher; 