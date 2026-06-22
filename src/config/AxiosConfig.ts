import axios, { AxiosInstance } from 'axios';
import { Credentials } from './Credentials';

const BASE_URL = 'https://bumptobliss-cms-dq9c8.ondigitalocean.app/api';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Credentials.GARBHA_SANSKAR_API_TOKEN}`,
  },
});

// Request interceptor for logging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`📤 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for logging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`📥 API Response (${response.status}): ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(
        `❌ API Error (${error.response.status}): ${error.response.config.url}`,
        error.response.data
      );
    } else if (error.request) {
      console.error('❌ No response received:', error.request);
    } else {
      console.error('❌ Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
