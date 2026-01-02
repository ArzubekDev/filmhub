import { axiosInstance } from "./axios.intance";
import { TMDB_CONFIG } from "./tmdb.config";

export const getTopRatedMovies = (page = 1) => {
  return axiosInstance.get(TMDB_CONFIG.ENDPOINTS.TOP_RATED, {
    params: { page },
  });
};
