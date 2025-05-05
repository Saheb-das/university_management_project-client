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

// export
export default apiClient;
