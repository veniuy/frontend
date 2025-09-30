
import React from 'react';
import styles from './WeddingClassicTemplate.module.css';

const Hero = ({ title, subtitle, className }) => (
  <div className={`${styles.hero} ${className}`}>
    <h1>{title}</h1>
    <p>{subtitle}</p>
  </div>
);

const Countdown = ({ days, hours, minutes, seconds, className }) => (
  <div className={`${styles.countdown} ${className}`}>
    <span>{days}d</span>
    <span>{hours}h</span>
    <span>{minutes}m</span>
    <span>{seconds}s</span>
  </div>
);

const WeddingClassicTemplate = () => {
  return (
    <div className={styles.weddingContainer}>
      <Hero title="Nuestra Boda" subtitle="¡Te esperamos!" className={styles.heroSection} />
      <Countdown days={10} hours={5} minutes={30} seconds={45} className={styles.countdownTimer} />
      <section className={styles.detailsSection}>
        <h2>Detalles del Evento</h2>
        <p>Fecha: 15 de Octubre de 2026</p>
        <p>Lugar: Jardín Botánico</p>
      </section>
      <footer className={styles.footer}>
        <p>&copy; 2025 Boda Clásica</p>
      </footer>
    </div>
  );
};

export default WeddingClassicTemplate;

