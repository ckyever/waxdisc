import styles from "../styles/About.module.css";
import aboutImage from "../assets/about-image.jpg";
import storeImage from "../assets/store-front.jpg";

function About() {
  return (
    <div className={styles.about}>
      <div className={styles.aboutImageContainer}>
        <img
          className={styles.aboutImage}
          src={aboutImage}
          alt="WAXDISC team in front of a moving truck"
        />
        <div className={styles.aboutImageOverlay}>
          <h2>
            About
            <br />
            WAXDISC
          </h2>
        </div>
      </div>
      <p className={styles.aboutText}>
        Nestled in the heart of Melbourne, WAXDISC is your go-to destination for
        vinyl enthusiasts and music lovers alike. We pride ourselves on curating
        a diverse collection of records, from classic rock and jazz to modern
        indie and electronic beats. Whether you’re hunting for rare gems,
        spinning the latest releases, or just discovering the magic of analog
        sound, WAXDISC offers a warm, welcoming space to explore, connect, and
        celebrate music on vinyl.
      </p>
      <div id="location" className={styles.location}>
        <div className={styles.aboutImageContainer}>
          <img
            className={styles.aboutImage}
            src={storeImage}
            alt="Outside view of WAXDISC store with graffiti on it"
          ></img>
        </div>
        <p>
          123 Vynill St, 3056
          <br />
          Brunswick, Victoria
          <br />
          <br /> Monday - Sunday:
          <br />
          10am - 6pm
        </p>
      </div>
    </div>
  );
}

export default About;
