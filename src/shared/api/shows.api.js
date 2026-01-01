import { axiosInstance } from "./axios.instance";
import { TMDB_CONFIG } from "./tmdb.config";

export const getPopularApi = (page = 1) => {
  return axiosInstance.get(TMDB_CONFIG.ENDPOINTS.POPULAR, {
    params: { page },
  });
};
