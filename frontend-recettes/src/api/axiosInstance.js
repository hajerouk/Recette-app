import axios from "axios";

const API_URL = "https://special-guide-6v4q9q5x7pg3rqpj-3000.app.github.dev/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export default axiosInstance;
