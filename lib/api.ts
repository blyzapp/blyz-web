import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Points to your backend
  withCredentials: true,                // Include cookies if needed
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
