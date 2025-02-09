"use client"

import { useState } from "react"
import { View, StyleSheet, SafeAreaView } from "react-native"
import { ChatDrawer } from "../components/ChatDrawer"
import { ChatDetailScreen } from "./ChatDetailScreen"

const sampleChats = [
  {
    id: "1",
    bankName: "Boubyan",
    logo: "https://example.com/boubyan-logo.png",
    lastMessage: "Don't miss to attend the meeting.",
    time: "2 min ago",
    notifications: 4,
    isActive: true,
  },
  {
    id: "2",
    bankName: "NBK",
    logo: "https://example.com/nbk-logo.png",
    lastMessage: "How are you today?",
    time: "2 min ago",
    notifications: 3,
    isActive: false,
  },
  {
    id: "3",
    bankName: "KIB",
    logo: "https://example.com/kib-logo.png",
    lastMessage: "Hey! Can you join the meeting?",
    time: "2 min ago",
    notifications: 0,
    isActive: true,
  },
]

export function MainChatLayout() {
  const [selectedChat, setSelectedChat] = useState(sampleChats[0].id)

  const handleSelectChat = (chatId ) => {
    setSelectedChat(chatId)
  }

  const selectedChatData = sampleChats.find((chat) => chat.id === selectedChat)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ChatDrawer chats={sampleChats} selectedChat={selectedChat} onSelectChat={handleSelectChat} />
        <View style={styles.chatDetail}>
          <ChatDetailScreen
            bankData={selectedChatData}
            navigation={{
              goBack: () => {}, // No-op since we're using side drawer
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#292933",
  },
  content: {
    flex: 1,
    flexDirection: "row",
  },
  chatDetail: {
    flex: 1,
  },
})

export default MainChatLayout

