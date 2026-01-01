export const TMDB_CONFIG = {
  IMAGE_BASE_URL: "https://media.themoviedb.org/t/p",
  DEFAULT_LANGUAGE: "en-US",

  IMAGE_SIZES: {
    POSTER: "w440_and_h660_face",
    BACKDROP: "w1920_and_h600_multi_faces",
    AVATAR: "w185",
  },

  ENDPOINTS: {
    TOP_RATED: "/movie/top_rated",
    POPULAR: "/movie/popular",
    DETAILS: (id) => `/movie/${id}`,
    VIDEOS: (id) => `/movie/${id}/videos`,
    CREDITS: (id) => `/movie/${id}/credits`,
  },
};
