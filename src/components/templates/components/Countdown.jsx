import React, { useState, useEffect } from 'react';

const Countdown = ({ event, setEvent, colors, fonts }) => {
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
      backgroundColor: colors?.background || '#f0f0f0',
      color: colors?.text || '#333',
      fontFamily: fonts?.primary || 'Arial, sans-serif'
    }}>
      <h2 style={{
        color: colors?.heading || '#000',
        fontFamily: fonts?.secondary || 'Georgia, serif'
      }}>Cuenta Regresiva para {event?.name}</h2>
      <p style={{
        fontSize: '2em',
        fontWeight: 'bold',
        color: colors?.countdown || '#ff4500'
      }}>
        {timerComponents.length ? timerComponents : <span>¡El evento ha comenzado!</span>}
      </p>
    </div>
  );
};

export default Countdown;

