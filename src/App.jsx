import React from "react";
import "./App.scss";
import Header from "./components/layout/Header/Header";
import { Routes, Route } from "react-router-dom";
import All from "./components/pages/main/All";
import Movies from "./components/pages/movies/Movies";
import MovieDetails from "./components/pages/movieDetails/MovieDetails";
import TVShows from "./components/pages/TVShows/TVShows";
import Search from "./components/pages/searchpage/Search";
import Footer from "./components/layout/Footer/Footer";
import NotFound from "./components/pages/NotFound/NotFound";

const App = () => {
  let routes = [
    {
      id: 1,
      link: "/",
      page: <All />,
    },
    {
      id: 2,
      link: "/movies",
      page: <Movies />,
    },
    {
      id: 3,
      link: "/MDetails/:MID",
      page: <MovieDetails />,
    },
    {
      id: 4,
      link: "/tvshow",
      page: <TVShows />,
    },
    {
      id: 5,
      link: "/search/:movieName",
      page: <Search />,
    },
    {
      id: 6,
      link: "*",
      page: <NotFound />,
    },
  ];
  return (
    <div className="app">
      <Header />
      <Routes>
        {routes.map((el) => (
          <Route path={el.link} element={el.page} key={el.id} />
        ))}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
