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

      <div
        className={styles.slides}
        style={{ transform: `translateX(-${visibleImageIndex * 100}%)` }}
      >
        {imageList.map((image, index) => {
          return (
            <Link key={index} className={styles.heroImage} to={image.link}>
              <img src={image.src} alt={image.alt} />
            </Link>
          );
        })}
      </div>

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

      <button className={styles.next} onClick={nextImage}>
        <img src={nextIcon} alt="next chevron" />
      </button>
    </div>
  );
}

export default HeroCarousel;
