import React from "react";
import scss from "./Trailer.module.scss";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useTrailer } from "@/shared/api/trailer.api";
import ReactPlayer from "react-player";
import { Fragment } from "react";

const Trailer = ({ kinoID }) => {
  const [playingId, setPlayingId] = useState(null);
  const { data, isLoading, isError } = useTrailer(kinoID);

  const trailer =
    data?.results?.filter(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    ) || [];
  console.log(trailer.map((el) => el.id), "TTT");

  return (
    <section className={scss.Trailer}>
      <div className="container">
        <h2>Trailers</h2>
        <div className={scss.content}>
          {trailer.length ? (
            trailer.slice(0, 8).map((el) => (
              
              <div key={el.id} className={scss.block}>
 <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${el.key}`}
                  title={el.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>

              </div>
            ))
          ) : (
            <h2>Nothing Found...</h2>
          )}
        </div>
      </div>
    </section>
  );
};

export default Trailer;
