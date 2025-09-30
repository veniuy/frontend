
import React from 'react';
import styles from './QuinceaneraRomanticTemplate.module.css';

const Hero = ({ heroClass }) => (
  <section className={heroClass}>
    <h1>Nuestra Quinceañera</h1>
    <p>Un día para recordar</p>
  </section>
);

const Countdown = ({ countdownClass }) => (
  <div className={countdownClass}>
    <h2>Faltan...</h2>
    <p>Muchos días</p>
  </div>
);

const QuinceaneraRomanticTemplate = () => {
  return (
    <div className={styles.container}>
      <Hero heroClass={styles.heroSection} />
      <Countdown countdownClass={styles.countdownSection} />
      <p className={styles.descriptionText}>¡Te esperamos para celebrar!</p>
    </div>
  );
};

export default QuinceaneraRomanticTemplate;

