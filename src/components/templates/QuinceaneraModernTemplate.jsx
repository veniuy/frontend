
import React from 'react';
import styles from './QuinceaneraModernTemplate.module.css';

const Hero = ({ title, subtitle, className }) => (
  <div className={`${styles.hero} ${className}`}>
    <h1>{title}</h1>
    <p>{subtitle}</p>
  </div>
);

const Countdown = ({ targetDate, className }) => {
  // Lógica de cuenta regresiva
  return (
    <div className={`${styles.countdown} ${className}`}>
      <h2>Cuenta Regresiva</h2>
      <p>Faltan X días</p>
    </div>
  );
};

const QuinceaneraModernTemplate = () => {
  return (
    <div className={styles.container}>
      <Hero title="Mi Quinceañera" subtitle="¡Celebrando un día especial!" className={styles.heroSection} />
      <Countdown targetDate="2025-12-31" className={styles.countdownSection} />
      <div className={styles.gallery}>
        <h3>Galería</h3>
        {/* Imágenes de la galería */}
      </div>
      <div className={styles.footer}>
        <p>&copy; 2025 Mi Quinceañera</p>
      </div>
    </div>
  );
};

export default QuinceaneraModernTemplate;

