import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native"

const ChatDrawer = ({ chats, selectedChat, onSelectChat }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chats</Text>
      </View>
      <ScrollView style={styles.chatList}>
        {chats.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            style={[styles.chatItem, selectedChat === chat.id && styles.selectedChat]}
            onPress={() => onSelectChat(chat.id)}
          >
            <View style={styles.logoContainer}>
              <Image source={{ uri: chat.logo }} style={styles.logo} />
              {chat.isActive && <View style={styles.activeIndicator} />}
            </View>
            <View style={styles.chatInfo}>
              <Text style={styles.bankName}>{chat.bankName}</Text>
              <Text style={styles.lastMessage} numberOfLines={1}>
                {chat.lastMessage}
              </Text>
            </View>
            <View style={styles.rightContent}>
              <Text style={styles.time}>{chat.time}</Text>
              {chat.notifications && chat.notifications > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationText}>{chat.notifications}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default ChatDrawer
const styles = StyleSheet.create({
  container: {
    width: 300,
    backgroundColor: "#292933",
    borderRightWidth: 1,
    borderRightColor: "rgba(255, 255, 255, 0.1)",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  chatList: {
    flex: 1,
  },
  chatItem: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  selectedChat: {
    backgroundColor: "rgba(255, 215, 0, 0.1)",
  },
  logoContainer: {
    position: "relative",
    marginRight: 12,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4CAF50",
    borderWidth: 2,
    borderColor: "#292933",
  },
  chatInfo: {
    flex: 1,
    marginRight: 8,
  },
  bankName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: "#A1A1AA",
  },
  rightContent: {
    alignItems: "flex-end",
  },
  time: {
    fontSize: 12,
    color: "#71717A",
    marginBottom: 4,
  },
  notificationBadge: {
    backgroundColor: "#FFD700",
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  notificationText: {
    color: "#292933",
    fontSize: 12,
    fontWeight: "bold",
  },
})

