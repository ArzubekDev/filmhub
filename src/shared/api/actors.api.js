import { useQuery } from "@tanstack/react-query";
import { TMDB_CONFIG } from "./tmdb.config";
import { axiosInstance } from "./axios.intance";

export const getActorsApi = (movieId) =>
  axiosInstance.get(
    TMDB_CONFIG.ENDPOINTS.CREDITS(movieId)
  );


export const useMovieActors = (movieId) => {
  return useQuery({
    queryKey: ["movie-actors", movieId],
    queryFn: () => getActorsApi(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
  });
};