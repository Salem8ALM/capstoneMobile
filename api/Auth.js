import instance from "./index";

const controller = "/auth";

// login with civilId and password
const loginAPI = async (civilId, password) => {
  try {
    const response = await instance.post(controller + "/v1/login", {
      civilId: civilId,
      password: password,
    });
    console.log("Login response:", response.data);
    return response.data;
  } catch (error) {
    throw error; // Re-throw to handle it in the calling function
  }
};

// Function to call the /signup endpoint
const signupAPI = async () => {
  try {
    const response = await instance.post(controller + "/v1/signup");
    console.log("Signup response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error.message);
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
    console.error("Error during refresh:", error.message);
    throw error; // Re-throw to handle it in the calling function
  }
};

export { loginAPI, signupAPI, refreshTokenAPI };
