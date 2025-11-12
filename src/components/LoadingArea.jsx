import { useEffect, useRef } from "react";
import styles from "../styles/LoadingArea.module.css";
import loadingIcon from "../assets/loading.svg";

function LoadingArea({ onVisible, delay = 500 }) {
  const ref = useRef();
  const timeoutRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timeoutRef.current = setTimeout(() => {
              onVisible();
            }, delay);
          } else {
            clearTimeout(timeoutRef.current);
          }
        });
      },
      { threshold: 1 }
    );

    const element = ref.current;
    if (element) observer.observe(element);

    return () => {
      clearTimeout(timeoutRef.current);
      if (element) observer.unobserve(element);
    };
  }, [onVisible, delay]);

  return (
    <div ref={ref} className={styles.loadingArea}>
      <img
        className={styles.loadingIcon}
        src={loadingIcon}
        alt="loading icon"
      />
    </div>
  );
}

export default LoadingArea;
