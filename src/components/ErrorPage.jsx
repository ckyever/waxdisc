import styles from "../styles/ErrorPage.module.css";
import { Link } from "react-router";
import logo from "/waxdisc-logo.png";

const ErrorPage = () => {
  return (
    <div className={styles.container}>
      <p>I think you might be lost 🧐</p>
      <Link className={styles.homeLink} to="/">
        <img src={logo} alt="WAXDISC logo"></img>Return Home
      </Link>
    </div>
  );
};

export default ErrorPage;
