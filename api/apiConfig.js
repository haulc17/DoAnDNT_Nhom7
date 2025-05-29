import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const URLServer = "http://192.168.1.6:5000";

const API = axios.create({
  baseURL: URLServer,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
export { URLServer };
