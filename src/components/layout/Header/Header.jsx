import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import logo from "@/assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { CiHome } from "react-icons/ci";
import { MdLocalMovies } from "react-icons/md";
import { IoTvOutline } from "react-icons/io5";

const Header = () => {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });

  useEffect(() => {
    if(isOpen){
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
      document.documentElement.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
      document.documentElement.style.overflow = "auto"
    }
  }, [isOpen])
  return (
    <>
      <header className={`${styles.Header} ${hidden ? styles.hidden : ""}`}>
        <div className="container">
          <div className={styles.content}>
            <img
              src={logo}
              alt="FilmHub"
              className={styles.logo}
              onClick={() => nav("/")}
            />
            <nav className={styles.laptopNav}>
              <a className={styles.toMovie} onClick={() => nav("/movies")}>
                Movies
              </a>
              <a className={styles.toMovie} onClick={() => nav("/tvshow")}>
                TV Shows
              </a>
            </nav>

            {/* Burger Menu */}
            <div className={styles.burgerMenu}>
              <input
                type="checkbox"
                id="check-icon"
                className={styles.checkIcon}
                hidden
                checked={isOpen}
                onChange={() => setIsOpen(!isOpen)}
              />
              <label htmlFor="check-icon" className={styles.iconMenu}>
                <div className={`${styles.bar} ${styles.bar1}`}></div>
                <div className={`${styles.bar} ${styles.bar2}`}></div>
                <div className={`${styles.bar} ${styles.bar3}`}></div>
              </label>
            </div>
          </div>
        </div>
      </header>
{isOpen && (
  <div
    className={styles.overlay}
    onClick={() => setIsOpen(false)}
  />
)}

      <nav className={`${styles.phoneNav} ${isOpen ? styles.active : ""}`}>
        <h3 onClick={() => {
          nav("/"); setIsOpen(false)
        }}> <span><CiHome /></span> Home</h3>
        <h3 onClick={() => {
          nav("/movies"); setIsOpen(false)
        }}> <span><MdLocalMovies /></span> Movies</h3>
        <h3 onClick={() => {
          nav("/tvshow"); setIsOpen(false)
        }}> <span><IoTvOutline /></span> TV Shows</h3>
         <a
    href="https://arzu-dev.vercel.app/"
    target="_blank"
    rel="noopener noreferrer"
    className={styles.creator}
  > 
    Created by Arzubek
  </a>
      </nav>
    </>
  );
};

export default Header;
