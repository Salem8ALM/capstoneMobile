import { jwtDecode } from "jwt-decode";
import { getToken, deleteToken } from "./TokenStorage";

export async function getUser() {
  const token = await getToken("access");
  if (!token) return null;

  try {
    const user = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (user.exp < currentTime) {
      await deleteToken("access");
      return null;
    }

    return user;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}
