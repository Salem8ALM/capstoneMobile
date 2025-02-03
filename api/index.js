import axios from "axios";
import * as Network from "expo-network";

const instance = axios.create({
  baseURL: "http://192.168.8.32:8080",
  timeout: 50000, // Optional: Add timeout to handle slow requests
});

export default instance;
