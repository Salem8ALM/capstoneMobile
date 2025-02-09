import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native"
import { Text } from "react-native-paper"
import  BoubyanChatItem  from "../../components/BoubyanChatItem"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { SafeAreaView as SafeAreaViewContext } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'


const bankChats = [
  {
    id: "1",
    bankName: "NBK",
    message: "How are you today?",
    time: "2 min ago",
    notifications: 3,
    logoUrl: "https://example.com/nbk-logo.png", // Replace with actual logo URL
  },
  {
    id: "2",
    bankName: "Boubyan",
    message: "Don't miss to attend the meeting.",
    time: "2 min ago",
    notifications: 4,
    logoUrl: "https://example.com/boubyan-logo.png", // Replace with actual logo URL
  },
  {
    id: "3",
    bankName: "KIB",
    message: "Hey! Can you join the meeting?",
    time: "2 min ago",
    notifications: 0,
    logoUrl: "https://example.com/kib-logo.png", // Replace with actual logo URL
  },
]

export function Chat() {
  const handleChatPress = (bankName ) => {
    console.log(`Chat pressed: ${bankName}`)
    navigation.navigate('ChatDetailScreen', { bankName })
  }


  return (
    <SafeAreaViewContext 
      style={styles.container}
      edges={[]}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.gridButton}>
          <Icon name="grid" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Chats</Text>
      </View>

      <View style={styles.chatList}>
        {bankChats.map((chat) => (
          <BoubyanChatItem
            key={chat.id}
            bankName={chat.bankName}
            message={chat.message}
            time={chat.time}
            notifications={chat.notifications}
            logoUrl={chat.logoUrl}
            onPress={() => handleChatPress(chat.bankName)}
          />
        ))}
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Icon name="home" size={24} color="#FFD700" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="video" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemNotification}>
          <Icon name="bell" size={24} color="#FFFFFF" />
          <View style={styles.notificationDot}>
            <Text style={styles.notificationDotText}>1</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="wallet" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="account" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaViewContext>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#292933",
    paddingTop: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 45,
    backgroundColor: "#292933",
  },
  gridButton: {
    padding: 8,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  chatList: {
    flex: 1,
    backgroundColor: "#292933",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    backgroundColor: "rgba(41, 41, 51, 0.95)",
  },
  navItem: {
    padding: 8,
  },
  activeNavItem: {
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    borderRadius: 20,
  },
  navItemNotification: {
    padding: 8,
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#FFD700",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationDotText: {
    color: "#292933",
    fontSize: 12,
    fontWeight: "bold",
  },
})

export default Chat

