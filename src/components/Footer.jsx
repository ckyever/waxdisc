import { Link } from "react-router";
import styles from "../styles/Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.layoutContainer}>
        <div>
          <h2>WAXDISC</h2>
          <p>Home to Australia's best vinyl collection</p>
        </div>
        <ul>
          <h4>Help</h4>
          <li>
            <Link to="orders">Track my order</Link>
          </li>
          <li>
            <Link to="returns">Returns</Link>
          </li>
          <li>
            <Link to="contact">Contact us</Link>
          </li>
          <li>
            <Link to="terms">Terms and conditions</Link>
          </li>
        </ul>
        <ul>
          <h4>Company</h4>
          <li>
            <Link to="about">About us</Link>
          </li>
          <li>
            <Link to="store-location">Store location</Link>
          </li>
          <li>
            <Link to="careers">Careers</Link>
          </li>
          <li>
            <Link to="news">News</Link>
          </li>
          <li>
            <Link to="feedback">Feedback</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
