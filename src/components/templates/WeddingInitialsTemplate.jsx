
import React from 'react';
import styles from './WeddingInitialsTemplate.module.css';

const Hero = ({ title, subtitle, className }) => (
  <div className={`${styles.hero} ${className}`}>
    <h1>{title}</h1>
    <p>{subtitle}</p>
  </div>
);

const Countdown = ({ targetDate, className }) => (
  <div className={`${styles.countdown} ${className}`}>
    <h2>Countdown to the Big Day!</h2>
    <p>{targetDate}</p>
  </div>
);

const WeddingInitialsTemplate = () => {
  return (
    <div className={styles.container}>
      <Hero title="John & Jane" subtitle="Are getting married!" className={styles.heroSection} />
      <Countdown targetDate="December 31, 2025" className={styles.countdownSection} />
      <p className={styles.footerText}>Save the Date!</p>
    </div>
  );
};

export default WeddingInitialsTemplate;

