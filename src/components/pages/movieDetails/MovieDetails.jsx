import React, { useEffect, useState, lazy, Suspense } from "react";
import scss from "./MovieDetails.module.scss";
import { useParams } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { IoIosPlayCircle } from "react-icons/io";
import { TMDB_CONFIG } from "@/shared/api/tmdb.config";
import { useMovieDetails } from "@/shared/api/detail.api";
import { Helmet } from "react-helmet-async";

const Actors = lazy(() => import("./actors/Actors"));
const Trailer = lazy(() => import("../Trailer/Trailer"));


const MovieDetailsSkeleton = () => (
  <div className={scss.skeleton}>
    <div className={scss.posterSkeleton} />
    <div className={scss.textSkeleton} />
    <div className={scss.textSkeletonSmall} />
  </div>
);

const BlurImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      className={`${scss.blurImage} ${loaded ? scss.Imageloaded : ""}`}
    />
  );
};

const MovieDetails = () => {
  const { MID } = useParams();
  const [isActive, setIsActive] = useState(false);

  const { data, isLoading, isError } = useMovieDetails(MID);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [MID]);

useEffect(() => {
  if (isActive) {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
  };
}, [isActive]);


  if (isLoading) return <MovieDetailsSkeleton />;
  if (isError) return <h2>Something went wrong</h2>;

  const {
    title,
    backdrop_path,
    poster_path,
    vote_average,
    release_date,
    runtime,
    genres,
    overview,
    videos,
  } = data;

 const trailer =
  videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  ) ||
  videos?.results?.find(
    (v) => v.type === "Teaser" && v.site === "YouTube"
  ) ||
  videos?.results?.[0];
const hasVideo = Boolean(trailer?.key);

  const percentage = Math.round(vote_average * 10);
  const color =
    percentage >= 70 ? "#21d07a" : percentage >= 40 ? "#d2d531" : "#db2360";


  return (
    <>
     <Helmet>
    <title>{title} | Movie App</title>

    <meta
      name="description"
      content={overview?.slice(0, 160) || "Movie details and information"}
    />

    {/* Open Graph (Facebook, Telegram, WhatsApp) */}
    <meta property="og:title" content={title} />
    <meta
      property="og:description"
      content={overview?.slice(0, 160)}
    />
    <meta
      property="og:image"
      content={`${TMDB_CONFIG.IMAGE_BASE_URL}/${TMDB_CONFIG.IMAGE_SIZES.POSTER}/${poster_path}`}
    />
    <meta property="og:type" content="video.movie" />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta
      name="twitter:description"
      content={overview?.slice(0, 160)}
    />
    <meta
      name="twitter:image"
      content={`${TMDB_CONFIG.IMAGE_BASE_URL}/${TMDB_CONFIG.IMAGE_SIZES.POSTER}/${poster_path}`}
    />
  </Helmet>
      <section
        id={scss.movieDetails}
        style={{
          backgroundImage: `url(${TMDB_CONFIG.IMAGE_BASE_URL}/${TMDB_CONFIG.IMAGE_SIZES.BACKDROP}/${backdrop_path})`,
        }}
      >
        <div className={scss.content}>
          <div className={scss.image}>
            <BlurImage
              src={`${TMDB_CONFIG.IMAGE_BASE_URL}/${TMDB_CONFIG.IMAGE_SIZES.POSTER}/${poster_path}`}
              alt={title}
            />
          </div>
          <div className={scss.info}>
            <h1>{title?.length > 50 ? title.slice(0, 50) + "..." : title}</h1>

            <div className={scss.dates}>
              <h4>
                Release Date: <span>{release_date}</span>
              </h4>
              <h4>
                Runtime:{" "}
                <span>
                  {runtime
                    ? `${Math.floor(runtime / 60)}h ${runtime % 60}min`
                    : "N/A"}
                </span>
              </h4>
            </div>
            <div className={scss.genres}>
              {genres?.map((g) => (
                <span key={g.id}>{g.name}</span>
              ))}
            </div>

            <div className={scss.play}>
              <div className={scss.circularProgressbar}>
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                  styles={buildStyles({
                    textSize: "28px",
                    textColor: "#fff",
                    pathColor: color,
                    trailColor: "#204529",
                  })}
                />
              </div>
              <h3>Rating</h3>

              <div className={scss.buttons}>
                <button
                  className={scss.playBtn}
                  title="watch trailer"
                  disabled={!hasVideo}
                  onClick={() => setIsActive(true)}
                >
                  <IoIosPlayCircle />
                </button>
                <button
                  className={scss.btnWatch}
                  disabled={!hasVideo}
                  onClick={() => setIsActive(true)}
                >
                  Watch Trailer
                </button>
              </div>
            </div>
            <div className={scss.overview}>
              <h3>Overview</h3>
              <p>{overview || "No description available."}</p>
            </div>
          </div>
        </div>
        {isActive && trailer && (
          <div className={scss.watchBG} onClick={() => setIsActive(false)}>
            <div className={scss.watch}>
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                allowFullScreen
              />
              <p onClick={() => setIsActive(false)}>close</p>
            </div>
          </div>
        )}
      </section>
      <Suspense fallback={<div>Loading actors...</div>}>
        <Actors kinoID={MID} />
      </Suspense>

      <Suspense fallback={<div>Loading trailers...</div>}>
        <Trailer kinoID={MID} />
      </Suspense>
    </>
  );
};

export default MovieDetails;
