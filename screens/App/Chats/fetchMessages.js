import { getMessagesAPI } from "../../../api/Chat";
import { getToken } from "../../../storage/TokenStorage";

const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return "Invalid date"; // Handle undefined/null cases

  const date = new Date(dateTimeString);
  if (isNaN(date.getTime())) return "Invalid date"; // Handle invalid date cases

  return date.toLocaleString(); // Formats to local date & time
};

export const fetchMessages = async (
  chatId,
  setMessages,
  setBanker,
  setNotificationMessage,
  setNotificationVisible
) => {
  try {
    const token = await getToken("access");
    if (!token) {
      setNotificationMessage(
        "Unable to retrieve messages. Make sure you are authenticated"
      );
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000);
      return;
    }

    const messages = await getMessagesAPI(token, chatId);

    // Map backend messages to match the frontend format
    const formattedMessages = messages.messages.map((msg) => ({
      id: msg.id || "Unknown id",
      text: msg.message || "Unknown message",
      sent: msg.isYou || "Unknown recipient",
      timestamp: formatDateTime(msg.sentAt) || "Unknown Time",
    }));

    setBanker(messages?.banker);
    setMessages(formattedMessages);
  } catch (error) {
    setNotificationMessage(
      "Error fetching messages. Ensure Internet connection"
    );
    setNotificationVisible(true);
    setTimeout(() => {
      setNotificationVisible(false);
    }, 3000);
  }
};
