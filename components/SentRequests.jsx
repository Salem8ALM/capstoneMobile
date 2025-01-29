import React from 'react';  
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function SentRequests() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Requests');
  };

  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.text}>Sent requests</Text>
            <Text style={styles.subText}>You have no loan requests!</Text>
            <TouchableOpacity onPress={handlePress}>
              <Text style={styles.link}>Send one now!</Text>
            </TouchableOpacity>
         </View>
    </View>
  );
}

export default SentRequests;

const styles = StyleSheet.create({
    container: {
      width: 340,
      marginTop: 12,

    },
    titleContainer: {
      marginTop: 12,      
    },
    text: {
        
      fontSize: 24,
      fontFamily: 'Inter',
      fontWeight: '500',
      color: '#FFFFFF',
    },
    subText: {
      fontSize: 16,
      fontFamily: 'Inter',
      fontWeight: '500',
      color: '#D1D1D6',
      marginTop: 12,
      alignSelf: 'center',
    },
    link: {
        fontSize: 18,
        color: '#EAB308',
        fontWeight: '500',
        textDecorationLine: 'underline',
        alignSelf: 'center',
      },

})
