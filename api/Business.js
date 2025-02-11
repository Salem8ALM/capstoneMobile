import axios from "axios";
import { getToken } from "../storage/TokenStorage";
import instance from "./index";

const controller = "/business";

// login with civilId and password
const addCompanyAPI = async (token, formdata) => {
  console.log(`token: ${token}`);

  try {
    const response = await instance.post(controller + "/add", formdata, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token here
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error; // Re-throw to handle it in the calling function
  }
};

const getCompanyAPI = async (token) => {
  try {
    const response = await instance.get(controller + "/get", {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token here
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error; // Re-throw to handle it in the calling function
  }
};

const getFinancialStatementAPI = async (token) => {
  try {
    const response = await instance.get(`/api/files/${2}`, null, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token here
      },
    });
    console.log(response.data.data);

    return response.data;
  } catch (error) {
    throw error; // Re-throw to handle it in the calling function
  }
};

export { addCompanyAPI, getFinancialStatementAPI, getCompanyAPI };
