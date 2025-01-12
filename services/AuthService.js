import axios from "axios";

const login = async (userInfo) => {
  try {
    const { data } = await axios.post("/auth/login", userInfo);
    storeToken(data.token); // Store token securely
    return data;
  } catch (error) {
    console.log(error);
  }
};

const register = async (userInfo) => {
  try {
    const formData = new FormData();
    for (const key in userInfo) formData.append(key, userInfo[key]);
    const { data } = await axios.post("/auth/register", formData);
    storeToken(data.token); // Store token securely
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { register, login };
