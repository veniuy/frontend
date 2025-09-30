import React from 'react';
import styles from './Template.module.css';

const Hero = ({ className }) => (
  <div className={`${styles.heroSection} ${className}`.trim()}>
    <h1>Bienvenido a nuestra boda</h1>
  </div>
);

const Countdown = ({ className }) => (
  <div className={`${styles.countdownSection} ${className}`.trim()}>
    <p>Faltan X días</p>
  </div>
);

const WeddingModernTemplate = () => {
  return (
    <div className="styles.weddingContainer">
      <Hero className={styles.heroCustomClass} />
      <Countdown className={styles.countdownCustomClass} />
      <section className="styles.infoSection">
        <h2>Nuestra Historia</h2>
        <p>Lorem ipsum dolor sit amet...</p>
      </section>
    </div>
  );
};

export default WeddingModernTemplate;

