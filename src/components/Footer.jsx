import styles from "../styles/Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <h2>WAXDISC</h2>
        <p>Home to Australia's best vinyl collection</p>
      </div>
      <ul>
        <h4>Help</h4>
        <li>
          <a>Track my order</a>
        </li>
        <li>
          <a>Returns</a>
        </li>
        <li>
          <a>Contact us</a>
        </li>
        <li>
          <a>Terms and conditions</a>
        </li>
      </ul>
      <ul>
        <h4>Company</h4>
        <li>
          <a>About us</a>
        </li>
        <li>
          <a>Store location</a>
        </li>
        <li>
          <a>Careers</a>
        </li>
        <li>
          <a>News</a>
        </li>
        <li>
          <a>Feedback</a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
