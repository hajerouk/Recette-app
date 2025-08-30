import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // URL de ton backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
