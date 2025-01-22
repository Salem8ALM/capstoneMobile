import axios from "axios";
import * as Network from "expo-network";

const instance = axios.create({
  baseURL: "http://192.168.2.143:8080",
  timeout: 5000, // Optional: Add timeout to handle slow requests
});

export default instance;
