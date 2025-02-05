import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ImageFetcher from '../../components/ImageFetcher';

export function Profile() {
  return (
    <View style={styles.container}>
      <ImageFetcher 
        fileId={2} 
        style={styles.profileImage} // Optional custom styling
      />
      <View style={styles.infoContainer}>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    // Custom image styling if needed
    width: 300,
    height: 300,
    borderRadius: 150, // Optional: makes the image circular
  },
  infoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default Profile;
