import React, { useEffect, useRef } from "react";
import scss from "./TVShows.module.scss";
import Card from "@/components/Card/Card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPopularApi } from "@/shared/api/shows.api";
import { Skeleton } from "@mui/material";


const TVShows = () => {
  const loadMoreRef = useRef(null);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["tv-shows", "popular"],
      queryFn: ({ pageParam = 1 }) => getPopularApi(pageParam),
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    });

  const movies = data?.pages.flatMap((page) => page.results) ?? [];

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage) fetchNextPage();
      },
      { threshold: 1 }
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <section className={scss.TVShows}>
      <div className="container">
        <h2>TV Shows</h2>
        {isLoading && !data ? (
          Array.from({ length: 10 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width="100%"
              height={350}
              animation="wave"
              sx={{ borderRadius: "12px", marginBottom: "20px" }}
            />
          ))
        ) : (
          <div className={scss.content}>
            {movies.map((el, idx) => (
              <Card el={el} key={idx} />
            ))}
          </div>
        )}
        {isFetchingNextPage &&
          Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={`next-${i}`}
              variant="rectangular"
              width="100%"
              height={350}
              animation="wave"
              sx={{ borderRadius: "12px", marginBottom: "20px" }}
            />
          ))}
      </div>
    </section>
  );
};

export default TVShows;
