"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
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
  Animated,
  Linking,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { getToken } from "../../../storage/TokenStorage";
import {
  getMessagesAPI,
  sendMessageAPI,
  getZegoToken,
} from "../../../api/Chat";
import LottieView from "lottie-react-native";
import { ActivityIndicator } from "react-native-paper";
import { useTabBar } from "../../../navigations/TabBarProvider";
import { getUser } from "../../../storage/UserStorage";
import NotificationBanner from "../../../utils/animations/NotificationBanner";
import { fetchMessages } from "./fetchMessages";
import ChatAnimations from "../../../utils/animations/chatAnimations";
import Routes from "../../../utils/constants/routes";

const formatRepaymentPlan = (plan) => {
  return plan
    .toLowerCase() // Convert to lowercase
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
};

const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return "Invalid date"; // Handle undefined/null cases

  const date = new Date(dateTimeString);
  if (isNaN(date.getTime())) return "Invalid date"; // Handle invalid date cases

  return date.toLocaleString(); // Formats to local date & time
};

const avatarMap = {
  Me: require("../../../assets/bankers/ibrahim.png"),
  BOUBYAN_BANK: require("../../../assets/bankers/mohamed.png"),
  KUWAIT_INTERNATIONAL_BANK: require("../../../assets/bankers/fajri.png"),
  WARBA_BANK: require("../../../assets/bankers/salem.png"),
};

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const VIDEOCALL_URL = "https://cornerstone-frontend.vercel.app/chat";

