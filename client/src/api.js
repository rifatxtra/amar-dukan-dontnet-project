import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5214/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// always attach latest token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
