import { useQuery } from "@tanstack/react-query";
import { TMDB_CONFIG } from "@/shared/api/tmdb.config";
import { axiosInstance } from "./axios.intance";

export const getMovieFullDetails = (id) =>
  axiosInstance.get(
    `${TMDB_CONFIG.ENDPOINTS.DETAILS(id)}?append_to_response=videos,credits`
  );

export const useMovieDetails = (id) => {
  return useQuery({
    queryKey: ["movie-details", id],
    queryFn: () => getMovieFullDetails(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });
};
