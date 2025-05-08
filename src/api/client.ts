// external import
import axios from "axios";

// Define base URL
const BASE_URL = "http://localhost:8080";
const API_VERSION = "api/v1";

// Create an Axios instance with default settings
const apiClient = axios.create({
  baseURL: `${BASE_URL}/${API_VERSION}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: interceptor to add token dynamically
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token"); // or use cookie/store
    const isAuthRoute = config.url?.startsWith("/auth"); // skip token for auth routes

    if (token && !isAuthRoute) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    // Successful response (status 2xx)
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Maybe token expired.");

      // Optional: redirect to login, clear token, etc.
      localStorage.removeItem("auth_token");
      window.location.href = "/";
    }

    // Pass error down to calling code
    return Promise.reject(error);
  }
);

// export
export default apiClient;
