import { useRef, useState, useEffect } from "react";
import scss from "./Movies.module.scss";
import Card from "@/components/Card/Card";
import { AnimatePresence, motion } from "framer-motion";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getTopRatedMovies } from "@/shared/api/movies.api";
import { Skeleton, Box } from "@mui/material";

const Movies = () => {
  const loadMoreRef = useRef(null);
  const [select, setSelect] = useState("All");

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["movies", "top-rated"],
      queryFn: ({ pageParam = 1 }) => getTopRatedMovies(pageParam),
      getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    });

  const movies = data?.pages.flatMap((page) => page.results) ?? [];

  const genreMap = {
    28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
    80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family",
    14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music",
    9648: "Mystery", 10749: "Romance", 878: "Science Fiction",
    10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western",
  };

  const filteredMovies =
    select === "All"
      ? movies
      : movies.filter(movie =>
          movie.genre_ids?.some(id => genreMap[id] === select)
        );

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isFetchingNextPage) fetchNextPage();
    }, { threshold: 1 });
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <section className={scss.Movies}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.title}>
            <h2>Movies</h2>
            <div className={scss.category}>
              <h3>Category</h3>
              <select value={select} onChange={(e) => setSelect(e.target.value)}>
                <option value="All">All</option>
                {Object.values(genreMap).map((genre) => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
          </div>

          <AnimatePresence>
            <div className={scss.movies}>
              {(isLoading && !data)
                ? Array.from({ length: 10 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      variant="rectangular"
                      width="100%"
                      height={350}
                      animation="wave"
                      sx={{ borderRadius: "12px", marginBottom: "20px" }}
                    />
                  ))
                : filteredMovies.map(el => (
                    <motion.div
                      key={el.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card el={el} />
                    </motion.div>
                  ))
              }
              {isFetchingNextPage &&
                Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton
                    key={`next-${i}`}
                    variant="rectangular"
                    width={200}
                    height={350}
                    animation="wave"
                    sx={{ borderRadius: "12px", marginBottom: "20px" }}
                  />
                ))
              }
            </div>
          </AnimatePresence>
{isLoading && <h2 style={{ color: "white" }}>Загрузка...</h2>}
          <div ref={loadMoreRef}></div>
        </div>
      </div>
    </section>
  );
};

export default Movies;
