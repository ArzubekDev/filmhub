import { useQuery } from "@tanstack/react-query";
import { TMDB_CONFIG } from "./tmdb.config";
import { axiosInstance } from "./axios.intance";

export const getTrailerApi = (movieId) => {
  return axiosInstance.get(TMDB_CONFIG.ENDPOINTS.VIDEOS(movieId));
};

export const useTrailer = (movieId) => {
  return useQuery({
    queryKey: ["trailer", movieId],
    queryFn: () => getTrailerApi(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
  });
};
