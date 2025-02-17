import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Platform,
} from "react-native";
import {
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Button, Card, useTheme } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Icons library
import {
  handlePressIn,
  handlePressOut,
} from "../../utils/animations/buttonAnimations";

import { useNavigation } from "@react-navigation/native";
import Routes from "../../utils/constants/routes";
import UserContext from "../../context/UserContext";
import { fetchImage } from "../../api/Generic";
import { getToken } from "../../storage/TokenStorage";
import FinancialAnalysisModal from "../../components/FinancialAnalysisModal";
import NotificationBanner from "../../utils/animations/NotificationBanner";

const screenWidth = Dimensions.get("window").width;

const DashboardHome = () => {
  const navigation = useNavigation();

  const iconTranslateY = useSharedValue(0);

  const translateXButton1 = useRef(new Animated.Value(-screenWidth)).current;
  const translateXButton2 = useRef(new Animated.Value(-screenWidth)).current;

  const [notificationVisible, setNotificationVisible] = useState(false); // State to manage banner visibility
  const [notificationMessage, setNotificationMessage] = useState(""); // Message to show in the banner

  const scoreWidth = useRef(new Animated.Value(0)).current; // Initial width of 0%

  const buttonAnim = useRef(new Animated.Value(1)).current;

  const [submitText, setSubmitText] = useState("Apply for Loans"); // Default button text
  const theme = useTheme();

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const [avatarUri, setAvatarUri] = useState(null);

  const [profileImage, setProfileImage] = useState(
    require("../../assets/bankers/ibrahim.png")
  );

  const [scaleValue] = useState(new Animated.Value(1)); // Initial scale value is 1 (no scaling)

  const handlePressIn = () => {
    // Scale down the button when pressed
    Animated.spring(scaleValue, {
      toValue: 0.95, // Slightly scale it down
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    // Scale it back to normal after releasing the press
    Animated.spring(scaleValue, {
      toValue: 1, // Return to original scale
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };
  const [modalVisible, setModalVisible] = useState(false);

  const {
    authenticated,
    setAuthenticated,
    onboarded,
    setOnboarded,
    business,
    setBusiness,
    businessAvatar,
    setBusinessAvatar,
  } = useContext(UserContext);

  useEffect(() => {
    // Animation for Button 1 (faster pace)
    const animationButton1 = Animated.loop(
      Animated.sequence([
        Animated.timing(translateXButton1, {
          toValue: screenWidth * 2,
          duration: 550, // Faster pace
          useNativeDriver: true,
        }),
        Animated.delay(700), // Add a 1-second delay before restarting
        Animated.timing(translateXButton1, {
          toValue: -screenWidth, // Reset back to the start position
          duration: 0, // Instantly move back
          useNativeDriver: true,
        }),
      ])
    );

    Animated.timing(scoreWidth, {
      toValue: business.entity.financialScore * 10, // Target width (80% in your case)
      duration: 1000, // Duration of the animation in milliseconds
      useNativeDriver: false, // Since we're animating the width property
    }).start();
    animationButton1.start();

    // Animation for Button 2 (slower pace)
    const animationButton2 = Animated.loop(
      Animated.timing(translateXButton2, {
        toValue: screenWidth * 2,
        duration: 2000, // Slower pace (longer duration)
        useNativeDriver: true,
      })
    );
    animationButton2.start();

    iconTranslateY.value = withRepeat(
      withTiming(10, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );

    return () => {
      animationButton1.stop();
      animationButton2.stop();
      translateXButton1.setValue(-screenWidth);
      translateXButton2.setValue(-screenWidth);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken("access");
        if (!token) {
          setNotificationMessage(
            "Unable to fetch business information. Ensure your logged in"
          );
          setNotificationVisible(true);
          setTimeout(() => {
            setNotificationVisible(false);
          }, 3000); // Hide the banner after 3 seconds
          return;
        }

        const image = await fetchImage(
          token,
          business.entity.businessAvatarFileId
        );

        if (image) {
          setAvatarUri(image);
        } else {
          setNotificationMessage(
            "Unable to fetch business avatar. Ensure internet connection"
          );
          setNotificationVisible(true);
          setTimeout(() => {
            setNotificationVisible(false);
          }, 3000); // Hide the banner after 3 seconds
        }
      } catch (error) {
        setNotificationMessage(
          "Unable to fetch business avatar. Ensure internet connection"
        );
        setNotificationVisible(true);
        setTimeout(() => {
          setNotificationVisible(false);
        }, 3000); // Hide the banner after 3 seconds
      }
    };

    fetchData(); // Call the function
  }, []); // Runs only on mount

  const handleSubmit = async () => {
    navigation.navigate("Requests", {
      screen: Routes.LoanRequest.LoanRequestIntro,
    });
  };

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <View
      style={[
        { flex: 1, backgroundColor: "#1C1C1E", padding: 20 },
        Platform.OS === "ios" && { paddingTop: 60 },
      ]}
    >
      <NotificationBanner
        message={notificationMessage}
        visible={notificationVisible}
      />

      {/* Welcome Message */}
      <View style={{ flexDirection: "row" }}>
        <Image
          source={profileImage}
          style={{
            width: 30,
            height: 30,
            borderRadius: 25,
            marginRight: 15,
            justifyContent: "center",
            alignSelf: "center",
          }}
        />
        <Text
          style={{
            color: "#fff",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          {`Welcome, ${capitalizeFirstLetter(
            business.entity.businessOwnerUser.firstName
          )}`}
        </Text>
      </View>
      {/* Business Card */}
      <View
        style={{
          backgroundColor: "#1C1C1E",
          padding: 15,
          borderRadius: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {avatarUri ? (
            <Image
              source={{ uri: avatarUri }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 15,
              }}
            />
          ) : (
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 15,
                backgroundColor: "#333", // Placeholder color
              }}
            />
          )}
          <View>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
              {business.entity.businessNickname}
            </Text>
            <Text style={{ color: "#aaa" }}>
              {`Business License ID: #${
                business.entity.businessLicense.licenseNumber ?? "29398492049"
              }`}
            </Text>
          </View>
        </View>
      </View>

      <View>
        <Text style={{ color: "#fff", fontSize: 16 }}>Financial Score:</Text>
        <View
          style={{
            height: 8,
            backgroundColor: "#444",
            borderRadius: 4,
            overflow: "hidden",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <Animated.View
            style={{
              width: scoreWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
              height: "100%",
              backgroundColor: "#FFD700",
            }}
          />
        </View>
      </View>

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.3} // Slight dim on press
          onPress={() => setModalVisible(true)}
          onPressIn={() => handlePressIn(scaleAnim)}
          onPressOut={() => handlePressOut(scaleAnim)}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text style={styles.title}>Get AI-powered insights</Text>
            {/* <MaterialCommunityIcons
              name="chart-bar"
              size={28}
              color="white"
              style={styles.aiIcon}
            /> */}
          </View>
          <Text style={styles.description}>
            Make smarter decisions with cutting-edge AI-driven reports.
          </Text>

          {/* Full Coverage Gradient Shine Effect */}
          <Animated.View
            style={[
              styles.shineWrapper,
              { transform: [{ translateX: translateXButton1 }] },
            ]}
          >
            <LinearGradient
              colors={[
                "rgba(255,255,255,0.1)",
                "rgba(255, 255, 255, 0.4)",
                "rgba(255,255,255,0.1)",
              ]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.shine}
            />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>

      {/* Apply for Loan Button with Gradient */}
      <Animated.View
        style={[styles.buttonContainer, { transform: [{ scale: buttonAnim }] }]}
      >
        <Button
          icon={({ color }) => (
            <MaterialCommunityIcons
              name="currency-usd"
              size={26}
              color={color}
            />
          )}
          mode="contained"
          onPressIn={() => handlePressIn(buttonAnim)}
          onPressOut={() => handlePressOut(buttonAnim)}
          style={styles.submit}
          labelStyle={styles.buttonText}
          onPress={handleSubmit}
        >
          {submitText}
        </Button>
        <Animated.View
          style={[
            styles.shineWrapper,
            { transform: [{ translateX: translateXButton2 }] },
          ]}
        >
          <LinearGradient
            colors={[
              "rgba(255,255,255,0.1)",
              "rgba(255, 255, 255, 1)",
              "rgba(255,255,255,0.1)",
            ]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={Object.assign({}, styles.shine, { opacity: 1 })}
          />
        </Animated.View>
      </Animated.View>

      {/* Financial Chart */}
      <Text
        style={{
          color: "#fff",
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 0,
        }}
      >
        {`Data Visualization`}
      </Text>
      <TouchableOpacity
        onPress={() => {
          try {
            console.log("Business Entity:", business?.entity);

            if (!business?.entity) {
              throw new Error("Missing required data");
            }

            navigation.navigate(Routes.Dashboard.DashboardAnalysis, {
              data: business?.entity,
            });
          } catch (error) {
            // Optionally, show an alert or feedback to the user
            console.log(
              "An error occurred while navigating. Please try again:",
              err
            );
            setNotificationMessage(
              "Unable to navigate to Analysis screen. Please try again"
            );
            setNotificationVisible(true);
            setTimeout(() => {
              setNotificationVisible(false);
            }, 3000); // Hide the banner after 3 seconds
          }
        }}
      >
        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{ data: [400, 450, 420, 500, 520, 600] }],
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: "#2A2A2E",
            backgroundGradientFrom: "rgb(23, 23, 23)",
            backgroundGradientTo: "#2A2A2E",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 215, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          style={{ borderRadius: 10, paddingTop: 15 }}
        />
      </TouchableOpacity>

      <FinancialAnalysisModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        analysisText={business.entity.financialAnalysis}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2E2E2E",
    padding: 20,
    borderRadius: 15,
    overflow: "hidden",
    position: "relative",
    marginVertical: 10,
    borderColor: "rgb(105, 105, 105)",
    borderWidth: 0.3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  description: {
    fontSize: 14,
    color: "#AAA",
    marginTop: 5,
  },
  shineWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
  },
  aiIcon: {
    marginLeft: 10, // Space between title and icon
  },
  shine: {
    borderRadius: 8, // If you want rounded corners for the gradient
    position: "absolute", // Make sure the gradient itself doesn't overflow

    width: "100%",
    height: "100%",
    opacity: 0.4,
    borderRadius: 8, // If you want rounded corners for the gradient
  },
  buttonContainer: {
    marginTop: 10,

    flexDirection: "rows",
    marginBottom: 15,
    position: "relative",
    overflow: "hidden", // Ensures the gradient doesn't overflow
    borderRadius: 8, // Match the border radius with the button to ensure rounded corners
  },
  submit: {
    backgroundColor: "#FFD700",
    overflow: "hidden",

    padding: 5,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
export default DashboardHome;
