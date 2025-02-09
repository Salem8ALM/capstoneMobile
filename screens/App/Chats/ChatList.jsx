import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"

// Dummy data for banks
const banks = [
  {
    id: "1",
    name: "NBK",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BuMjrc8FZmLcRbUJvUvfpFZ9tZrfkV.png", // Replace with actual logo URL
    lastMessage: "How are you today?",
    timestamp: "2 min ago",
    unreadCount: 3,
    isActive: true,
  },
  {
    id: "2",
    name: "Boubyan",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BuMjrc8FZmLcRbUJvUvfpFZ9tZrfkV.png", // Replace with actual logo URL
    lastMessage: "Don't miss to attend the meeting.",
    timestamp: "2 min ago",
    unreadCount: 4,
    isActive: true,
  },
  {
    id: "3",
    name: "KIB",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BuMjrc8FZmLcRbUJvUvfpFZ9tZrfkV.png", // Replace with actual logo URL
    lastMessage: "Can you join the meeting?",
    timestamp: "2 min ago",
    unreadCount: 0,
    isActive: false,
  },
]

export const ChatList = () => {
  const navigation = useNavigation()

  const renderBankItem = ({ item }) => (
    <TouchableOpacity style={styles.bankItem} onPress={() => navigation.navigate("ChatDetail", { bank: item })}>
      <View style={styles.bankInfo}>
        <Image source={{ uri: item.logo }} style={styles.bankLogo} />
        {item.isActive && <View style={styles.activeIndicator} />}
        <View style={styles.messagePreview}>
          <Text style={styles.bankName}>{item.name}</Text>
          <Text style={styles.lastMessage}>{item.lastMessage}</Text>
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
          {item.unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Chats</Text>
      </View>
      <FlatList
        data={banks}
        renderItem={renderBankItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1E",
    paddingTop: 50, // Add padding for status bar
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#2C2C2E",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  bankItem: {
    marginBottom: 16,
  },
  bankInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  bankLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  activeIndicator: {
    position: "absolute",
    left: 40,
    top: 40,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4CAF50",
    borderWidth: 2,
    borderColor: "#1C1C1E",
  },
  messagePreview: {
    flex: 1,
  },
  bankName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: "#8E8E93",
  },
  rightContent: {
    alignItems: "flex-end",
  },
  timestamp: {
    fontSize: 12,
    color: "#8E8E93",
    marginBottom: 4,
  },
  badge: {
    backgroundColor: "#FFD700",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 12,
    color: "#000000",
    fontWeight: "600",
  },
})

export default ChatList;