import React, { useEffect, useRef, useState } from "react";
import scss from "./Actors.module.scss";
import axios from "axios";
import img1 from "@/assets/images/img1.png"
import img2 from "@/assets/images/img2.avif"
import { useMovieActors } from "@/shared/api/actors.api";


const Actors = ({ kinoID }) => {

const {
  data,
  isLoading,
  isError,
} = useMovieActors(kinoID);

const actors = data?.cast ?? [];



  return (
    <section className={scss.actors}>
      <div className="container">
          <h2>Actors</h2>
        <div className={scss.content}>
          <div className={scss.blockWrapper}>
            {actors.map((el) => (
              <div key={el.id} className={scss.block}>
                {el.profile_path !== null ? (
                  <img
                    src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${el.profile_path}`}
                    alt="profile"
                  />
                ) : (
                  <>
                    {el.gender === 1 && <img src={img2} alt="female" />}
                    {(el.gender === 2 || el.gender === 0) && (
                      <img src={img1} alt="male" />
                    )}
                  </>
                )}

                <div className={scss.info}>
                  <h3>
                    {el.original_name.length > 14
                      ? el.original_name.slice(0, 14) + "..."
                      : el.original_name}
                  </h3>
                  <h4>
                    {el.character.length > 16
                      ? el.character.slice(0, 16) + "..."
                      : el.character}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Actors;
