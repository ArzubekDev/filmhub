import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_TMDB_API,
  timeout: 10000,
  params: {
    api_key: apiKey,
    language: "en-US",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API error:", error?.response || error);
    return Promise.reject(error);
  }
);
