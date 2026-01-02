import React from "react";
import scss from "./Search.module.scss";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate коштум
import { useEffect, useState } from "react";
import Card from "@/components/Card/Card";

const Search = () => {
  let api_key = import.meta.env.VITE_API_KEY;
  const [searchMovie, setSearchMovie] = useState([]);
  const { movieName } = useParams();
  const nav = useNavigate(); // навигация

  async function getSearch(key) {
    let res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${movieName}`
    );
    let { results } = res.data;
    setSearchMovie(results);
  }

useEffect(() => {
  if (!movieName || movieName === "empty") {
    setSearchMovie([]);
    return;
  }

  getSearch(api_key);
}, [movieName]);


  return (
    <section className={scss.Search}>
      <div className="container">
        {searchMovie ? (
         <>
         <h2>
  <span>Search results:</span>{" "}
  {movieName !== "empty"
    ? movieName[0].toUpperCase() + movieName.slice(1)
    : ""}
</h2>

{!searchMovie.length && (
  <span className={scss.nothing_found}>Not Found...</span>
)}

         </>
        ) : (
          <div className={scss.notFound}>
            <h2>Nothing Found...</h2>
            <button onClick={() => nav("/")}>Go Home</button>
          </div>
        )}
        <div className={scss.content}>
          {searchMovie.map((el, idx) => (
            <Card el={el} key={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Search;
