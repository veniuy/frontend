import React from 'react';
import styles from './WeddingRusticTemplate.module.css';

const Hero = ({ heroClass }) => (
  <div className={heroClass}>
    <h1>Nuestra Boda</h1>
    <p>¡Te esperamos!</p>
  </div>
);

const Countdown = ({ countdownClass }) => (
  <div className={countdownClass}>
    <h2>Faltan</h2>
    <p>X días</p>
  </div>
);

const WeddingRusticTemplate = () => {
  return (
    <div className={styles.weddingContainer}>
      <Hero heroClass={styles.heroSection} />
      <Countdown countdownClass={styles.countdownSection} />
      <div className={styles.detailsSection}>
        <p>Fecha: 30 de Septiembre, 2025</p>
        <p>Lugar: Jardín Secreto</p>
      </div>
    </div>
  );
};

export default WeddingRusticTemplate;

