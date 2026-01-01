import { useEffect, useRef } from "react";
import gsap from "gsap";
import scss from "./Main.module.scss"
const texts = [
  "Welcome to FilmHub - Your Movie World!",
  "Dive into the Screen.",
];
const TYPE_SPEED = 0.1;
const DELETE_SPEED = 0.05;

const TypeWriter = ({ className }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    const tl = gsap.timeline({ repeat: -1 });

    texts.forEach((text) => {
      // reset
      tl.set(el, { textContent: "" });

      // typing
      text.split("").forEach((char) => {
        tl.to(el, {
          duration: TYPE_SPEED,
          ease: "none",
          textContent: () => el.textContent + char,
        });
      });

      // pause after full text
      tl.to({}, { duration: 1 });

      // deleting
      text.split("").forEach(() => {
        tl.to(el, {
          duration: DELETE_SPEED,
          ease: "none",
          textContent: () => el.textContent.slice(0, -1),
        });
      });

      // pause before next sentence
      tl.to({}, { duration: 0.5 });
    });

    return () => tl.kill();
  }, []);

  return (
    <h1 className={className}>
      <span ref={textRef} />
      <span className={scss.cursor}>|</span>
    </h1>
  );
};

export default TypeWriter;
