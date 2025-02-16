import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getChatsAPI } from "../../../api/Chat";
import { useEffect, useState, SafeAreaView, useRef } from "react";
import { getToken } from "../../../storage/TokenStorage";
import { useNotifications } from "../../../context/NotificationsContext";
import ChatAnimations from "../../../utils/animations/chatAnimations";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const formatRepaymentPlan = (plan) => {
  return plan
    .toLowerCase() // Convert to lowercase
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
};

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

  const translateXAnim = useRef(new Animated.Value(-screenWidth * 1.5)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateXAnim, {
          toValue: screenWidth * 2,
          duration: 750, // Faster pace
          useNativeDriver: true,
        }),
        Animated.delay(500), // Add a 1-second delay before restarting
        Animated.timing(translateXAnim, {
          toValue: -screenWidth, // Reset back to the start position
          duration: 0, // Instantly move back
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

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
        const mappedBankers = chats.map((chat) => {
          const lastMessage =
            chat.messages.length > 0
              ? chat.messages[chat.messages.length - 1]
              : null;

          return {
            id: chat.id,
            name: formatRepaymentPlan(chat.banker.bank),
            logo: avatarMap[chat.banker.bank] || "default-logo-url.png",
            lastMessage:
              chat.messages.length > 0
                ? chat.messages[chat.messages.length - 1].characters
                : "No messages yet",

            lastMessageBank: lastMessage
              ? lastMessage.sender.bank
              : "No messages yet",
            timestamp: lastMessage
              ? new Date(lastMessage.timestamp).toLocaleTimeString()
              : "No messages",
            messages: chat.messages,
            unreadCount: 0,
            isActive: true,
          };
        });

        // Check for new messages and create notifications
        mappedBankers.forEach((banker) => {
          const previousChat = previousMessages[banker.id];
          if (previousChat) {
            const newMessages = banker.messages.filter(
              (msg) =>
                !previousChat.messages.find((prevMsg) => prevMsg.id === msg.id)
            );

            newMessages.forEach((msg) => {
              addNotification({
                type: "message",
                title: `New message from ${banker.name}`,
                message: msg.characters,
                chatId: banker.id,
                messageId: msg.id,
                timestamp: new Date(msg.timestamp),
              });
            });
          }
        });

        // Update previous messages state
        const newPreviousMessages = {};
        mappedBankers.forEach((banker) => {
          newPreviousMessages[banker.id] = banker;
        });
        setPreviousMessages(newPreviousMessages);

        setBankers(mappedBankers);
      } catch (error) {
        console.log("Error fetching messages:", error);
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
      style={[
        styles.bankItem,
        {
          backgroundColor:
            item.lastMessageBank !== "NOT_BANK"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0,0,0,0)",
          borderColor:
            item.lastMessageBank !== "NOT_BANK"
              ? "rgba(255, 255, 255, 0.5)"
              : "rgba(0,0,0,0)",
        },
      ]}
      onPress={() => navigation.navigate("ChatDetail", { itemId: item.id })}
    >
      {item.lastMessageBank !== "NOT_BANK" && (
        <Animated.View
          style={[
            styles.shineWrapper,
            { transform: [{ translateX: translateXAnim }] },
          ]}
        >
          <LinearGradient
            colors={[
              "rgba(255,255,255,0.1)",
              "rgba(255, 255, 255, 0.5)",
              "rgba(255,255,255,0.1)",
            ]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.shine}
          />
        </Animated.View>
      )}
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
      type: "message",
      title: `New message from ${message.senderName}`,
      message: message.preview,
      chatId: message.chatId,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Chats</Text>
      </View>
      {!bankers || bankers.length === 0 ? (
        <View style={styles.noMessagesContainer}>
          <LottieView
            source={require("../../../assets/deskStudy.json")}
            autoPlay
            loop
            style={styles.lottieAnimation}
          />
          <Text style={styles.loadingTitle}>
            It’s a breezy day, no chats yet!
          </Text>
          <Text style={styles.loadingText}>
            Your negotiation chats will pop up here
          </Text>
        </View>
      ) : (
        <FlatList
          data={bankers}
          renderItem={renderBankItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1E",
  },
  shineWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
  },

  shine: {
    borderRadius: 8, // If you want rounded corners for the gradient
    position: "absolute", // Make sure the gradient itself doesn't overflow

    width: "100%",
    height: "100%",
    opacity: 0.4,
    borderRadius: 8, // If you want rounded corners for the gradient
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#2C2C2E",
  },
  noMessagesContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  lottieAnimation: {
    Top: 100,
    width: 250, // Adjust to your preferred size
    height: 250,
  },
  loadingTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    marginTop: 5,
    opacity: 0.9,
  },
  noMessagesText: {
    marginTop: 20,
    fontSize: 18,
    color: "#fff", // You can adjust the color
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  listContent: {
    // paddingTop: 16,
  },
  bankItem: {
    padding: 10,
    borderWidth: 0.2,
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
