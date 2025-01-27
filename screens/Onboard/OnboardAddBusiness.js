import React, { useRef, useEffect, useContext, useState } from "react";
import { StyleSheet, View, Animated, Alert, Dimensions } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
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
  addCompanyAPI,
  getFinancialStatementAPI,
  testFormData,
} from "../../api/Business";
import { setToken, getToken } from "../../storage/TokenStorage";
import * as ImagePicker from "expo-image-picker";
// import RNFS from "react-native-fs";

const { width, height } = Dimensions.get("window");

const OnboardAddBusiness = () => {
  const navigation = useNavigation();

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

  const { authenticated, setAuthenticated } = useContext(UserContext);

  const buttonAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  const pdfUploadAnim = useRef(new Animated.Value(1)).current;
  const scanAnim = useRef(new Animated.Value(1)).current;

  const businessNicknameAnim = useRef(new Animated.Value(0)).current;

  const checkToken = async () => {
    const token = await getToken("access");
    if (token) {
      setAuthenticated(true);
      return token;
    } else {
      Alert.alert("Please log in again", "The session has timed out");
    }
  };

  // for both financial statement pdf upload and
  const pickFile = async (
    setSelected,
    setButtonText,
    setButtonIcon,
    message
  ) => {
    try {
      // Request permission to access the media library
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission required",
          "You need to allow access to the library to pick files."
        );
        return;
      }

      // Launch the image picker
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.mediaTypes, // Specify media type
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        // Extract the file name from the URI
        const selectedAsset = result.assets[0];

        // Update state
        setSelected(selectedAsset);
        setButtonText(message);
        setButtonIcon("file-check-outline");
      } else {
        Alert.alert("Unsuccessful selection", "User canceled file selection.");
      }
    } catch (error) {
      console.log("Error picking file:", error);
      Alert.alert("Error", "Something went wrong while picking the file.");
    }
  };

  const downloadFinancialStatement = async () => {
    console.log("downloaded");
    // try {
    //   const token = await checkToken();

    //   const responseComplete = await getFinancialStatementAPI(token); // Make API request to download the file
    //   let response = responseComplete.financialStatementPDF;
    //   console.log(response); // Log the response to verify

    //   if (response && response.data) {
    //     // Assuming response.data is the byte[] or base64 string
    //     const byteArray = response.data; // This should be your byte array or base64 string

    //     // Convert byte array to base64 string if needed (ensure your API returns base64 or buffer)
    //     const base64Data = byteArray; // If response is byte[], convert it to base64 string

    //     // Create file path to save the PDF locally (using react-native-fs)
    //     const filePath =
    //       RNFS.DocumentDirectoryPath + "/financial_statement.pdf";

    //     // Write the base64 data to the file path
    //     await RNFS.writeFile(filePath, base64Data, "base64");
    //     Alert.alert(
    //       "Download Successful",
    //       "Financial statement downloaded to your device."
    //     );

    //     // Optionally, open the file after download (if you want to automatically open the PDF)
    //     await RNFS.openFile(filePath);
    //   } else {
    //     Alert.alert("Error", "No financial statement available.");
    //   }
    // } catch (error) {
    //   console.log(error);
    //   Alert.alert(
    //     "Failed to Download",
    //     "An error occurred while downloading the financial statement."
    //   );
    // }
  };

  // logic when "Submit" button is pressed
  const handleSubmit = async () => {
    console.log(selectedPhoto);
    console.log(selectedDocument);

    setSubmitText("Submitting");

    // ensure all required fields are filled
    if (!businessNickname) {
      Alert.alert(
        "Business Nickname is Missing",
        "Please enter a business nickname to distinguish it from your other businesses."
      );
      setSubmitText("Submit");
      return;
    }

    if (!selectedDocument) {
      Alert.alert(
        "Financial Statement Missing",
        "Please upload your financial statement document."
      );
      setSubmitText("Submit");
      return;
    }

    if (!selectedPhoto) {
      Alert.alert(
        "Business License Missing",
        "Please scan your business license document."
      );

      setSubmitText("Submit");
      return;
    }

    try {
      const token = await checkToken();

      const formData = new FormData();
      formData.append("businessNickname", businessNickname);

      // Convert the document file
      formData.append("financialStatementPDF", {
        uri: selectedDocument.uri,
        name: "financialStatementPDF", // Extract file name
        type: selectedDocument.type || "application/pdf", // Fallback type
      });

      // Convert the photo file
      formData.append("businessLicenseImage", {
        uri: selectedPhoto.uri,
        name: selectedPhoto.uri.split("/").pop(), // Extract file name
        type: selectedPhoto.type || "image/jpeg", // Fallback type
      });

      // formData.append("financialStatement", "this is financial statement");
      // formData.append("businessLicense", "this is business license");

      const response = await addCompanyAPI(
        token,
        businessNickname,
        selectedDocument,
        selectedPhoto
      );

      // const response = await addCompanyAPI(token, formData);

      // const response = await testFormData();

      console.log(response);
      Alert.alert("Success", "added your business");
    } catch (error) {
      console.log(error);
      Alert.alert("Failed Login", "Failed to add your business!");
    }
  };

  useEffect(() => {
    checkToken();
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
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Add Your Business</Text>
        <Text style={styles.subtitle}>Please fill in all fields </Text>

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
              pickFile(
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
          style={[styles.buttonContainer, { transform: [{ scale: scanAnim }] }]}
        >
          <Button
            icon={({ color }) => (
              <MaterialCommunityIcons name={scanIcon} size={24} color={color} />
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

        <Button
          icon={({ color }) => (
            <MaterialCommunityIcons name="triangle" size={24} color={color} />
          )}
          mode="outlined"
          style={styles.secondaryButton}
          labelStyle={styles.secondaryButtonText}
          onPress={downloadFinancialStatement}
        >
          download
        </Button>

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#1a1a1a",
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
});

export default OnboardAddBusiness;