export const ChatDetail = ({ route }) => {
  const navigation = useNavigation();
  const { itemId } = route.params;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [banker, setBanker] = useState("");
  const [chatId, setChatId] = useState(itemId);
  const [videoCallUrl, setVideoCallUrl] = useState("");
  const { setShowTabBar } = useTabBar();

  const [notificationVisible, setNotificationVisible] = useState(false); // State to manage banner visibility
  const [notificationMessage, setNotificationMessage] = useState(""); // Message to show in the banner

  // Load video call information
  useFocusEffect(
    useCallback(() => {
      const loadVideoCallInformation = async () => {
        try {
          let token = await getToken("access");
          const user = await getUser();

          token = await getZegoToken(token);

          if (!token || !user) {
            setNotificationMessage("Missing authentication information");
            setNotificationVisible(true);
            setTimeout(() => {
              setNotificationVisible(false);
            }, 3000); // Hide the banner after 3 seconds
            return;
          }

          const url = `${VIDEOCALL_URL}/${chatId}?username=${
            user.sub
          }&token=${encodeURIComponent(token)}`;

          console.log(url);
          setVideoCallUrl(url);
        } catch (error) {
          setNotificationMessage("Error loading video call information");
          setNotificationVisible(true);
          setTimeout(() => {
            setNotificationVisible(false);
          }, 3000); // Hide the banner after 3 seconds
        }
      };

      // Initial fetch
      loadVideoCallInformation();

      // Set up polling interval
      const interval = setInterval(() => {
        loadVideoCallInformation();
      }, 3000);

      return () => {
        clearInterval(interval);
      };
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      // Hide tab bar when screen is focused
      const hideTabBarTimeout = setTimeout(() => {
        setShowTabBar(false);
      }, 100); // Adjust delay as necessary

      // Cleanup to show tab bar when the screen is blurred
      return () => {
        clearTimeout(hideTabBarTimeout);
        setShowTabBar(true);
      };
    }, []) // Empty dependency ensures it runs when screen is focused
  );
  const handleSendMessage = async () => {
    if (message.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          text: message,
          timestamp: new Date().toLocaleTimeString(),
          sent: true,
        },
      ]);

      try {
        const token = await getToken("access");
        if (!token) {
          setNotificationMessage(
            "Unable to send message. Make sure you are authenticated"
          );
          setNotificationVisible(true);
          setTimeout(() => {
            setNotificationVisible(false);
          }, 3000); // Hide the banner after 3 seconds

          return;
        }
        const response = await sendMessageAPI(token, chatId, message);
      } catch (error) {
        setNotificationMessage("Error sending message.");
        setNotificationVisible(true);
        setTimeout(() => {
          setNotificationVisible(false);
        }, 3000); // Hide the banner after 3 seconds
      }

      message;

      setMessage("");
      Keyboard.dismiss();
    }
  };
  const intervalRef = useRef(null);

  useEffect(() => {
    const startFetchingMessages = () => {
      if (intervalRef.current) return; // Prevent multiple intervals

      intervalRef.current = setInterval(() => {
        fetchMessages(
          chatId,
          setMessages,
          setBanker,
          setNotificationMessage,
          setNotificationVisible
        );
      }, 3000);
    };

    startFetchingMessages();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [chatId]); // Only restart if chatId changes

  const pickFile = async () => {
    try {
      // Request permission
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        setNotificationMessage(
          "You need to allow access to the library to pick files"
        );
        setNotificationVisible(true);
        setTimeout(() => {
          setNotificationVisible(false);
        }, 3000); // Hide the banner after 3 seconds
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
      setNotificationMessage("Something went wrong while picking the file");
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000); // Hide the banner after 3 seconds
    }
  };

  const renderMessage = ({ item }) => {
    const isCallMessage = item.text.endsWith("is calling");

    console.log(banker?.bank);
    if (isCallMessage) {
      return (
        <View
          style={[
            styles.messageContainer,
            item.sent === true ? styles.sentMessage : styles.receivedMessage,
          ]}
        >
          {/* <Image source={avatarMap[banker?.bank]} style={styles.messageLogo} /> */}
          <View
            style={[
              styles.messageBubble,
              styles.callMessageBubble,
              item.sent === true ? styles.sentBubble : styles.receivedBubble,
            ]}
          >
            <Text
              style={[
                styles.senderName,
                item.sent === true
                  ? styles.sentMessageText
                  : styles.receivedMessageText,
              ]}
            >
              {item.sent === true
                ? ""
                : capitalizeFirstLetter(banker.firstName)}
            </Text>
            <View style={styles.callInfoContainer}>
              <Feather
                name="video"
                size={20}
                color={item.sent === true ? "#000" : "#000"}
              />
              <Text
                style={[
                  styles.messageText,
                  item.sent === true
                    ? styles.sentMessageText
                    : styles.receivedMessageText,
                ]}
              >
                Started a video call
              </Text>
            </View>
            <TouchableOpacity
              style={styles.joinCallButton}
              onPress={() => {
                if (videoCallUrl) {
                  Linking.openURL(videoCallUrl).catch((err) => {
                    console.log("Error opening video call:", err);
                    setNotificationMessage("Error opening video call");
                    setNotificationVisible(true);
                    setTimeout(() => {
                      setNotificationVisible(false);
                    }, 3000); // Hide the banner after 3 seconds
                  });
                }
              }}
            >
              <Text style={styles.joinCallText}>Join Call</Text>
            </TouchableOpacity>
            <Text style={styles.messageTimestamp}>{item?.timestamp}</Text>
          </View>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.messageContainer,
          item?.sent === true ? styles.sentMessage : styles.receivedMessage,
        ]}
      >
        {!(item.sent == true) && (
          <Image source={avatarMap[banker?.bank]} style={styles.messageLogo} />
        )}
        <View
          style={[
            styles.messageBubble,
            item?.sent === true ? styles.sentBubble : styles.receivedBubble,
          ]}
        >
          <Text
            style={[
              styles.senderName,
              item?.sent === true
                ? styles.sentMessageText
                : styles.receivedMessageText,
            ]}
          >
            {item?.sent === true
              ? "You"
              : capitalizeFirstLetter(banker?.firstName)}
          </Text>
          {item?.isFile ? (
            <View style={styles.fileMessage}>
              <Feather
                name="file"
                size={24}
                color={item?.sent === true ? "#000" : "#000"}
              />
              <Text
                style={[
                  styles.messageText,
                  item?.sent === true
                    ? styles.sentMessageText
                    : styles.receivedMessageText,
                ]}
              >
                {item.text}
              </Text>
            </View>
          ) : (
            <Text
              style={[
                styles.messageText,
                item?.sent === true
                  ? styles.sentMessageText
                  : styles.receivedMessageText,
              ]}
            >
              {item?.text}
            </Text>
          )}
          <Text style={styles.messageTimestamp}>{item?.timestamp}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        {
          paddingTop: Platform.OS === "ios" ? 10 : 10, // Apply paddingTop based on the platform
        },
      ]}
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <NotificationBanner
        message={notificationMessage}
        visible={notificationVisible}
      />

      <View
        style={[
          styles.header,
          { paddingVertical: Platform.OS === "ios" ? 20 : 0 },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.replace("ChatList");
          }}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.bankInfo}>
          {!banker?.bank ? (
            <LottieView
              source={require("../../../assets/orangeHourglass")}
              autoPlay
              loop
              style={styles.bankLogo}
            />
          ) : (
            <Image source={avatarMap[banker?.bank]} style={styles.bankLogo} />
          )}
          <View>
            <Text style={styles.bankName}>
              {banker?.bank
                ? formatRepaymentPlan(banker?.bank)
                : "Connecting you to"}
            </Text>
            <Text style={styles.bankName}>
              {banker?.firstName
                ? capitalizeFirstLetter(banker?.firstName)
                : "a Representative"}
            </Text>

            {banker && <Text style={styles.activeStatus}>Active now</Text>}
          </View>
        </View>
      </View>

      {!banker ? (
        <View style={styles.loadingContainer}>
          <LottieView
            source={require("../../../assets/digital-marketing-of-electronic-devices")}
            autoPlay
            loop
            style={styles.lottieAnimation}
          />
          <Text style={styles.loadingTitle}>Loan Negotiation</Text>
          <Text style={styles.loadingText}>
            Negotiate wisely—convince the banker and secure your loan!
          </Text>
          <ActivityIndicator
            size="large"
            color="#fff"
            style={styles.loadingIndicator}
          />
        </View>
      ) : messages.length !== 0 ? (
        <FlatList
          // data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          inverted={true}
          data={[...messages].reverse()}
        />
      ) : (
        <View style={styles.loadingContainer}>
          <LottieView
            source={require("../../../assets/FirstMove")}
            autoPlay
            loop
            style={styles.lottieAnimation}
          />
          <Text style={styles.firstMoveTitle}>Make the first move</Text>
          <Text style={styles.firstMoveDescription}>
            Show the banker why your business deserves the best deal.
          </Text>
        </View>
      )}

      {banker && (
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
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1E",
  },
  lottieAnimation: {
    width: 250, // Adjust to your preferred size
    height: 250,
  },
  loadingMessages: {
    alignItems: "center",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginTop: 50,
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
  loadingIndicator: {
    marginTop: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#2C2C2E",
  },
  callMessageBubble: {
    backgroundColor: "#FFD700",
    padding: 16,
  },

  senderName: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 4,
  },

  callInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 8,
  },

  joinCallButton: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    alignItems: "center",
  },

  joinCallText: {
    color: "#000000",
    fontWeight: "600",
    fontSize: 14,
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
  firstMoveTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
    marginBottom: 6,
  },

  firstMoveDescription: {
    fontSize: 16,
    color: "#7F8C8D",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20,
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
    fontSize: 9,
    color: "#000000",
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
    marginBottom: Platform.OS === "ios" ? 115 : 10,
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
