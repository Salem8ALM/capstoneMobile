import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getChatsAPI } from "../../../api/Chat";
import { useEffect, useState ,SafeAreaView} from "react";
import { getToken } from "../../../storage/TokenStorage";
import { useNotifications } from '../../../context/NotificationsContext';

const avatarMap = {
  Me: require("../../../assets/bankers/ibrahim.png"),
  BOUBYAN_BANK: require("../../../assets/bankers/mohamed.png"),
  KUWAIT_INTERNATIONAL_BANK: require("../../../assets/bankers/fajri.png"),
  WARBA_BANK: require("../../../assets/bankers/salem.png"),
};

export const ChatList = () => {
  const navigation = useNavigation();
  const [bankers, setBankers] = useState([]);
  const { addNotification } = useNotifications();
  const [previousMessages, setPreviousMessages] = useState({});

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const token = await getToken("access");
        if (!token) {
          console.warn("No token found, skipping fetch.");
          return;
        }

        const chats = await getChatsAPI(token);
        
        // Map backend response to bankers structure
        const mappedBankers = chats.map((chat) => ({
          id: chat.id,
          name: chat.banker.bank,
          logo: avatarMap[chat.banker.bank] || "default-logo-url.png",
          lastMessage: chat.messages.length > 0 
            ? chat.messages[chat.messages.length - 1].characters 
            : "No messages yet",
          timestamp: chat.messages.length > 0 
            ? new Date(chat.messages[chat.messages.length - 1].timestamp).toLocaleTimeString()
            : "No messages",
          messages: chat.messages,
          unreadCount: 0,
          isActive: true,
        }));

        // Check for new messages and create notifications
        mappedBankers.forEach(banker => {
          const previousChat = previousMessages[banker.id];
          if (previousChat) {
            const newMessages = banker.messages.filter(msg => 
              !previousChat.messages.find(prevMsg => prevMsg.id === msg.id)
            );
            
            newMessages.forEach(msg => {
              addNotification({
                type: 'message',
                title: `New message from ${banker.name}`,
                message: msg.characters,
                chatId: banker.id,
                messageId: msg.id,
                timestamp: new Date(msg.timestamp)
              });
            });
          }
        });

        // Update previous messages state
        const newPreviousMessages = {};
        mappedBankers.forEach(banker => {
          newPreviousMessages[banker.id] = banker;
        });
        setPreviousMessages(newPreviousMessages);

        setBankers(mappedBankers);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    // Initial fetch
    fetchChatList();

    // Set up polling interval
    const intervalId = setInterval(fetchChatList, 3000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [addNotification]);

  const renderBankItem = ({ item }) => (
    <TouchableOpacity
      style={styles.bankItem}
      onPress={() => navigation.navigate("ChatDetail", { itemId: item.id })}
    >
      <View style={styles.bankInfo}>
        <Image source={item.logo} style={styles.bankLogo} />
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
  );

  const handleNewMessage = (message) => {
    addNotification({
      type: 'message',
      title: `New message from ${message.senderName}`,
      message: message.preview,
      chatId: message.chatId
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Chats</Text>
      </View>
      <FlatList
        data={bankers}
        renderItem={renderBankItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

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
});

export default ChatList;
