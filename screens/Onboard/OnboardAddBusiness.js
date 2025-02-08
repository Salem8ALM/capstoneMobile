import React, { useRef, useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Alert,
  Dimensions,
  Image,
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

const { width, height } = Dimensions.get("window");

function getBase64(url, token) {
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token in the headers
      },
      responseType: "arraybuffer", // Fetch the image as binary data
    })
    .then((response) => Buffer.from(response.data, "binary").toString("base64")) // Convert binary to base64
    .catch((error) => {
      // Log the error for debugging
      console.error("Error fetching the image:", error);
      throw new Error("Error fetching image. Please try again later.");
    });
}

const OnboardAddBusiness = () => {
  const navigation = useNavigation();

  const [businessNickname, setBusinessNickname] = useState("");

  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const { authenticated, setAuthenticated, onboarded, setOnboarded } =
    useContext(UserContext);

  const buttonAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  const pdfUploadAnim = useRef(new Animated.Value(1)).current;
  const scanAnim = useRef(new Animated.Value(1)).current;

  const businessNicknameAnim = useRef(new Animated.Value(0)).current;

  // checking token and whether the user is onboarded
  const checkUserState = async () => {
    const token = await checkToken();
    await checkBusinessEntity(token);
  };

  const checkToken = async () => {
    const token = await getToken("access");
    console.log("INside check token " + token);

    if (token) {
      setAuthenticated(true);

      return token;
    } else {
      Alert.alert("Please log in again", "The session has timed out");
    }
  };

  const checkBusinessEntity = async (token) => {
    console.log(token);
    try {
      await getCompanyAPI(token);
      setOnboarded(true);
    } catch (error) {
      console.log(error);
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
        quality: 1,
        base64: true,
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

  const performOCR = async (file) => {
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

    console.log("uploading image");
    // Return the promise from fetch so that the calling function can wait for it.
    return fetch(
      "https://api.apilayer.com/image_to_text/upload",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // Set the extracted text in state (or log it)
        console.log(result);
        return result.all_text;
      })
      .catch((error) => {
        console.log("error", error);
        throw error; // rethrow to allow the caller to handle the error if needed
      });
  };

  // logic when "Submit" button is pressed
  const handleSubmit = async () => {
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

      // using
      const formData = new FormData();
      formData.append("businessNickname", businessNickname); // Send the text parameter
      formData.append("financialStatementPDF", {
        uri: selectedDocument.uri, // Path or URI to the file
        type: "image/jpeg", // Adjust the type based on your file
        name: "financialStatementPDF.jpeg", // File name
      });
      formData.append("businessLicenseImage", {
        uri: selectedPhoto.uri, // Path or URI to the file
        type: "image/jpeg", // Adjust the type based on your file
        name: "businessLicenseImage.jpg", // File name
      });

      // call the text extraction function here and pass the two images to get the two strings
      // Note the following two fields are nullable

      // Call OCR with the whole file asset, not just its uri
      const newFinancialStatementText = await performOCR(selectedDocument);
      const newBusinessLicenseText = await performOCR(selectedPhoto);

      console.log(newFinancialStatementText, newBusinessLicenseText);

      formData.append("financialStatementText", newFinancialStatementText);
      formData.append("businessLicenseText", newBusinessLicenseText);

      const response = await addCompanyAPI(token, formData);

      console.log(response);
      setSubmitText("Submit");
      await checkBusinessEntity(token);
      Alert.alert("Success", "added your business");
    } catch (error) {
      console.log(error);
      Alert.alert("Failed Login", "Failed to add your business!");
      setSubmitText("Submit");
    }
  };

  useEffect(() => {
    checkUserState();

    // checkOnboard();

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

      {/* <Button
        style={styles.button}
        title="Fetch Image"
        onPress={fetchImage}
        disabled={isLoading}
      />

      {isLoading && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loadingIndicator}
        />
      )}

      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container2: {
    justifyContent: "center",
    alignItems: "center",
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
