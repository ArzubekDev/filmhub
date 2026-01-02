import React, { useEffect, useRef, useState } from "react";
import styles from "./First.module.scss";
import { useSelector, useDispatch } from "react-redux";
import Card from "@/components/Card/Card";
import { getFIRST, getToday } from "@/redux/mainSlice";
import { motion } from "framer-motion";

const SCROLL_THRESHOLD_PX = 300;

const First = () => {
  const scrollRef = useRef(null);
  const rafRef = useRef(0);

  const routeRef = useRef(null);
  const weekRef = useRef(null);
  const todayRef = useRef(null);

  const [bgStyle, setBgStyle] = useState({ x: 0, width: 0 });

  const dispatch = useDispatch();
  const { main, today } = useSelector((s) => s.firstReducer);
  const [route, setRoute] = useState(false);

  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  useEffect(() => {
    dispatch(getFIRST());
    dispatch(getToday());
  }, [dispatch]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handle = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const scrollLeft = el.scrollLeft;
        const max = el.scrollWidth - el.clientWidth;
        setShowLeftFade(scrollLeft > SCROLL_THRESHOLD_PX + 300);
        setShowRightFade(scrollLeft < Math.max(0, max - SCROLL_THRESHOLD_PX));
      });
    };

    handle();

    el.addEventListener("scroll", handle, { passive: true });
    const ro = new ResizeObserver(handle);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", handle);
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [route, main, today]);

  useEffect(() => {
    const container = routeRef.current;
    const target = route ? todayRef.current : weekRef.current;

    if (!container || !target) return;

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    setBgStyle({
      x: targetRect.left - containerRect.left,
      width: targetRect.width,
    });
  }, [route]);

  return (
    <section id={styles.first}>
      <div className="container">
        <div ref={routeRef} className={styles.route}>
          <motion.div
            className={styles.bg}
            animate={{
              x: bgStyle.x,
              width: bgStyle.width,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 24,
            }}
          />

          <motion.h4
            ref={weekRef}
            onClick={() => setRoute(false)}
            animate={{ color: route ? "#d8f3dc" : "#f0a500" }}
            whileTap={{ scale: 0.95 }}
          >
            Week
          </motion.h4>

          <motion.h4
            ref={todayRef}
            onClick={() => setRoute(true)}
            animate={{ color: route ? "#f0a500" : "#d8f3dc" }}
            whileTap={{ scale: 0.95 }}
          >
            Today
          </motion.h4>
        </div>

        <div className={styles.content}>
          {/* overlay fades */}
          <div
            className={styles.fadeLeft}
            style={{ opacity: showLeftFade ? 1 : 0 }}
            aria-hidden
          />
          <div
            className={styles.fadeRight}
            style={{ opacity: showRightFade ? 1 : 0 }}
            aria-hidden
          />

          <motion.div
            ref={scrollRef}
            key={route ? "today" : "week"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className={styles.block}
          >
            {(route ? today : main)?.map((el, idx) => (
              <Card el={el} key={el.id || idx} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default First;
