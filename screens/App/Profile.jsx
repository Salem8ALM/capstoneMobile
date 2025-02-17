"use client";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import ImageFetcher from "../../components/ImageFetcher";
import { Feather } from "@expo/vector-icons";
import { useContext, useState, useEffect } from "react";
import UserContext from "../../context/UserContext";
import { deleteToken, getToken } from "../../storage/TokenStorage";
import axios from "axios";
import { fetchImage } from "../../api/Generic";
import instance from "../../api";
import LottieView from "lottie-react-native";
import { ActivityIndicator } from "react-native-paper";

export function Profile() {
  const { setAuthenticated, setOnboarded, business } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    civilId: "",
    bank: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [avatarUri, setAvatarUri] = useState(null);
  const [profileImage, setProfileImage] = useState(
    require("../../assets/bankers/ibrahim.png")
  );

  const [notificationVisible, setNotificationVisible] = useState(false); // State to manage banner visibility
  const [notificationMessage, setNotificationMessage] = useState(""); // Message to show in the banner

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken("access");
        if (!token) {
          console.log("No token found");

          setNotificationMessage(
            "It seems you are un-authenticated. Please login"
          );
          setNotificationVisible(true);
          setTimeout(() => {
            setNotificationVisible(false);
          }, 3000); // Hide the banner after 3 seconds

          return;
        }

        // Fetch user profile
        const response = await instance.post(
          "/user/v1/token-info",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Token info response:", response.data);

        const userData = response.data;
        setUserProfile({
          username: userData.username || "N/A",
          civilId: userData["civil Id"] || "N/A",
          role: Array.isArray(userData.roles)
            ? userData.roles[0]
            : userData.roles || "N/A",
          bank: userData.bank || "N/A",
          firstName: userData.firstName || userData.username || "N/A",
          lastName: userData.lastName || "",
        });

        // Fetch business avatar if business exists
        if (business?.entity?.businessAvatarFileId) {
          const image = await fetchImage(
            token,
            business.entity.businessAvatarFileId
          );
          if (image) {
            setAvatarUri(image);
          }
        }
      } catch (error) {
        console.log("Error fetching data:", error);
        setNotificationMessage("Unable to load profile");
        setNotificationVisible(true);
        setTimeout(() => {
          setNotificationVisible(false);
        }, 3000); // Hide the banner after 3 seconds

        if (error.response) {
          console.log("Response data:", error.response.data);
          console.log("Response status:", error.response.status);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [business]);

  const handleLogout = async () => {
    try {
      await deleteToken("access");
      setAuthenticated(false);
      setOnboarded(false);
    } catch (error) {
      console.log("Error during logout:", error);
      setNotificationMessage("Unable to logout");
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000); // Hide the banner after 3 seconds
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <LottieView
            source={require("../../assets/profileLoad.json")}
            autoPlay
            loop
            style={styles.lottieAnimation}
          />
          <Text style={styles.loadingTitle}>Fetching Your Profile</Text>
          <Text style={styles.loadingText}>
            Hang tight—your profile is on its way!
          </Text>

          <ActivityIndicator
            size="large"
            color="#fff"
            style={styles.loadingIndicator}
          />
        </View>
      </View>
    );
  }

  const formatRole = (role) => {
    return role
      ?.toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatBank = (bank) => {
    return bank
      ?.toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <View style={styles.container}>
      {/* Profile Header Section */}
      <View style={styles.profileHeader}>
        <Image source={profileImage} style={styles.userAvatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {userProfile.firstName} {userProfile.lastName}
          </Text>
          <Text style={styles.userRole}>{formatRole(userProfile.role)}</Text>
        </View>
      </View>

      {/* Business Card */}
      <View style={styles.businessCard}>
        <View style={styles.businessInfo}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.businessAvatar} />
          ) : (
            <View style={styles.businessAvatarPlaceholder} />
          )}
          <View>
            <Text style={styles.businessName}>
              {business?.entity?.businessNickname || "Your Business"}
            </Text>
            <Text style={styles.licenseText}>
              {`License ID: #${
                business?.entity?.businessLicense?.licenseNumber ||
                "29398492049"
              }`}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.button}>
          <View style={styles.buttonContent}>
            <Feather name="file-text" size={24} color="#FFD700" />
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>Business License</Text>
              <Text style={styles.buttonSubtext}>
                View your business documents
              </Text>
            </View>
          </View>
          <Feather name="chevron-right" size={24} color="#FFD700" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <View style={styles.buttonContent}>
            <Feather name="bar-chart-2" size={24} color="#FFD700" />
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>Financial Statement</Text>
              <Text style={styles.buttonSubtext}>
                View your financial records
              </Text>
            </View>
          </View>
          <Feather name="chevron-right" size={24} color="#FFD700" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={handleLogout}
        >
          <View style={styles.buttonContent}>
            <Feather name="log-out" size={24} color="#FF4444" />
            <View style={styles.buttonTextContainer}>
              <Text style={[styles.buttonText, { color: "#FF4444" }]}>
                Logout
              </Text>
              <Text style={styles.buttonSubtext}>Sign out of your account</Text>
            </View>
          </View>
          <Feather name="chevron-right" size={24} color="#FF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1E",
    paddingTop: 60, // Increased top padding
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  lottieAnimation: {
    width: 250, // Adjust to your preferred size
    height: 250,
  },
  loadingMessages: {
    alignItems: "center",
  },
  loadingIndicator: {
    marginTop: 15,
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

  userAvatar: {
    width: 60, // Increased size
    height: 60, // Increased size
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  userRole: {
    color: "#FFD700",
    fontSize: 16,
  },
  businessCard: {
    backgroundColor: "#2C2C2E", // Slightly lighter background for contrast
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  businessInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  businessAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  businessAvatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    backgroundColor: "#333",
  },
  businessName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  licenseText: {
    color: "#aaa",
    fontSize: 14,
  },
  buttonSection: {
    paddingHorizontal: 20,
    gap: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    padding: 16,
    borderRadius: 12,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  buttonTextContainer: {
    gap: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  buttonSubtext: {
    fontSize: 12,
    color: "#A1A1AA",
  },
  logoutButton: {
    backgroundColor: "rgba(255, 68, 68, 0.1)",
    marginTop: 20,
    alignItems: "center",
  },
  logout: {
    color: "white",
    fontSize: 20,
  },
  absoluteTopLeft: {
    position: "absolute",
    top: 40, // Adjust to your desired distance from the top
    left: 20, // Adjust to your desired distance from the left
    zIndex: 1, // Ensure it appears above other components if overlapping
  },
  loadingText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  role: {
    fontSize: 16,
    color: "#FFD700",
    marginTop: 4,
  },
  bank: {
    fontSize: 14,
    color: "#A1A1AA",
    marginTop: 4,
  },
  civilId: {
    fontSize: 14,
    color: "#A1A1AA",
    marginTop: 4,
  },
});

export default Profile;
