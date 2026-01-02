"use client";
import React, { useEffect, useState } from "react";
import styles from "./Main.module.scss";
import { useNavigate } from "react-router-dom";
import TypeWriter from "./TypeWritter";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getTopRatedMovies } from "@/shared/api/movies.api";
import { CiSearch } from "react-icons/ci";

const Main = () => {
  const nav = useNavigate();
  const [randomIndex, setRandomIndex] = useState(0);
  const [placeholder, setPlaceholder] = useState(
    "Search for a movie, tv show, person..."
  );
  const { register, handleSubmit } = useForm({
    defaultValues: { search: "" },
  });

  function toSearch(data) {
    const value = data.search.trim();
    nav(value ? `/search/${value}` : "/search/empty");
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", "topRated", 5],
    queryFn: () => getTopRatedMovies(5),
    staleTime: 1000 * 60 * 5,
  });

  const movies = data?.results ?? [];
  const backdrops = movies.map((el) => el.backdrop_path).filter(Boolean);

  useEffect(() => {
    if (backdrops.length) {
      setRandomIndex(Math.floor(Math.random() * backdrops.length));
    }
  }, [backdrops.length]);

  const bgImage = backdrops[randomIndex]
    ? `https://media.themoviedb.org/t/p/w1920_and_h600_multi_faces/${backdrops[randomIndex]}`
    : "";

  useEffect(() => {
    const media = window.matchMedia("(max-width: 530px)");

    const updatePlaceholder = () => {
      setPlaceholder(
        media.matches ? "Search..." : "Search for a movie, tv show, person..."
      );
    };

    updatePlaceholder();
    media.addEventListener("change", updatePlaceholder);

    return () => media.removeEventListener("change", updatePlaceholder);
  }, []);

  return (
    <section
      id={styles.main}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className={styles.content}>
          <TypeWriter className={styles.text} />

          <h3>
            Millions of movies, TV shows and people to discover. Explore now.
          </h3>

          <form onSubmit={handleSubmit(toSearch)}>
            <input
              type="text"
              placeholder={placeholder}
              {...register("search")}
            />

            <button type="submit" className={styles.search}>
              <span className={styles.btnText}>Search</span>
              <CiSearch className={styles.icon} />
            </button>
          </form>

          {isLoading && <p>Loading...</p>}
          {isError && <p>Error loading movies</p>}
        </div>
      </div>
      <div className={styles.fullBG} />
    </section>
  );
};

export default Main;
