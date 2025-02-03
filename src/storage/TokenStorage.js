import { setItemAsync, getItemAsync, deleteItemAsync } from "expo-secure-store";
import jwt_decode from "jwt-decode";

// Store a token securely
// `type` is either 'access' or 'refresh'
const setToken = async (token, type) => {
  try {
    await setItemAsync(type, token);
    console.log(`${type} token set successfully`);
  } catch (error) {
    console.error(`Error setting ${type} token:`, error);
  }
};



// Retrieve a token by type ('access' or 'refresh')
const getToken = async (tokenType) => {
  try {
    return await getItemAsync(tokenType);
  } catch (error) {
    console.error(`Error retrieving ${tokenType} token:`, error);
    return null;
  }
};

// Delete a token securely
// `type` is either 'access' or 'refresh'
const deleteToken = async (type) => {
  try {
    await deleteItemAsync(type);
    console.log(`${type} token deleted successfully`);
  } catch (error) {
    console.error(`Error deleting ${type} token:`, error);
  }
};

// Check if a token exists and is valid (not expired)
// `tokenType` is either 'access' or 'refresh'
const checkToken = async (tokenType) => {
  if (!tokenType || typeof tokenType !== "string") {
    console.error("Invalid tokenType provided to checkToken:", tokenType);
    return false;
  }

  try {
    const token = await getToken(tokenType);
    if (token) {
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;

      // Check token expiration
      if (decoded.exp < currentTime) {
        console.warn(`${tokenType} token has expired`);
        await deleteToken(tokenType); // Delete expired token
        return false;
      }
      return true; // Token is valid
    }
    console.warn(`${tokenType} token does not exist`);
    return false;
  } catch (error) {
    console.error(`Error checking ${tokenType} token:`, error);
    return false;
  }
};

export { setToken, getToken, deleteToken, checkToken };
