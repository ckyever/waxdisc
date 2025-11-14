import spinnerIcon from "../assets/vinyl-record-spinner.svg";
import styles from "../styles/Loading.module.css";

function Loading() {
  return (
    <div className={styles.spinnerContainer}>
      <img
        className={styles.spinner}
        src={spinnerIcon}
        alt="quarter of a vinyl record"
      ></img>
    </div>
  );
}

export default Loading;
