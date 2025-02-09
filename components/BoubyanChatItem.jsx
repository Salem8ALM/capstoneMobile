import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"

const BoubyanChatItem = ({ bankName, message, time, notifications, logoUrl, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.logoContainer}>
        {/* <Image source={{ uri: logoUrl }} style={styles.logo} /> */}
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.bankName}>{bankName}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <Text style={styles.message} numberOfLines={1}>
          {message}
        </Text>
      </View>
      {notifications && notifications > 0 && (
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationText}>{notifications}</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginRight: 12,
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  bankName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  time: {
    fontSize: 12,
    color: "#71717A",
  },
  message: {
    fontSize: 14,
    color: "#A1A1AA",
  },
  notificationBadge: {
    backgroundColor: "#FFD700",
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    paddingHorizontal: 8,
  },
  notificationText: {
    color: "#292933",
    fontSize: 12,
    fontWeight: "bold",
  },
})

export default BoubyanChatItem

