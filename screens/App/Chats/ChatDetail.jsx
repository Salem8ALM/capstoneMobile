"use client";

import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { getToken } from "../../../storage/TokenStorage";
import { getMessagesAPI, sendMessageAPI } from "../../../api/Chat";

const formatRepaymentPlan = (plan) => {
  return plan
    .toLowerCase() // Convert to lowercase
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
};

const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toLocaleString(); // Formats to local date & time
};

const avatarMap = {
  Me: require("../../../assets/bankers/ibrahim.png"),
  BOUBYAN_BANK: require("../../../assets/bankers/mohamed.png"),
  KUWAIT_INTERNATIONAL_BANK: require("../../../assets/bankers/fajri.png"),
  WARBA_BANK: require("../../../assets/bankers/salem.png"),
};

export const ChatDetail = ({ route }) => {
  const navigation = useNavigation();
  // const route = useRoute();
  const { itemId } = route.params;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [banker, setBanker] = useState("");

  const [chatId, setChatId] = useState(itemId);

  const handleSendMessage = async () => {
    if (message.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          id: String(prev.length + 1),
          text: message,
          timestamp: new Date().toLocaleTimeString(),
          sent: true,
        },
      ]);

      try {
        const token = await getToken("access");
        if (!token) {
          console.warn("No token found, skipping image fetch.");
          return;
        }
        const response = await sendMessageAPI(token, chatId, message);
      } catch (error) {
        console.error("Error sending message:", error);
      }

      message;

      setMessage("");
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = await getToken("access");
        if (!token) {
          console.warn("No token found, skipping image fetch.");
          return;
        }

        const messages = await getMessagesAPI(token, chatId);

        // Map backend messages to match the frontend format
        const formattedMessages = messages.messages.map((msg) => ({
          id: msg.id,
          text: msg.message,
          sent: msg.isYou, // Assuming 'isYou' is a boolean (true if sent by the user)
          timestamp: formatDateTime(msg.sentAt) || "Unknown Time", // If timestamp is not available, provide fallback
        }));

        setBanker(messages.banker);
        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages(); // Call the function
  }, []); // Runs only on mount

  const pickFile = async () => {
    try {
      // Request permission
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission required",
          "You need to allow access to the library to pick files."
        );
        return;
      }

      // Launch picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All, // Allow all file types
        allowsEditing: true,
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        const selectedAsset = result.assets[0];
        setSelectedFile(selectedAsset);

        // Add file message to chat
        setMessages((prev) => [
          ...prev,
          {
            id: String(prev.length + 1),
            text: "File attached: " + selectedAsset.uri.split("/").pop(),
            timestamp: new Date().toLocaleTimeString(),
            sent: true,
            isFile: true,
            fileUri: selectedAsset.uri,
          },
        ]);
      }
    } catch (error) {
      console.log("Error picking file:", error);
      Alert.alert("Error", "Something went wrong while picking the file.");
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sent ? styles.sentMessage : styles.receivedMessage,
      ]}
    >
      {!item.sent && (
        <Image source={avatarMap[banker.bank]} style={styles.messageLogo} />
      )}
      <View
        style={[
          styles.messageBubble,
          item.sent ? styles.sentBubble : styles.receivedBubble,
        ]}
      >
        {item.isFile ? (
          <View style={styles.fileMessage}>
            <Feather
              name="file"
              size={24}
              color={item.sent ? "#000" : "#FFF"}
            />
            <Text
              style={[
                styles.messageText,
                item.sent ? styles.sentMessageText : styles.receivedMessageText,
              ]}
            >
              {item.text}
            </Text>
          </View>
        ) : (
          <Text
            style={[
              styles.messageText,
              item.sent ? styles.sentMessageText : styles.receivedMessageText,
            ]}
          >
            {item.text}
          </Text>
        )}
        <Text style={styles.messageTimestamp}>{item.timestamp}</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.bankInfo}>
          <Image source={avatarMap[banker.bank]} style={styles.bankLogo} />
          <View>
            <Text style={styles.bankName}>
              {banker?.bank ? formatRepaymentPlan(banker.bank) : "Loading..."}
            </Text>
            <Text style={styles.bankName}>{banker.firstName}</Text>

            <Text style={styles.activeStatus}>Active now</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.videoCall}>
          <Feather name="video" size={24} color="#FFD700" />
        </TouchableOpacity>
      </View>

      <FlatList
        // data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        inverted={true}
        data={[...messages].reverse()}
      />

      <View style={styles.bottomContainer}>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton} onPress={pickFile}>
            <Feather name="paperclip" size={24} color="#8E8E93" />
          </TouchableOpacity>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Write your message"
            placeholderTextColor="#8E8E93"
            value={message}
            onChangeText={setMessage}
            multiline={true}
            maxHeight={100}
            returnKeyType="send"
            enablesReturnKeyAutomatically={true}
            onSubmitEditing={handleSendMessage}
            blurOnSubmit={false}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}
          >
            <Feather
              name="send"
              size={24}
              color={message.trim() ? "#FFD700" : "#8E8E93"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1E",
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#2C2C2E",
  },
  backButton: {
    marginRight: 16,
  },
  bankInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  bankLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  bankName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  activeStatus: {
    fontSize: 12,
    color: "#8E8E93",
  },
  videoCall: {
    padding: 8,
  },
  messagesList: {
    padding: 16,
    paddingTop: 200,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  sentMessage: {
    justifyContent: "flex-end",
  },
  receivedMessage: {
    justifyContent: "flex-start",
  },
  messageLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: "70%",
    padding: 12,
    borderRadius: 16,
  },
  sentBubble: {
    backgroundColor: "#FFD700",
  },
  receivedBubble: {
    backgroundColor: "#2C2C2E",
  },
  messageText: {
    fontSize: 14,
    marginBottom: 4,
  },
  sentMessageText: {
    color: "#000000",
  },
  receivedMessageText: {
    color: "#FFFFFF",
  },
  messageTimestamp: {
    fontSize: 10,
    color: "#8E8E93",
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#2C2C2E",
    backgroundColor: "#1C1C1E",
    marginBottom: Platform.OS === "ios" ? 115 : 110,
  },
  attachButton: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: "#2C2C2E",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: "#FFFFFF",
    marginHorizontal: 8,
    fontSize: 16,
  },
  sendButton: {
    padding: 8,
    opacity: 1,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1C1C1E",
    borderTopWidth: 1,
    borderTopColor: "#2C2C2E",
  },
  fileMessage: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default ChatDetail;
