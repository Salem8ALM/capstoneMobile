import instance from "./index";

const controller = "/auth";

// login with civilId and password
const loginAPI = async (civilId, password) => {
  try {
    const response = await instance.post(controller + "/v1/login", {
      civilId: civilId,
      password: password,
    });
    return response.data;
  } catch (error) {
    throw error; // Re-throw to handle it in the calling function
  }
};

// Function to call the /signup endpoint
const signupAPI = async (
  username,
  firstName,
  lastName,
  civilId,
  mobileNumber,
  password,
  role,
  bank
) => {
  try {
    const response = await instance.post(controller + "/v1/signup", {
      username: username,
      firstName: firstName,
      lastName: lastName,
      civilId: civilId,
      mobileNumber: mobileNumber,
      password: password,
      role: role,
      bank: bank,
    });
    return response.data;
  } catch (error) {
    throw error; // Re-throw to handle it in the calling function
  }
};

const refreshTokenAPI = async (refreshToken) => {
  try {
    const response = await instance.post(controller + "/v1/refresh-token", {
      refreshToken: refreshToken,
    });
    return response.data;
  } catch (error) {
    throw error; // Re-throw to handle it in the calling function
  }
};

export { loginAPI, signupAPI, refreshTokenAPI };
