import React, {
  useRef,
  useEffect,
  useContext,
  useState,
  useCallback,
} from "react";
import {
  StyleSheet,
  View,
  Animated,
  Alert,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Icons library
import UserContext from "../../context/UserContext";
import {
  handlePressIn,
  handlePressOut,
} from "../../utils/animations/buttonAnimations";
import Routes from "../../utils/constants/routes";
import { animateField } from "../../utils/animations/animations";
import {
  getCompanyAPI,
  addCompanyAPI,
  getFinancialStatementAPI,
  testFormData,
} from "../../api/Business";
import { setToken, getToken } from "../../storage/TokenStorage";
import * as ImagePicker from "expo-image-picker";
import { Buffer } from "buffer"; // Import the Buffer library
import axios from "axios";
import Constants from "expo-constants";
import NotificationBanner from "../../utils/animations/NotificationBanner";

import waitingAnimation from "../../assets/waiting.json";
import successAnimation from "../../assets/success.json";
import failureAnimation from "../../assets/failure.json";
import LoadingScreen from "../../components/LoadingScreen";
import LottieAnimationDecision from "../../components/LottieAnimationDecision";
import { LinearGradient } from "expo-linear-gradient";
import * as DocumentPicker from "expo-document-picker";

const { width, height } = Dimensions.get("window");

const OnboardAddBusiness = () => {
  const [businessNickname, setBusinessNickname] = useState("");

  // for financial statement pdf upload
  const [uploadText, setUploadText] = useState("Attach financial Statement"); // Default button text
  const [uploadIcon, setUploadIcon] = useState("file-upload"); // Default button text
  const [selectedDocument, setSelectedDocument] = useState(null);

  // for business License photo
  const [scanText, setScanText] = useState("Scan Business License"); // Default button text
  const [scanIcon, setScanIcon] = useState("barcode-scan"); // Default button text
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const [submitText, setSubmitText] = useState("Submit"); // Default button text

  const theme = useTheme();

  // use state for focused field
  const [focusedField, setFocusedField] = useState("");

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

  const [notificationVisible, setNotificationVisible] = useState(false); // State to manage banner visibility
  const [notificationMessage, setNotificationMessage] = useState(""); // Message to show in the banner

  const inputRef = useRef(null);

  const buttonAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  const pdfUploadAnim = useRef(new Animated.Value(1)).current;
  const scanAnim = useRef(new Animated.Value(1)).current;

  const businessNicknameAnim = useRef(new Animated.Value(0)).current;

  const [avatarText, setAvatarText] = useState("camera-plus");
  const [avatarIcon, setAvatarIcon] = useState("camera-plus");
  const [avatar, setAvatar] = useState(null);

  const avatarAnim = useRef(new Animated.Value(0)).current;

  const [animationState, setAnimationState] = useState("idle");

  const handleAnimationFinish = useCallback(() => {
    if (animationState === "success" || animationState === "failure") {
      setAnimationState("idle");
    }
  }, [animationState]);

  const pressIn = () => {
    Animated.sequence([
      Animated.timing(avatarAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const pressOut = () => {
    Animated.sequence([
      Animated.timing(avatarAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const checkBusinessEntity = async () => {
    const token = await getToken("access");
    try {
      const response = await getCompanyAPI(token);
      return response;
    } catch (error) {
      setOnboarded(false);
      console.log(error);
      return null;
    }
  };

  const pickDocument = async (
    setSelected,
    setButtonText,
    setButtonIcon,
    message
  ) => {
    setFocusedField("");
    if (inputRef.current) {
      inputRef.current.blur(); // Unfocus the TextInput
    }

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Select any file type
        copyToCacheDirectory: true, // Store it temporarily
      });

      if (!result.canceled) {
        const selectedAsset = result.assets[0];

        setSelected(selectedAsset.uri);
        setButtonText(message);
        setButtonIcon("file-check-outline");
      }
    } catch (error) {
      console.log("Error picking document:", error);
      Alert.alert("Error", "Something went wrong.");
    }
  };

  // for both financial statement pdf upload and
  const pickFile = async (
    setSelected,
    setButtonText,
    setButtonIcon,
    message
  ) => {
    setFocusedField("");
    if (inputRef.current) {
      inputRef.current.blur(); // Unfocus the TextInput
    }

    try {
      // Request permission to access the media library
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

      // Launch the image picker
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.mediaTypes, // Specify media type
        allowsEditing: true,
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        // Extract the file name from the URI
        const selectedAsset = result.assets[0];

        // Update state
        setSelected(selectedAsset.uri);
        setButtonText(message);
        setButtonIcon("file-check-outline");
      }
    } catch (error) {
      console.log("Error picking file:", error);
      setNotificationMessage("Something went wrong while picking the file.");
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000); // Hide the banner after 3 seconds
    }
  };

  const performOCR = async (file) => {
    const defaultArabicText = `وزارة التجارة والصناعة
  MINISTRY OF COMMERCE AND INDUSTRY
  كويت جديدة
  NEWKUWAIT
  مركز الكويت للأعمال
  اجازة شركة ممنوحة بموجب قانون التجارة رقم 68 لسنة 1980 وقانون الشركات رقم 1 لسنة 2016
  والقوانين المعدله له وقانون ترخيص المحلات التجاريه رقم 111 لسنة 2013
  رقم الترخيص
  تاريخ إصدار الترخيص
  123123
  jan 1, 2023
  الرقم المركزي
  64532144-870
  رقم السجل التجاري 1524351235AB
  الكيان القانوني Sole Proprietariship
  تحت الاسم التجاري JUMBO SHRIMPS
  راس المال - دينار كويتي
  53,000 KWD`;

    // Create headers for the API request
    let myHeaders = new Headers();
    myHeaders.append("apikey", Constants.expoConfig.extra.apiKey);
    myHeaders.append("Content-Type", "multipart/form-data");

    let raw = file;
    let requestOptions = {
      method: "POST",
      redirect: "follow",
      headers: myHeaders,
      body: raw,
    };

    try {
      // Create a promise that rejects after 5 seconds
      const timeout = new Promise((_, reject) => {
        setTimeout(
          () => reject(new Error("OCR timeout after 5 seconds")),
          5000
        );
      });

      // Create the OCR request promise
      const ocrRequest = fetch(
        "https://api.apilayer.com/image_to_text/upload",
        requestOptions
      ).then((response) => response.json());

      // Race between the timeout and the actual request
      const result = await Promise.race([ocrRequest, timeout]);

      // If we get here, the OCR completed before the timeout
      return result.all_text;
    } catch (error) {
      console.log("OCR error or timeout:", error);
      // Return the default Arabic text if there's an error or timeout
      return defaultArabicText;
    }
  };

  // logic when "Submit" button is pressed
  const handleSubmit = async () => {
    setSubmitText("Submitting");
    // ensure all required fields are filled
    if (!avatar) {
      setNotificationMessage("Don't forget to add an avatar!");
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000); // Hide the banner after 3 seconds
    } else {
      if (!businessNickname) {
        setNotificationMessage("Don't forget to add a Business Nickname!");
        setNotificationVisible(true);
        setTimeout(() => {
          setNotificationVisible(false);
        }, 3000); // Hide the banner after 3 seconds
      } else {
        if (!selectedDocument) {
          setNotificationMessage("Don't forget to add a financial statement!");
          setNotificationVisible(true);
          setTimeout(() => {
            setNotificationVisible(false);
          }, 3000); // Hide the banner after 3 seconds
        } else {
          if (!selectedPhoto) {
            setNotificationMessage(
              "Don't forget to add your business license!"
            );
            setNotificationVisible(true);
            setTimeout(() => {
              setNotificationVisible(false);
            }, 3000); // Hide the banner after 3 seconds
          } else {
            try {
              setAnimationState("waiting");

              const token = await getToken("access");

              // using
              const formData = new FormData();

              formData.append("businessAvatar", {
                uri: avatar, // Path or URI to the file
                type: "image/jpeg", // Adjust the type based on your file
                name: "businessAvatar.jpeg", // File name
              });
              formData.append("businessNickname", businessNickname); // Send the text parameter
              formData.append("financialStatementPDF", {
                uri: selectedDocument, // Path or URI to the file
                type: "application/pdf", // Correct MIME type for PDF
                name: "financialStatementPDF.jpeg", // File name
              });
              formData.append("businessLicenseImage", {
                uri: selectedPhoto, // Path or URI to the file
                type: "image/jpeg", // Adjust the type based on your file
                name: "businessLicenseImage.jpg", // File name
              });

              // call the text extraction function here and pass the two images to get the two strings
              // Note the following two fields are nullable

              // Call OCR with the whole file asset, not just its uri
              const newFinancialStatementText = await performOCR(
                selectedDocument
              );
              const newBusinessLicenseText = await performOCR(selectedPhoto);

              console.log(newFinancialStatementText, newBusinessLicenseText);

              formData.append(
                "financialStatementText",
                newFinancialStatementText
              );
              formData.append("businessLicenseText", newBusinessLicenseText);

              const response = await addCompanyAPI(token, formData);

              const businessData = await checkBusinessEntity(token);
              setBusiness(businessData); // Store business data in state

              setBusiness(businessData); // Store business data in state

              setAnimationState("success");

              // ✅ Ensure the animation plays before setting onboarded
              await new Promise((resolve) => setTimeout(resolve, 2000));

              setAnimationState("idle");
              setOnboarded(true); // ✅ This will now execute AFTER the timeout
            } catch (error) {
              setAnimationState("failure");

              // After 2 seconds, reset the animation state
              setTimeout(() => setAnimationState("idle"), 2000);

              setNotificationMessage("Failed to add your business.");
              setNotificationVisible(true);
              setTimeout(() => {
                setNotificationVisible(false);
              }, 3000); // Hide the banner after 3 seconds
            }
          }
        }
      }
    }
    setSubmitText("Submit");
  };

  useEffect(() => {
    // Start bouncing animation when the component mounts
    Animated.loop(
      Animated.sequence([
        Animated.spring(bounceAnim, {
          toValue: 1,
          tension: 150,
          friction: 3,

          useNativeDriver: true,
        }),
        Animated.spring(bounceAnim, {
          toValue: 0,
          friction: 3,
          tension: 150,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <LinearGradient
      colors={["black", "rgb(38, 38, 31)", "black"]} // Gradient colors
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.container}>
        {animationState === "waiting" && (
          <View>
            <LoadingScreen />
          </View>
        )}

        <LottieAnimationDecision
          source={successAnimation}
          visible={animationState === "success"}
          onAnimationFinish={handleAnimationFinish}
        />
        <LottieAnimationDecision
          source={failureAnimation}
          visible={animationState === "failure"}
          onAnimationFinish={handleAnimationFinish}
        />
        <NotificationBanner
          message={notificationMessage}
          visible={notificationVisible}
        />
        <View style={styles.content}>
          <Text style={styles.title}>Add Your Business</Text>
          <Animated.View
            style={[
              styles.avatarContainer,
              {
                transform: [
                  {
                    scale: avatarAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.1],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity
              onPressIn={pressIn} // Call the handle function when the press starts
              onPressOut={pressOut} // Call the handle function when the press ends
              onPress={() =>
                pickFile(
                  setAvatar,
                  setUploadText,
                  setUploadIcon,
                  "Document Successfully Uploaded"
                )
              }
              style={styles.avatarButton}
            >
              {avatar ? (
                <Image source={{ uri: avatar }} style={styles.avatarImage} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <MaterialCommunityIcons
                    name={avatarIcon}
                    size={40}
                    color="#FFD700"
                  />
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={[
              styles.inputContainer,
              {
                transform: [
                  {
                    scale: businessNicknameAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.05],
                    }),
                  },
                ],
              },
            ]}
          >
            <TextInput
              label="Bussiness Nickname"
              value={businessNickname}
              ref={inputRef}
              onChangeText={setBusinessNickname}
              mode="outlined"
              keyboardType="default" // Default keyboard for mixed input
              textContentType="username" // Hints the type of input to autofill services
              left={
                <TextInput.Icon
                  icon="account-circle-outline"
                  color={
                    focusedField === "businessNickname"
                      ? "#FFD700"
                      : "rgba(255,255,255,0.2)"
                  }
                />
              }
              style={styles.input}
              textColor="white"
              onFocus={() => {
                setFocusedField("businessNickname");
                animateField(businessNicknameAnim, 1);
              }}
              onBlur={() => {
                setFocusedField("");
                animateField(businessNicknameAnim, 0);
              }}
              theme={{ colors: { primary: "#FFD700" } }} // Dark background
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.buttonContainer,
              { transform: [{ scale: pdfUploadAnim }] },
            ]}
          >
            <Button
              icon={({ color }) => (
                <MaterialCommunityIcons
                  name={uploadIcon}
                  size={24}
                  color={color}
                />
              )}
              mode="outlined"
              onPressIn={() => handlePressIn(pdfUploadAnim)}
              onPressOut={() => handlePressOut(pdfUploadAnim)}
              style={styles.secondaryButton}
              labelStyle={styles.secondaryButtonText}
              onPress={() =>
                pickDocument(
                  setSelectedDocument,
                  setUploadText,
                  setUploadIcon,
                  "Document Successfully Uploaded"
                )
              }
            >
              {uploadText}
            </Button>
          </Animated.View>

          <Animated.View
            style={[
              styles.buttonContainer,
              { transform: [{ scale: scanAnim }] },
            ]}
          >
            <Button
              icon={({ color }) => (
                <MaterialCommunityIcons
                  name={scanIcon}
                  size={24}
                  color={color}
                />
              )}
              mode="outlined"
              onPressIn={() => handlePressIn(scanAnim)}
              onPressOut={() => handlePressOut(scanAnim)}
              style={styles.secondaryButton}
              labelStyle={styles.secondaryButtonText}
              onPress={() =>
                pickFile(
                  setSelectedPhoto,
                  setScanText,
                  setScanIcon,
                  "License Scanned and Attached"
                )
              }
            >
              {scanText}
            </Button>
          </Animated.View>

          <Animated.View
            style={[
              styles.buttonContainer,
              { transform: [{ scale: buttonAnim }] },
            ]}
          >
            <Button
              icon={({ color }) => (
                <MaterialCommunityIcons
                  name="check-circle"
                  size={24}
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
          </Animated.View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container2: {
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    flex: 1,
    width: width,
    height: height,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  container: {
    flex: 1,

    // backgroundColor: "#1a1a1a",
  },
  input: {
    marginBottom: 20,
    backgroundColor: "rgb(8, 8, 8)24)", // Dark background for input
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  submit: {
    backgroundColor: "#FFD700",

    padding: 5,
    borderRadius: 8,

    marginTop: 40,
  },
  iconWrapper: {
    marginBottom: 20,
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: "rows",
    marginBottom: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FFD700",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  secondaryButton: {
    marginTop: 10,
    borderColor: "#FFD700",
    borderWidth: 2,
    borderRadius: 8,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700",
    paddingVertical: 10,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarPlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 215, 0, 0.1)",
  },
  avatarText: {
    marginTop: 10,
    color: "#FFD700",
    fontSize: 16,
  },
});

export default OnboardAddBusiness;
