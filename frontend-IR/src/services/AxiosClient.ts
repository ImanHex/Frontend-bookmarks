import type { AxiosInstance } from "axios";
import axios from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;


