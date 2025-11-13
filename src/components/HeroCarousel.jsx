import { useState, useEffect, useRef } from "react";
import styles from "../styles/HeroCarousel.module.css";
import previousIcon from "../assets/chevron-left.svg";
import nextIcon from "../assets/chevron-right.svg";
import { Link } from "react-router";

const autoNextInterval = 4000;

function HeroCarousel({ imageList }) {
  const [visibleImageIndex, setVisibleImageIndex] = useState(0);
  const intervalRef = useRef(null); // Ref to store the interval ID

  const lastImageIndex = imageList ? imageList.length - 1 : 0;

  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, [lastImageIndex]);

  const nextImage = () => {
    setVisibleImageIndex((prevIndex) =>
      prevIndex === lastImageIndex ? 0 : prevIndex + 1
    );
    resetInterval();
  };

  const previousImage = () => {
    setVisibleImageIndex((prevIndex) =>
      prevIndex === 0 ? lastImageIndex : prevIndex - 1
    );
    resetInterval();
  };

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setVisibleImageIndex((prevIndex) =>
        prevIndex === lastImageIndex ? 0 : prevIndex + 1
      );
    }, autoNextInterval);
  };

  return (
    <div className={styles.heroCarousel}>
      <button className={styles.previous} onClick={previousImage}>
        <img src={previousIcon} alt="previous chevron" />
      </button>
      <div className={styles.indicators}>
        {imageList.map((_, index) => {
          return (
            <div
              key={index}
              className={`${styles.indicator} ${
                index === visibleImageIndex ? styles.selected : ""
              }`}
            ></div>
          );
        })}
      </div>
      {imageList.map((image, index) => {
        return (
          <Link
            key={index}
            className={`${styles.heroImage} ${
              index === visibleImageIndex ? styles.visible : styles.hidden
            }`}
            to={image.link}
          >
            <img
              className={
                index === visibleImageIndex ? styles.visible : styles.hidden
              }
              src={image.src}
              alt={image.alt}
            />
          </Link>
        );
      })}
      <button className={styles.next} onClick={nextImage}>
        <img src={nextIcon} alt="next chevron" />
      </button>
    </div>
  );
}

export default HeroCarousel;
