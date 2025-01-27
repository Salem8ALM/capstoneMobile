import axios from "axios";
import { getToken } from "../storage/TokenStorage";
import instance from "./index";

const controller = "/business/v1";

// login with civilId and password
const addCompanyAPI = async (token, text, file, file2) => {
  console.log(`token: ${token}`);

  const formData = new FormData();
  formData.append("text", "sds"); // Send the text parameter
  formData.append("file", {
    uri: file.uri, // Path or URI to the file
    type: "image/jpeg", // Adjust the type based on your file
    name: "file.jpeg", // File name
  });
  formData.append("file2", {
    uri: file2.uri, // Path or URI to the file
    type: "image/jpeg", // Adjust the type based on your file
    name: "business_license.jpg", // File name
  });

  try {
    const response = await instance.post(controller + "/add", formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token here
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getFinancialStatementAPI = async () => {
  try {
    const response = await instance.get(controller + "/get", null, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token here
      },
    });
    return response.data;
  } catch (error) {
    throw error; // Re-throw to handle it in the calling function
  }
};

const testFormData = async (token) => {
  // Create a simple FormData object
  const formData = new FormData();
  formData.append("businessNickname", "TestBusiness"); // Text field
  formData.append("financialStatementPDF", {
    uri: "file://path_to_your_file/empty1.pdf", // Local file URI
    name: "empty1.pdf", // File name
    type: "application/pdf", // File MIME type
  });
  formData.append("businessLicenseImage", {
    uri: "file://path_to_your_file/empty2.pdf", // Local file URI
    name: "empty2.pdf", // File name
    type: "application/pdf", // File MIME type
  });

  console.log("FormData entries:");
  formData.forEach((value, key) => console.log(`${key}:`, value));

  try {
    const response = await instance.get(controller + "/get", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Axios will set this automatically
      },
    });
    console.log("Response:", response.data);
  } catch (error) {
    if (error.response) {
      console.error("Response error:", error.response.data);
    } else if (error.request) {
      console.error("Request error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
  }
};

export { addCompanyAPI, getFinancialStatementAPI, testFormData };
