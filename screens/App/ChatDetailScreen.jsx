"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const ChatDetailScreen = ({ bankData }) => {
  const [message, setMessage] = useState("")

    const handleVideoCall = () => {
    console.log("Video call initiated")
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  if (!bankData) {
    return (
      <View style={styles.noChat}>
        <Text style={styles.noChatText}>Select a chat to start messaging</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={{ uri: bankData.logo }} style={styles.bankLogo} />
          <View style={styles.headerInfo}>
            <Text style={styles.bankName}>{bankData.bankName}</Text>
            <View style={styles.activeStatus}>
              <View style={styles.activeDot} />
              <Text style={styles.activeText}>Active now</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={handleVideoCall} style={styles.videoCallButton}>
          <Icon name="video" size={24} color="#FFD700" />
        </TouchableOpacity>
      </View>

      {/* Rest of the component remains the same... */}
    </View>
  )
}

export default ChatDetailScreen;

const styles = StyleSheet.create({
  // Previous styles remain the same...
  noChat: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noChatText: {
    color: "#A1A1AA",
    fontSize: 16,
  },
})


