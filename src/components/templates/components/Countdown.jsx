import React, { useState, useEffect } from 'react';

const Countdown = ({ event, setEvent, colors = {}, fonts = {}, fontPrimary, fontSecondary }) => {
  const localFonts = { primary: fontPrimary, secondary: fontSecondary };
  const defaultFonts = {
    primary: 'Arial, sans-serif',
    secondary: 'Georgia, serif'
  };
  const mergedFonts = { ...defaultFonts, ...fonts, ...localFonts };

  const defaultColors = {
    background: '#f0f0f0',
    text: '#333',
    heading: '#000',
    countdown: '#ff4500'
  };
  const mergedColors = { ...defaultColors, ...colors };

  const calculateTimeLeft = () => {
    const difference = +new Date(event.date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div style={{
      textAlign: 'center',
      padding: '20px',
      backgroundColor: mergedColors.background || '#f0f0f0',
      color: mergedColors.text || '#333',
      fontFamily: mergedFonts.primary || 'Arial, sans-serif'
    }}>
      <h2 style={{
        color: mergedColors.heading || '#000',
        fontFamily: mergedFonts.secondary || 'Georgia, serif'
      }}>Cuenta Regresiva para {event?.name}</h2>
      <p style={{
        fontSize: '2em',
        fontWeight: 'bold',
        color: mergedColors.countdown || '#ff4500'
      }}>
        {timerComponents.length ? timerComponents : <span>¡El evento ha comenzado!</span>}
      </p>
    </div>
  );
};

export default Countdown;

