import axios from "axios";
import * as Network from "expo-network";

const instance = axios.create({
  baseURL: "http://192.168.2.144:8080", // http://192.168.15.172
  timeout: 50000, // Optional: Add timeout to handle slow requests
});

export default instance;
