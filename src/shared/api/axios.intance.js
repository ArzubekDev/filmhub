import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_TMDB_API,
  timeout: 10000,
  params: {
    api_key: import.meta.env.VITE_API_KEY,
    language: "en-US",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("TMDB API error:", error?.response?.data || error);
    return Promise.reject(error);
  }
);
