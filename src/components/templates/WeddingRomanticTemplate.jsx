
import React from 'react';
import styles from './WeddingRomanticTemplate.module.css';

const Hero = ({ className }) => (
  <div className={`${styles.heroSection} ${className}`}>
    <h1>Nuestra Boda</h1>
    <p>¡Te esperamos!</p>
  </div>
);

const Countdown = ({ className }) => (
  <div className={`${styles.countdownSection} ${className}`}>
    <h2>Faltan</h2>
    <p>X días</p>
  </div>
);

const WeddingRomanticTemplate = () => {
  return (
    <div className={styles.weddingContainer}>
      <Hero className={styles.heroStyle} />
      <Countdown className={styles.countdownStyle} />
      <div className={styles.detailsSection}>
        <p className={styles.detailText}>Fecha: 30 de Septiembre, 2025</p>
        <p className={styles.detailText}>Lugar: Jardín Secreto</p>
      </div>
    </div>
  );
};

export default WeddingRomanticTemplate;

